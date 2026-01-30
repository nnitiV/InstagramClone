using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimPrincipalExtensions
    {
        public static int GetUserId(this ClaimsPrincipal user)
        {
            var claim = user.FindFirst(ClaimTypes.NameIdentifier);
            if (claim != null && int.TryParse(claim.Value, out int id))
            {
                return id;
            }
            throw new Exception("User ID claim missing or invalid.");
        }
    }
}
