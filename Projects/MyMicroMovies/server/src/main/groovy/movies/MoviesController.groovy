package movies

import com.mongodb.client.result.UpdateResult
import io.micronaut.http.annotation.Delete
import org.bson.types.ObjectId
import com.mongodb.client.result.DeleteResult
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoCollection
import com.mongodb.reactivestreams.client.Success;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Produces
import grails.gorm.transactions.Transactional
import io.micronaut.http.annotation.Put
import org.bson.Document

import static com.mongodb.client.model.Filters.*
import static RxJavaHelpers.SubscriberHelpers.ObservableSubscriber

@Controller("/movies")
public class MoviesController {
//    private static final Logger LOG = LoggerFactory.getLogger("movies")

    private final MongoClient mongoClient

     MoviesController(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }



    @Produces(MediaType.APPLICATION_JSON )
    @Get("/")
    List<Movie> allMovies() {
        ObservableSubscriber<Movie> subscriber = new ObservableSubscriber<Movie>()
        getMovieCollection().find().subscribe(subscriber)
        subscriber.await().received.collect {it as Movie}

    }

    @Produces(MediaType.APPLICATION_JSON )
    @Get("/{id}")
    Movie find(String id) {
        def objId = new ObjectId(id)
        ObservableSubscriber<Movie> subscriber = new ObservableSubscriber<Movie>()
        getMovieCollection().find(eq('_id', objId)).subscribe(subscriber)
        Movie movie = subscriber.await().received[0]
        return  movie

    }



    @Produces(MediaType.TEXT_JSON)
    @Delete("/{id}")
    HttpResponse<String> delete(String id) {
        def objId = new ObjectId(id)
        ObservableSubscriber<DeleteResult> subscriber = new ObservableSubscriber<DeleteResult>()
        getMovieCollection().deleteOne(eq('_id', objId))
                .subscribe(subscriber)
        def deleteResult = subscriber.await().getReceived().first()
        if(deleteResult.getDeletedCount() < 1)
        {
            return HttpResponse.notFound('{false}')
        }

        return HttpResponse.ok('{true}')

    }

    @Put(value = "/", consumes = MediaType.APPLICATION_JSON)
     HttpResponse update(@Body Movie data) {
        Document updatedMovie = new Document()
                .append("title", data.title)
                .append("genre", data.genre)
                .append("numberInStock", data.numberInStock)
                .append("dailyRentalRate", data.dailyRentalRate)

        ObservableSubscriber<UpdateResult> subscriber = new ObservableSubscriber<UpdateResult>()
        getMovieCollection().replaceOne(eq("_id", data.id) , updatedMovie)
                .subscribe(subscriber)
        subscriber.await()

        return HttpResponse.ok('{true}')
    }

    @Post(value = "/", consumes = MediaType.APPLICATION_JSON)
    @Transactional
    HttpResponse save(@Body Movie data) {
        Document newMovie = new Document()
                .append("title", data.title)
                .append("genre", data.genre)
                .append("numberInStock", data.numberInStock)
                .append("dailyRentalRate", data.dailyRentalRate)


        ObservableSubscriber<Success> subscriber = new ObservableSubscriber<Success>()
        getMovieCollection().insertOne(newMovie).subscribe(subscriber)
//        col.insertOne(doc).subscribe(subscriber)
        subscriber.await()

        return HttpResponse.ok('{true}')

    }



    private MongoCollection<Movie> getMovieCollection(){
        return mongoClient
                .getDatabase("vidly")
                .getCollection("movie", Movie.class)
    }


}

