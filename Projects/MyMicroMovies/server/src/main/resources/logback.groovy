
import ch.qos.logback.classic.Level
import ch.qos.logback.classic.encoder.PatternLayoutEncoder
import ch.qos.logback.core.ConsoleAppender
import jdk.nashorn.internal.runtime.Debug

import static ch.qos.logback.classic.Level.INFO

appender("STDOUT", ConsoleAppender) {
    withJansi = false
    encoder(PatternLayoutEncoder) {
        pattern = "%cyan(%d{HH:mm:ss.SSS}) %gray([%thread]) %highlight(%-5level) %magenta(%logger{36}) - %msg%n"
    }
}
root(INFO, ["STDOUT"])

logger("movies",DEBUG)
