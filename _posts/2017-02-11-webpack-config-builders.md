Sometimes you may want to share a webpack confit between multiple contexts, for example, between your build system, test harness, and perhaps even a devboard / storyboard system. Sharing a webpack confit is particularly useful if your code is written with the assumption that non-standard file extensions and loaders are used. A simple solution would be to just have one webpack config for unit tests, another for your build system, another for your devboqrd system.

 Also, between projects, you may want to keep a standard config.
 
  Even for independently packaged components, you could package a config builder that you can just run your webpack config through.
  
  State the problem
    Multiple contexts
     Test runner
    Devboard
    Multiple projects with common codebase
    Independently packaged modules that assume a certain configuration
  
  Admin app
  Public app
  Shared code between them
  
  Common config 
  But each has nuances that also need to make it into the webpack config
  
Independeltly packaged component
If it assumes a certain loader for its files, should also package a config that will help set up that loader 

Same application, code run in multiple contexts
Unit tests run natively, no need to build scss, optimize bundles with tree shaking
Devboard cards, need scans, but don't need optimization, need built scss, don't need styles extracted



