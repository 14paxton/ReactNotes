
package movies

import com.mongodb.MongoClientSettings
import com.mongodb.ReadConcern
import com.mongodb.ReadPreference
import com.mongodb.WriteConcern
import com.mongodb.client.result.InsertOneResult
import com.mongodb.reactivestreams.client.MongoClient
import groovy.transform.NotYetImplemented
import io.reactivex.Flowable
import io.micronaut.context.ApplicationContext
import io.micronaut.inject.qualifiers.Qualifiers
import io.reactivex.Single
import org.bson.BsonReader
import org.bson.BsonWriter
import org.bson.codecs.Codec
import org.bson.codecs.DecoderContext
import org.bson.codecs.EncoderContext
import org.testcontainers.containers.GenericContainer
import spock.lang.AutoCleanup
import spock.lang.Shared
import spock.lang.Specification
import spock.lang.Unroll

import javax.inject.Singleton

class MongoReactiveConfigurationSpec extends Specification {

    @Shared @AutoCleanup GenericContainer mongo =
            new GenericContainer("mongo:4.0")
                    .withExposedPorts(27017)

    def setupSpec() {
        mongo.start()
    }

    void "test connection with connection string"() {
        when:
        ApplicationContext applicationContext = ApplicationContext.run(
                ("mongodb.uri"): "mongodb://${mongo.containerIpAddress}:${mongo.getMappedPort(27017)}"
        )
        MongoClient mongoClient = applicationContext.getBean(MongoClient)

        then:
        !Flowable.fromPublisher(mongoClient.listDatabaseNames()).blockingIterable().toList().isEmpty()

        when: "A POJO is saved"
        InsertOneResult success = Single.fromPublisher(mongoClient.getDatabase("test").getCollection("test", Movie).insertOne(new Movie(
                title: "The Stand"
        ))).blockingGet()

        then:
        success != null
        success.wasAcknowledged()

        cleanup:
        applicationContext.stop()
    }

}
