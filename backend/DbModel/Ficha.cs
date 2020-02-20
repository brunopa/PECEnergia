using System;
using System.Collections.Generic;

namespace backend.DbModel
{
    public partial class Ficha : IEntityBase
    {
        public uint id { get; set; }
        public List<FichaProprietario> proprietarios { get; set; }
        //public int contaId { get; set; }
        public Conta conta { get; set; }
        //public int imovelId { get; set; }
        public Imovel imovel { get; set; }
        public int usuid { get; set; }
        public DateTime dataInclusao { get; set; }
        public string status { get; set; }

        public DBEntityState state { get; set; }
    }
}
