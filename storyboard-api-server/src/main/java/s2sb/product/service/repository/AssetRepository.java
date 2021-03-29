package s2sb.product.service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import s2sb.product.service.domain.Asset;

/**
 * Spring Data MongoDB repository for the Asset entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssetRepository extends MongoRepository<Asset, String> {}
