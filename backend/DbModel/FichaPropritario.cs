using System;
using System.Collections.Generic;

namespace backend.DbModel
{
    public partial class FichaProprietario : IEntityBase
    {
        public uint id { get; set; }
        public uint fichaId { get; set; }
        public uint proprietarioId { get; set; }
        public bool principal { get; set; }
        public Proprietario proprietario { get; set; }
        public DBEntityState state { get; set; }
    }
}
