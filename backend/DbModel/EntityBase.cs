using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DbModel
{
    public enum DBEntityState
    {
        unchanged = 0,
        inserted = 1,
        altered = 2,
        deleted = 3,
    }

    public interface IEntityBase
    {
        uint id { get; set; }
        DBEntityState state { get; set; }
    }
}
