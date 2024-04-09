using Hotel.Core.Hotel;
using Hotel.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Core.Entities
{
    public class WorkerRole
    {
        public int Id { get; set; }
        public int WorkerID { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public DateTime EntryDate { get; set; }

    }
}
