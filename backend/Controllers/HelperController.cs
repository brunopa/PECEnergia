using Microsoft.Extensions.Configuration;
using System;
using System.Web;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using backend.DbModel;
using backend.Helpers;
using CorreiosService;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using TinyCsvParser;
using System.Text;
using TinyCsvParser.Tokenizer;
using OfficeOpenXml;
using System.Data;
using System.Text.RegularExpressions;
using System.Collections;
using OfficeOpenXml.Drawing;
using System.Drawing;

namespace backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Helper")]
    [EnableCors("MyPolicy")]
    //[Authorize]
    public class HelperController : Controller
    {
        private readonly PECEnegiaContext _context;
        private readonly HttpContext _httpContext;

        private IConfiguration _configuration;
        public HelperController(PECEnegiaContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet("BuscarUF")]
        public ActionResult BuscarUF([FromQuery]string nome)
        {
            return Ok(from u in _context.Estado
                      where u.nome.Contains(nome) || u.uf == nome
                      select u);
        }

        [HttpGet("{id}", Name = "GetConsultarCEP")]
        public ActionResult ConsultarCEP(String cep)
        {
            if (string.IsNullOrEmpty(cep))
            {
                return NotFound();
            }

            consultaCEP pacoteCep = new consultaCEP(cep);
            AtendeClienteClient atende = new AtendeClienteClient();
            var ret = atende.consultaCEPAsync(cep);
            var result = ret.Result.@return;


            var address = from u in _context.Estado
                          where u.uf == result.uf
                          select new
                          {
                              endereco = result.end,
                              complemento = result.complemento,
                              bairro = result.bairro,
                              cidade = result.cidade,
                              estado = u
                          };
            return Ok(address.FirstOrDefault());
        }

        [HttpPost("UploadFile"), DisableRequestSizeLimit]
        public ActionResult UploadFile(
            [FromForm] IFormFile file,
            [FromQuery] string id,
            [FromQuery] string type)
        {


            var appSettingsSection = _configuration.GetSection("AppSettings");
            var appSettings = appSettingsSection.Get<AppSettings>();
            string newPath = appSettings.UploadPath;

            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }

            if (file.Length > 0)
            {
                string originalFilename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                originalFilename = originalFilename.Trim('"');

                string newFileName = Guid.NewGuid().ToString();

                if (originalFilename.IndexOf(".") > 0)
                {
                    newFileName = newFileName + originalFilename.Substring(originalFilename.IndexOf("."));
                }

                FileUpload upload = new FileUpload
                {
                    originalFilename = originalFilename,
                    newFileName = newFileName
                };

                this._context.Entry(upload).State = EntityState.Added;
                this._context.SaveChanges();

                string fullPath = Path.Combine(newPath, newFileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return Ok(newFileName);
            }
            return BadRequest("Arquivo não encontrado");
        }

    }
}

