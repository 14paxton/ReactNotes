package movies

import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Delete
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.micronaut.http.annotation.Put
import org.bson.types.ObjectId

@Controller('/gormMovies')
class GormMoviesController {

    private MovieService movieService

    GormMoviesController(MovieService movieService) {
        this.movieService = movieService
    }

    @Get('/')
    List<Movie> list() {
        movieService.list()
    }

    @Post('/')
    Movie save(Movie movie) {
        movie.insert()
    }

    @Get('/{id}')
    Movie get(String id) {
        ObjectId objId = new ObjectId(id)
        movieService.get objId
    }

    @Delete('/{id}')
    HttpResponse<String> delete(String id) {
        ObjectId objId = new ObjectId(id)
        movieService.delete(objId)
        return HttpResponse.ok('{true}')
    }

    @Put(value = "/", consumes = MediaType.APPLICATION_JSON)
    Movie update(@Body Movie movie){
        movieService.delete movie.id
        Movie updateMovie = new Movie()
        updateMovie.title = movie.title
        updateMovie.genre = movie.genre
        updateMovie.numberInStock = movie.numberInStock
        updateMovie.dailyRentalRate = movie.dailyRentalRate
        movieService.save updateMovie
    }
}
