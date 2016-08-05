var app = {

	findByName: function() {
	    var self = this;
	    this.store.findByName($('.search-key').val(), function(employees) {
	        $('.employee-list').html(self.employeeLiTpl(employees));
	    });
	},
	renderHomeView: function() {
	    var html =
	    		"<div style='text-align: center;'>"+
	            "<div class='header'><h1>Home</h1></div>" +
	            "<div class='search-view'>" +
	            "<input class='search-key'/>" +
	            "<ul class='employee-list'></ul>" +
	            "</div>"+
	            "</div>"
	    $('body').html(this.homeTpl());
	    $('.search-key').on('keyup', $.proxy(this.findByName, this));
	},

    showAlert: function (message, title) {
	    if (navigator.notification) {
	        navigator.notification.alert(message, null, title, 'OK');
	    } else {
	        alert(title ? (title + ": " + message) : message);
	    }
	},
	
	initialize: function() {
	    var self = this;
	    this.homeTpl = Handlebars.compile($("#home-tpl").html());
		this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
	    this.store = new MemoryStore(function() {
	        self.showAlert('Store Initialized', 'Info');
	        self.renderHomeView();
	    });
	    $('.search-key').on('keyup', $.proxy(this.findByName, this));
	}

};

app.initialize();