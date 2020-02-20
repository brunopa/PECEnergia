
using AutoMapper;
using backend.DbModel;
using backend.Dto;

 
namespace backend.Helpers

{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}