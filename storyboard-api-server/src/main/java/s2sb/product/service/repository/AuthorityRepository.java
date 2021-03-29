package s2sb.product.service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import s2sb.product.service.domain.Authority;

/**
 * Spring Data MongoDB repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends MongoRepository<Authority, String> {}
