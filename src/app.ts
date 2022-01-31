import { program } from 'commander';
import { loadDependencies } from './loadUtils';

async function myApp() {
  program
    .name('fhir-package-loader')
    .usage('<fhirPackages...> [options]')
    .option('-s, --save <dir>', 'where to save packages to (default is the FHIR cache)')
    .argument(
      '<fhirPackages...>',
      'list of FHIR packages to load using the format packageId@packageVersion...'
    )
    .addHelpText(
      'after',
      `
Examples:
  npx fhir-package-loader hl7.fhir.r5.core@current
  fhir-package-loader hl7.fhir.r4.core@4.0.1 hl7.fhir.us.core@4.0.0 --save ./myProject`
    )
    .version('0.1.0')
    .parse(process.argv);

  const packages = program.args.map(dep => dep.replace('@', '#'));
  const cachePath = program.opts().save;

  // loadDependency('hl7.fhir.r4.core', '4.0.1');
  // const myDefs = await loadDependencies(['hl7.fhir.r4.core#4.0.1', 'hl7.fhir.us.mcode#1.0.0']);
  // const myDefs = await loadDependencies(['hl7.fhir.r4.core#4.0.1']);
  const myDefs = await loadDependencies(packages, cachePath);
  console.log(myDefs.allProfiles().length);
}

async function myAppForLoading() {
  const myDefs = await loadDependencies(
    ['hl7.fhir.r4.core#4.0.1', 'hl7.fhir.us.mcode#1.0.0'],
    '../test-package-load'
  );
  // const myDefs = await loadDependencies(['hl7.fhir.r4.core#4.0.1']);
  console.log(myDefs.allProfiles().length);
}

myApp();
// myAppForLoading();