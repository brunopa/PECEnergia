using Microsoft.AspNetCore.Builder;

public class CompressaoGZipPipeline
{
    public void Configure(IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseResponseCompression();
    }
}