package movies

import io.micronaut.runtime.Micronaut
import groovy.transform.CompileStatic

@CompileStatic
class Application {
    static void main(String[] args) {
        Micronaut.run(Application)



//        def porn = new Genre(name: "Porno").save(flush: true)
//        def action = new Genre(name: "Action").save(flush: true)
//        def scifi = new Genre(name: "SciFi").save(flush: true)
//
//        new Movie(title: "Robocop", genre: scifi.id, numberInStock: 4, dailyRentalRate: 3).save(flush: true)
//        new Movie(title: "Die Hard", genre: action.id, numberInStock: 4, dailyRentalRate: 3).save(flush: true)
//        new Movie(title: "Back Door Sluts", genre: porn.id, numberInStock: 4, dailyRentalRate: 3).save(flush: true)


    }


}
