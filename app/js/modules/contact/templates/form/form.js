module.exports = (function(Handlebars) {

var templates = {};

templates["js/contact/form/form"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<form class=\"contact-form\">\n\n	<div class=\"fields\">\n\n		<div class=\"submission-error\">\n			Yikes! Something went wrong, try again!\n			<i class=\"fa fa-close right\"></i>\n		</div>\n\n		<div class=\"field\">\n    		<input type=\"text\" name=\"name\" id=\"name\" placeholder=\"Name\"/>\n		</div>\n\n		<div class=\"field\">\n    		<input type=\"text\" name=\"email\" id=\"email\"  placeholder=\"Email\"/>\n    	</div>\n\n\n		<div class=\"field\">\n    		<textarea name=\"message\" id=\"message\" rows=\"6\" placeholder=\"What's up?\"></textarea>\n		</div>\n\n		<div class=\"thanks-message\">\n			<div class=\"panel\">\n				<h2>Awesome!</h2>\n				<p>Thanks for gettin in touch!<br> I'll be sure to get back to you soon!</p>\n			</div>\n		</div>\n\n	</div>\n\n\n	<button class=\"submit\" value=\"Send\"><span>Fire away!</span><i class=\"fa fa-spinner fa-spin\"></i><i class=\"fa fa-thumbs-up\"></i></button>\n</form>";
  },"useData":true});

return templates;

})(window.Handlebars)["js/contact/form/form"]