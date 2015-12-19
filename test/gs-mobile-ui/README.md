To use any of the ionic.io services (ionicPush, ionicDeploy, etc...)                                                                                   
  1) Create your project on https://apps.ionic.io                                                                                                      
  2) gulp_tasks/common/constants.js:                                                                                                                   
     - fill in constants.ionic.app.app_id and constants.ionic.app.api_key                                                                              
  3) Run gulp ionic:platformcopy --target=app                                                                                                          
  4) client/index.html:                                                                                                                                
     - comment out line 22 to disable the default loading of cordova.js                                                                                
  5) client/scripts/main.js:                                                                                                                           
     - uncomment line 14 to require client/scripts/ionic.io.bundle.min.js                                                                              
     - uncomment the module dependency for 'ionic.service.core'                                                                                        
                                                                                                                                                       
Woot generator-sublime:app! It appears that everything installed correctly.                                                                            
                                                                                                                                                       
Woot generator-sublime:gulps! It appears that everything installed correctly. 