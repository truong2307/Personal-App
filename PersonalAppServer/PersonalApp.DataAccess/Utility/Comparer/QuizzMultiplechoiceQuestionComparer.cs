using PersonalApp.Models.Entities;
using System.Diagnostics.CodeAnalysis;

namespace PersonalApp.DataAccess.Utility.Comparer
{
    public class QuizzMultiplechoiceQuestionComparer : IEqualityComparer<QuizzMultiplechoiceQuestion>
    {
        public bool Equals(QuizzMultiplechoiceQuestion? x, QuizzMultiplechoiceQuestion? y)
        {
            return x.Id == y.Id;
        }

        public int GetHashCode([DisallowNull] QuizzMultiplechoiceQuestion obj)
        {
            return obj.Id.GetHashCode();
        }
    }
}
