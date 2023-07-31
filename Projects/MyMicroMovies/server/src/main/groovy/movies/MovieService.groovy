package movies

import grails.gorm.services.Service
import org.bson.types.ObjectId

@Service(Movie)
interface MovieService {
    List<Movie> list()

    Movie save(Movie m)

    Movie get(ObjectId id)

    Movie delete(ObjectId id)


}
