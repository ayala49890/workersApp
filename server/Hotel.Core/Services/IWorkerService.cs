using Hotel.Core.Entities;
using Hotel.Core.Hotel;
using Hotel.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Core.Services
{
    public interface IWorkerService
    {
        Task<List<Worker>> GetWorkersAsync();
        Task<Worker> GetWorkerAsync(int id);
        Task<Worker> AddWorkerAsync(Worker worker);
        Task<Worker> UpdateWorkerAsync(int id,Worker worker);
        Task<Worker> DeleteWorkerAsync(int id);

    }
}
