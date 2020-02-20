using System;
using System.Collections.Generic;

namespace backend.DbModel
{
    public class Conta : IEntityBase
    {
        public uint id { get; set; }
        public int banco { get; set; }
        public int espConta { get; set; }
        public string numeroConta { get; set; }
        public string numeroAgencia { get; set; }
        public string titular { get; set; }
        public string documento { get; set; }
        public decimal valor { get; set; }
        public string periodicidade { get; set; }
        public string dataBaseCorrecao { get; set; }
        public DBEntityState state { get; set; }
    }
}