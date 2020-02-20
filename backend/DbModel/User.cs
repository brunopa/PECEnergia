using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DbModel
{
    public class User
    {
        public int id { get; set; }
        public string nome { get; set; }
        public string email { get; set; }
        public byte[] passwordHash { get; set; }
        public byte[] passwordSalt { get; set; }
        public string theme { get; set; }
        public bool ativo { get; set; }
        public bool admin { get; set; }
    }
}
