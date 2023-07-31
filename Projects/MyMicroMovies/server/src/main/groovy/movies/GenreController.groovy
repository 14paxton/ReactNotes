package movies


import com.mongodb.client.result.DeleteResult
import com.mongodb.client.result.UpdateResult
import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoCollection
import com.mongodb.reactivestreams.client.Success
import grails.gorm.transactions.Transactional
import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.*
import org.bson.Document
import org.bson.types.ObjectId

import static RxJavaHelpers.SubscriberHelpers.ObservableSubscriber
import static com.mongodb.client.model.Filters.eq


@Controller("/genres")
public class GenreController {
//    private static final Logger LOG = LoggerFactory.getLogger("movies")

    private final MongoClient mongoClient

    GenreController(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @Produces(MediaType.APPLICATION_JSON )
    @Get("/")
    List<Genre> allMovies() {
        ObservableSubscriber<Genre> subscriber = new ObservableSubscriber<Genre>()
        getMovieCollection().find().subscribe(subscriber)
        subscriber.await().received.collect {it as Genre}
    }

    @Produces(MediaType.APPLICATION_JSON )
    @Get("/{id}")
    Genre find(String id) {
        def objId = new ObjectId(id)
        ObservableSubscriber<Genre> subscriber = new ObservableSubscriber<Genre>()
        getMovieCollection().find(eq('_id', objId)).subscribe(subscriber)
        Genre genre = subscriber.await().received[0]
        return  genre

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
     HttpResponse update(@Body Genre data) {
        Document updatedGenre = new Document()
                .append("name", data.name)

        ObservableSubscriber<UpdateResult> subscriber = new ObservableSubscriber<UpdateResult>()
        getMovieCollection().replaceOne(eq("_id", data.id) , updatedGenre)
                .subscribe(subscriber)
        subscriber.await()

        return HttpResponse.ok('{true}')
    }

    @Post(value = "/", consumes = MediaType.APPLICATION_JSON)
    @Transactional
    HttpResponse save(@Body Genre data) {
        Document newGenre = new Document()
                .append("name", data.name)


        ObservableSubscriber<Success> subscriber = new ObservableSubscriber<Success>()
        getMovieCollection().insertOne(newGenre).subscribe(subscriber)
        subscriber.await()

        return HttpResponse.ok('{true}')

    }



    private MongoCollection<Genre> getMovieCollection(){
        return mongoClient
                .getDatabase("vidly")
                .getCollection("genre", Genre.class)
    }


}

