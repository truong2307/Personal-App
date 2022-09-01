using PersonalApp.Models.Entities;
using System.Diagnostics.CodeAnalysis;

namespace PersonalApp.DataAccess.Utility.Comparer
{
    internal class QuizzEssayQuestionComparer : IEqualityComparer<QuizzEssayQuestion>
    {
        public bool Equals(QuizzEssayQuestion? x, QuizzEssayQuestion? y)
        {
            return x.Id == y.Id;
        }

        public int GetHashCode([DisallowNull] QuizzEssayQuestion obj)
        {
            return obj.Id.GetHashCode();
        }
    }
}
