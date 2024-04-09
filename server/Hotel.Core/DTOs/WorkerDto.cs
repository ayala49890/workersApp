using Hotel.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Hotel.Core.Hotel.Worker;


namespace Hotel.Core.DTOs
{
    public class WorkerDto
    {
        public int Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public DateTime StartWorkingDate { get; set; }
        public string Identity { get; set; }
    }
}
