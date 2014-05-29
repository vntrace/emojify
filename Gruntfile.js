module.exports = function(grunt) {
	grunt.initConfig({
	  	browserify: {
		    dev: {
		      	src: 'index.js',
		      	dest: 'build.js',
		      	options: {
		      		transform: ['brfs']
		      	}
		    },
		    prod: {

		    }
	  	},
	  	shell: {
//	  		uglify: {
//	  			options: {
//	  				stdout: true
//	  			},
//	  			command: 'uglifyjs build.js -o build.js'
//	  		}
//                       ,mv: {
//	  			options: {
//	  				stdout: true
//	  			},
//	  			command: 'cp build.js /d/Code/static.gate.local.com/public/static/js/notify.min.js'
//	  		}
	  	}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-shell');
	
	grunt.registerTask("default", ['browserify:dev']);
};