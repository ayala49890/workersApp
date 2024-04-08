using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Core.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsAdministrative { get; set; }
    }
}
