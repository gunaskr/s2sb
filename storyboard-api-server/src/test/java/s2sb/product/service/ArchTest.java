package s2sb.product.service;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("s2sb.product.service");

        noClasses()
            .that()
            .resideInAnyPackage("s2sb.product.service.service..")
            .or()
            .resideInAnyPackage("s2sb.product.service.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..s2sb.product.service.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
