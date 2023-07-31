package movies

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import grails.gorm.annotation.Entity
import org.bson.types.ObjectId

import javax.persistence.Id

@Entity
 class Movie{

    @Id
    @JsonSerialize(using = ToStringSerializer)
    ObjectId id

    @JsonSerialize(using = ToStringSerializer)
    ObjectId genre

    String title
    Long numberInStock
    Long dailyRentalRate


    @Override
     String toString(){
         return "{id: $id, title: $title, genre: $genre,numberInStock: $numberInStock,dailyRentalRate: $dailyRentalRate}"
     }

}
