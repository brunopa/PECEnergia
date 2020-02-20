using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DbModel
{
    public class FileUpload
    {
        public int id { get; set; }
        public string originalFilename { get; set; }

        public string newFileName { get; set; }


    }
}