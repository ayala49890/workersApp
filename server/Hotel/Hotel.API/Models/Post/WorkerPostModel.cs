using Hotel.Core.Entities;
using static Hotel.Core.Hotel.Worker;

namespace Hotel.API.Models.Post
{
    public class WorkerPostModel
    {
        public int Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public DateTime StartWorkingDate { get; set; }
        public string Identity { get; set; }
        public DateTime DateOfBirth { get; set; }
        public TheGender Gender { get; set; }=new TheGender();
        public List<WorkerRolePostModel> Roles { get; set; }
        public bool Status { get; set; }
    }
}
