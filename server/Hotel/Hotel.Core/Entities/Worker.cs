using Hotel.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Core.Hotel
{
    public class Worker
    {
        public enum TheGender { Male = 1, Female }
        public int Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public DateTime StartWorkingDate { get; set; }
        public string Identity { get; set; }
        public DateTime DateOfBirth { get; set; }
        public TheGender Gender { get; set; }
        public List<WorkerRole> Roles { get; set; }
        public bool Status { get; set; }
    }
}
