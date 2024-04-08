using AutoMapper;
using Hotel.API.Models;
using Hotel.API.Models.Post;
using Hotel.Core;
using Hotel.Core.DTOs;
using Hotel.Core.Entities;
using Hotel.Core.Hotel;
using Hotel.Core.Models;
using Hotel.Core.Services;
using Hotel.Data;
using Hotel.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hotel.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
        private readonly IWorkerService _workerService;
        private readonly IMapper _mapper;
        public WorkersController(IWorkerService workerService, IMapper mapper)
        {
            _workerService = workerService;
            _mapper = mapper;

        }

        // GET: api/<WorkerController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var workers = await _workerService.GetWorkersAsync();
            return Ok(_mapper.Map<IEnumerable<WorkerDto>>(workers));
        }

        // GET api/<WorkerController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var worker = await _workerService.GetWorkerAsync(id);
            if (worker == null)
                return NotFound();
            //var workerDto = _mapper.Map<WorkerDto>(worker);
            //return Ok(workerDto);
            return Ok(worker);

        }

        // POST api/<WorkerController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] WorkerPostModel worker)
        {
            var workerToAdd = _mapper.Map<Worker>(worker);
            var addedWorker = await _workerService.AddWorkerAsync(workerToAdd);
            var newWorker = await _workerService.GetWorkerAsync(addedWorker.Id);
            var workerDto = _mapper.Map<WorkerDto>(newWorker);
            return Ok(workerDto);

        }


        // PUT api/<WorkerController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] WorkerPostModel worker)
        {
            var existWorker = await _workerService.GetWorkerAsync(id);
            if (existWorker is null)
            {
                return NotFound();
            }
            _mapper.Map(worker, existWorker);
            await _workerService.UpdateWorkerAsync(id, existWorker);
            return Ok(_mapper.Map<WorkerDto>(existWorker));


        }

        // DELETE api/<WorkerController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await _workerService.DeleteWorkerAsync(id));
        }
    }
}
