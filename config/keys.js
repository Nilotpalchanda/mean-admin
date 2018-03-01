// add thsi file in .gitignore

module.exports = {
	google: {

        clientID: '352813101130-ki77gpp8ae51nhf45a3dim9shgatdlvh.apps.googleusercontent.com',
        clientSecret: 'VtdeCLZEc3oe9X9PX37frJBB'
    },
    
    // github

    github:{
      
    clientID: 'ac5235f3862841dc826c',
    clientSecret: '4a7de666c57f6c0a73e1b2a683988d3cfc22c76f'
    },

    // twitter

    twitter:{
        consumerKey: '4thdI7cygRTQzR2OKuKmqDSS1',
        consumerSecret: 'wbJbInZooOdZsLgL9FbnAUgGNeGhpx1i7x9cDNJEO6crAD4jiM'
    },

    //mongodb db connection url with password
    mongodb: {

        dbURI: 'mongodb://meanadmin:meanadmin@ds251548.mlab.com:51548/meanadmin'

    },


    //cookie key
    session:{
    	cookieKey : 'nilotpalchandacookie'
    }
}