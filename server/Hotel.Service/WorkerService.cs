using Hotel.Core.Entities;
using Hotel.Core.Hotel;
using Hotel.Core.Repositories;
using Hotel.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Service
{
    public class WorkerService : IWorkerService
    {
        private readonly IWorkerRepository _workerRepository;

        public WorkerService(IWorkerRepository workerRepository)
        {
            _workerRepository = workerRepository;
        }

        public async Task<Worker> AddWorkerAsync(Worker worker)
        {
            await _workerRepository.AddWorkerToWorkersAsync(worker);
            return worker;
        }


        public async Task<Worker> DeleteWorkerAsync(int id)
        {
            return await _workerRepository.ChangeStatusAsync(id);
        }


        public async Task<Worker> GetWorkerAsync(int id)
        {
            return await _workerRepository.GetWorkerByIdAsync(id);
        }

        public async Task<List<Worker>> GetWorkersAsync()
        {
            return await _workerRepository.GetAllWorkersAsync();
        }
        
        public async Task<Worker> UpdateWorkerAsync(int id, Worker worker)
        {
            return await _workerRepository.UpdateWorkerByIdAsync(id,worker);
        }
       

    }
}
