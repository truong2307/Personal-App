using PersonalApp.Models.Entities;
using System.Diagnostics.CodeAnalysis;

namespace PersonalApp.DataAccess.Utility.Comparer
{
    public class QuizzMultiplechoiceQuestionComparer : IEqualityComparer<QuizzMultipleChoiceQuestion>
    {
        public bool Equals(QuizzMultipleChoiceQuestion? x, QuizzMultipleChoiceQuestion? y)
        {
            return x.Id == y.Id;
        }

        public int GetHashCode([DisallowNull] QuizzMultipleChoiceQuestion obj)
        {
            return obj.Id.GetHashCode();
        }
    }
}
