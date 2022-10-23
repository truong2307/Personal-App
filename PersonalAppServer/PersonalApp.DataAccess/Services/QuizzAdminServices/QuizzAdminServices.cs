using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PersonalApp.DataAccess.Data.Repository.IRepository;
using PersonalApp.DataAccess.Helper.GoogleApi;
using PersonalApp.DataAccess.Services.ClaimUserServices;
using PersonalApp.DataAccess.Utility.Comparer;
using PersonalApp.Models.Dto;
using PersonalApp.Models.Entities;

namespace PersonalApp.DataAccess.Services.QuizzAdminServices
{
    public class QuizzAdminServices : IQuizzAdminServices
    {
        private readonly IMapper _mapper;
        private readonly ResponseDto _responseDto;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IClaimUserServices _claimUserServices;
        private readonly IGooglePhotoHelper _googlePhotoHelper;

        public QuizzAdminServices(IMapper mapper
            , IUnitOfWork unitOfWork
            , IClaimUserServices claimUserServices
            , IGooglePhotoHelper googlePhotoHelper
            )
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _claimUserServices = claimUserServices;
            _responseDto = new ResponseDto();
            _googlePhotoHelper = googlePhotoHelper;
        }

        public async Task<ResponseDto> CreateQuizz(QuizzCreateDto model)
        {
            var currUserId = _claimUserServices.GetCurrentUserId();
            var dataMap = _mapper.Map<QuizzTest>(model);

            var responseImage = await _googlePhotoHelper.UploadImageAsync(model.ImageQuizz, "AOr7KUMcsYLFN9qavVXtMkUk42ugvZskHXL38q7189u2thATjgBwZ0EzTi3TLjAtKyKOGfG81KHZ");
            dataMap.ImageId = responseImage.Result.MediaItem.Id;

            dataMap.GoogleImage = new GoogleImage()
            {
                Id = responseImage.Result.MediaItem.Id,
                AlbumId = "AOr7KUMcsYLFN9qavVXtMkUk42ugvZskHXL38q7189u2thATjgBwZ0EzTi3TLjAtKyKOGfG81KHZ",
                ImageName = responseImage.Result.MediaItem.Filename,
                BaseUrl = (await _googlePhotoHelper.GetImageByIdAsync(responseImage.Result.MediaItem.Id))?.Result?.BaseUrl,
                Expires = DateTime.Now.AddMinutes(30),
            };


            if (dataMap.MultipleChoiceQuestions.Any())
            {
                dataMap.MultipleChoiceQuestions.ToList().ForEach(c =>
                {
                    c.CreatedAt = DateTime.Now;
                    c.CreatedBy = currUserId;
                });
            }

            if (dataMap.EssayQuestions.Any())
            {
                dataMap.EssayQuestions.ToList().ForEach(c =>
                {
                    c.CreatedAt = DateTime.Now;
                    c.CreatedBy = currUserId;
                });
            }

            dataMap.CreatedAt = DateTime.Now;
            dataMap.CreatedBy = currUserId;

            await _unitOfWork.QuizzTest.AddAsync(dataMap);
            await _unitOfWork.SaveChangeAsync();

            _responseDto.Result = _mapper.Map<QuizzDto>(dataMap);
            _responseDto.IsSuccess = true;

            return _responseDto;
        }

        public async Task<ResponseDto> DeleteQuizz(int quizzId)
        {

            var quizzData = await _unitOfWork.QuizzTest.GetAsync(c => c.Id == quizzId);
            if (quizzData == null)
            {
                _responseDto.ErrorMessages = "Quizz not exist in system";
                return _responseDto;
            }

            await _unitOfWork.QuizzTest.DeleteAsync(quizzId);
            await _unitOfWork.SaveChangeAsync();
            _responseDto.IsSuccess = true;

            return _responseDto;
        }

        public async Task<ResponseDto> GetQuizzById(int id)
        {
            var quizzFromDb = await _unitOfWork.QuizzTest.GetAsync(c => c.Id == id, 
                include: c=> c.Include(c => c.EssayQuestions)
                              .Include(c => c.MultipleChoiceQuestions)
                              .Include(c => c.QuizzTopic)
                              .Include(c => c.GoogleImage));

            if (quizzFromDb == null)
            {
                _responseDto.ErrorMessages = "Quizz not exist in system";
                return _responseDto;
            }

            await CheckExpiredGoogleImage(new List<GoogleImage>() { quizzFromDb.GoogleImage });

            _responseDto.Result = _mapper.Map<QuizzDetailDto>(quizzFromDb);
            _responseDto.IsSuccess = true;
            return _responseDto;
        }

        public async Task<ResponseDatas<QuizzDto>> GetQuizzs(int pageIndex, int pageSize)
        {
            var quizzList = await _unitOfWork.QuizzTest.GetAllAsync(queryEntity: c => c.Skip(pageSize * pageIndex).Take(pageSize),
                                                                    include: c => c.Include(i => i.QuizzTopic).Include(c => c.GoogleImage));

            await CheckExpiredGoogleImage(quizzList.Select(c => c.GoogleImage).ToList());

            var responseData = new ResponseDatas<QuizzDto>()
            {
                Datas = _mapper.Map<List<QuizzDto>>(quizzList),
                TotalItem = (await _unitOfWork.QuizzTest.GetAllAsync()).Count,
                IsSuccess = true,
            };

            return responseData;
        }

        public async Task<ResponseDto> UpdateQuizz(QuizzUpdateDto model)
        {
            var quizzInDb = await _unitOfWork.QuizzTest.GetAsync(c => c.Id == model.Id
            , include: c => c.Include(i => i.MultipleChoiceQuestions)
            .Include(i => i.EssayQuestions).Include(c => c.QuizzTopic)
            );

            if (quizzInDb == null)
            {
                _responseDto.ErrorMessages = "Quizz not exist in system";
                return _responseDto;
            }

            var currUserId = _claimUserServices.GetCurrentUserId();
            var quizzMapFromRequest = _mapper.Map<QuizzTest>(model);

            quizzInDb.Title = quizzMapFromRequest.Title;
            quizzInDb.ExamTime = quizzMapFromRequest.ExamTime;
            quizzInDb.Level = quizzMapFromRequest.Level;
            quizzInDb.TopicId = quizzMapFromRequest.TopicId;
            quizzInDb.IsPublic = quizzMapFromRequest.IsPublic;
            quizzInDb.UpdatedAt = DateTime.Now;
            quizzInDb.UpdatedBy = currUserId;

            var multipleChoiceQuestionDelete = quizzInDb.MultipleChoiceQuestions
                .Except(quizzMapFromRequest.MultipleChoiceQuestions, new QuizzMultiplechoiceQuestionComparer()).ToList();
            var multipleChoiceQuestionAdd = quizzMapFromRequest.MultipleChoiceQuestions
                .Except(quizzInDb.MultipleChoiceQuestions, new QuizzMultiplechoiceQuestionComparer()).ToList();
            var multiplechoiceQuestionUpdate = quizzMapFromRequest.MultipleChoiceQuestions
                .Except(multipleChoiceQuestionDelete, new QuizzMultiplechoiceQuestionComparer()).Where(c => c.Id > 0).ToList();

            var essayQuestionsDelete = quizzInDb.EssayQuestions
                .Except(quizzMapFromRequest.EssayQuestions, new QuizzEssayQuestionComparer()).ToList();
            var essayQuestionsAdd = quizzMapFromRequest.EssayQuestions
                .Except(quizzInDb.EssayQuestions, new QuizzEssayQuestionComparer()).ToList();
            var essayQuestionsUpdate = quizzMapFromRequest.EssayQuestions
                .Except(essayQuestionsDelete, new QuizzEssayQuestionComparer()).Where(c => c.Id > 0).ToList();

            await _unitOfWork.QuizzMultiplechoiceQuestion.DeleteRangeAsync(multipleChoiceQuestionDelete);
            await _unitOfWork.QuizzEssayQuestion.DeleteRangeAsync(essayQuestionsDelete);

            quizzInDb.EssayQuestions.Clear();
            quizzInDb.MultipleChoiceQuestions.Clear();
            quizzInDb.MultipleChoiceQuestions = multiplechoiceQuestionUpdate;
            quizzInDb.EssayQuestions = essayQuestionsUpdate;

            foreach (var item in quizzInDb.MultipleChoiceQuestions)
            {
                item.UpdatedAt = DateTime.Now;
                item.UpdatedBy = currUserId;
            }

            foreach (var item in quizzInDb.EssayQuestions)
            {
                item.UpdatedAt = DateTime.Now;
                item.UpdatedBy = currUserId;
            }

            essayQuestionsAdd.ForEach(item =>
            {
                item.CreatedAt = DateTime.Now;
                item.CreatedBy = currUserId;
                quizzInDb.EssayQuestions.Add(item);
            });

            multipleChoiceQuestionAdd.ForEach(item =>
            {
                item.CreatedAt = DateTime.Now;
                item.CreatedBy = currUserId;
                quizzInDb.MultipleChoiceQuestions.Add(item);
            });

            await _unitOfWork.QuizzTest.UpdateAsync(quizzInDb);
            await _unitOfWork.SaveChangeAsync();

            _responseDto.Result = _mapper.Map<QuizzDto>(quizzInDb);
            _responseDto.IsSuccess = true;

            return _responseDto;
        }

        #region private method 

        private async Task CheckExpiredGoogleImage(List<GoogleImage> googleImages)
        {
            var expiredGoogleImage = new List<GoogleImage>();
            googleImages?.ForEach(item =>
            {
                if (DateTime.Now > item?.Expires)
                {
                    expiredGoogleImage.Add(item);
                }
            });

            if (expiredGoogleImage.Any())
            {
                var rs = await _googlePhotoHelper.GetImagesAsync(expiredGoogleImage?.Select(c => c.Id).ToList());
                foreach (var item in rs.Result.MediaItemResults)
                {
                    var curGoogleImamge = expiredGoogleImage?.FirstOrDefault(c => c.Id == item.MediaItem.Id);
                    curGoogleImamge.BaseUrl = item.MediaItem.BaseUrl;
                    curGoogleImamge.Expires = DateTime.Now.AddMinutes(30);
                    await _unitOfWork.GoogleImage.UpdateAsync(curGoogleImamge);
                }

                await _unitOfWork.SaveChangeAsync();
            }
        }

        #endregion
    }
}
