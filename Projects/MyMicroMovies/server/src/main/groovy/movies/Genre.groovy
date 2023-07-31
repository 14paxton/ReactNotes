package movies

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import grails.gorm.annotation.Entity
import org.bson.types.ObjectId

import javax.persistence.Id

@Entity
class Genre implements Serializable {

    @Id
    @JsonSerialize(using = ToStringSerializer)
    ObjectId id

    String name


}
