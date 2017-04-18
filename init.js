e = window;
function r() {
	this.f = 0;
	this.results = [];
	this.c = [];
	this.h = "us";
	this.language = "en";
	this.results = {};
	this.i = 0;
	this.stop = !0;
	this.j = !1;
	this.w = document.getElementById("results");
	this.s = this.w.getElementsByTagName("tbody")[0];
	this.v = 200
}
r.prototype.o = function () {
	if (this.f < this.c.length && !this.stop) {
		var c = this.c[this.f++],
			f = this.language,
			h = this.o.bind(this);
		c.h = this.h;
		c.language = f;
		c.g = h;
		"synonyms" == c.source ? t(c) :  "cafepress" == c.source ? fetchCafepress(this, c) : "google" == c.source ? u(this, c) : "amazon" == c.source ? v(this, c) : e.alert("Unknown source")
	} else this.j = !1, w()
};


function u(c, f) {
	var h = f.a,
		n = f.g,
		d = new XMLHttpRequest;
	d.open("GET", "https://www.google.com/complete/search?client=serp&hl=" + f.language + "&gs_rn=64&gs_ri=serp&tok=_26fsU2zJJ1O7pXrkf9WGw&cp=" + (f.b + 1) + "&gs_id=fe&q=" + h + "&xhr=t&gl=" + f.h, !0);
	d.onreadystatechange = function () {
		if (403 == d.status) e.alert("Google has blocked us. Please try after sometime."), w();
		else if (400 == d.status) e.alert("Some error occured"), w();
		else if (4 == d.readyState && 200 == d.status) {
			var f = e.JSON.parse(d.responseText),
				k;
			for (k in f[1]) {
				var g = f[1][k][0],
					l = document.createElement("div");
				l.innerHTML = g;
				g = l.textContent || l.innerText;
				if (!(g in c.results)) {
					var l = e.parseInt(k) + 1,
						q = 1 + c.i++,
						l = {
							a: g,
							m: l,
							u: h,
							source: "Google",
							index: q
						};
					c.results[g] = l;
					x(c, l)
				}
			}
			y(c);
			window.setTimeout(n, c.v)
		}
	};
	d.send()
}

function fetchCafepress(c, f) {
	var h = f.a,
		n = f.g,
		d = new XMLHttpRequest;
	d.open("GET", "http://www.cafepress.com/cp/catalogexp/suggestion.asmx/AutoComplete?s=" + h, !0);
	d.onreadystatechange = function () {
		if (403 == d.status) e.alert("Cafepress has blocked us. Please try after sometime."), w();
		else if (400 == d.status) e.alert("Some error occured"), w();
		else if (4 == d.readyState && 200 == d.status) {
			debugger;
			var
				_d = (new e.DOMParser).parseFromString(d.responseText, "text/xml").querySelectorAll("string");
			f = _d && _d.length ? Array.prototype.map.bind(_d, function (_d) {
				return _d.textContent
			})() : ["<span class='na'>Similars not available</span>"];
			var k;
			for (k in f) {
				var g = f[k];
					l = document.createElement("div");
				l.innerHTML = g;
				g = l.textContent || l.innerText;
				if (!(g in c.results)) {
					var l = e.parseInt(k) + 1,
						q = 1 + c.i++,
						l = {
							a: g,
							m: l,
							u: h,
							source: "Cafepress",
							index: q
						};
					c.results[g] = l;
					x(c, l)
				}
			}
			y(c);
			window.setTimeout(n, c.v)
		}
	};
	d.send()
}

function v(c, f) {
	var h = f.a,
		n = f.g;
	f = "http://completion.amazon.com/search/complete?method=completion&mkt=1&client=amazon-search-ui&search-alias=aps&q=" + h + "&qs=&cf=1&noCacheIE=1439383634993&fb=1&sc=1";
	var d = new XMLHttpRequest;
	d.open("GET", f, !0);
	d.onreadystatechange = function () {
		if (403 == d.status) e.alert("Amazon has blocked us. Please try after sometime."), w();
		else if (400 == d.status) e.alert("Some error occured"), w();
		else if (4 == d.readyState && 200 == d.status) {
			var f = e.JSON.parse(d.responseText)[1],
				k;
			for (k in f) {
				var g = f[k];
				if (!(g in c.results)) {
					var l = e.parseInt(k) + 1,
						q = 1 + c.i++,
						l = {
							a: g,
							m: l,
							u: h,
							source: "Amazon",
							index: q
						};
					c.results[g] = l;
					x(c, l)
				}
			}
			y(c);
			window.setTimeout(n, 200)
		}
	};
	d.send()
}

function t(c) {
	var f = c.g,
		h = new XMLHttpRequest;
	h.open("GET", "http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/" + e.encodeURIComponent(c.a) + "?key=cf6596ea-440b-42fb-9bbd-70a4525c8c95");
	h.setRequestHeader("Access-Control-Allow-Origin", "vlOd1B55lxmsh4L23vsNdLdjOsldp1AmJZ0jsnwWyStRgQLCsS");
	h.onreadystatechange = function () {
		if (403 == h.status) e.alert("Synonym service not working for now."), w();
		else if (400 == h.status) e.alert("Some error occured"), w();
		else if (4 == h.readyState && 404 == h.status) window.setTimeout(f, 404);
		else if (4 == h.readyState && 200 == h.status) {
			var c = {},
				d = (new e.DOMParser).parseFromString(h.responseText, "text/xml").querySelectorAll("entry sens syn");
			c.synonyms = d && d.length ? Array.prototype.map.bind(d, function (d) {
				return d.textContent
			})().join(",").split(",").map(function (d) {
				return d.trim()
			}) : ["<span class='na'>Similars not available</span>"];
			if (c && c.synonyms.length) {
				var d = document.getElementById("synonyms").getElementsByTagName("tbody")[0],
					m, k, g;
				for (g in c.synonyms) k = c.synonyms[g], m = document.createElement("td"), m.innerHTML = k, d.appendChild(document.createElement("tr").appendChild(m).parentElement)
			}
			window.setTimeout(f, 200)
		}
	};
	h.send()
}

function x(c, f) {
	var h = f.a,
		n = f.m,
		d, m = c.s,
		k = document.createElement("tr");
	k.a = h;
	k.className += " " + f.source.toLocaleLowerCase();
	d = document.createElement("td");
	d.innerHTML = n.toString();
	k.appendChild(d);
	d = document.createElement("td");
	d.innerHTML = h;
	k.appendChild(d);
	m.appendChild(k)
}

function y(c) {
	document.getElementById("progressbar").value = c.f / c.c.length * 100
}

function w() {
	document.getElementById("control").className = "button green_button";
	document.getElementById("control").innerHTML = "Start";
	document.getElementById("progressbar_wrap").style.visibility = "hidden"
}
document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".result-filter .filter").forEach(function (c) {
		c.addEventListener("click", function () {
			var c = document.querySelector("table#results > tbody");
			c.classList.remove("filter-google", "filter-amazon", "filter-cafepress");
			var f;
			if (this.classList.contains("filter-active")){
				this.classList.remove("filter-active");
			}
			else if (this.classList.contains("filter-google")) {
				var f = document.querySelector(".filter-active");
				f && f.classList.remove("filter-active");
				c.classList.add("filter-google");
				this.classList.add("filter-active")
			} else if( this.classList.contains("filter-amazon")){
				var f = document.querySelector(".filter-active");
				f && f.classList.remove("filter-active");
				c.classList.add("filter-amazon");
				this.classList.add("filter-active")
			}else if( this.classList.contains("filter-cafepress")){
				var f = document.querySelector(".filter-active");
				f && f.classList.remove("filter-active");
				c.classList.add("filter-cafepress");
				this.classList.add("filter-active")
			}
		})
	});
	var c = new r;
	document.getElementById("control").addEventListener("click", function () {
		if (c.j) c.stop = !0, w();
		else {
			var f = document.getElementById("seed").value.trim();
			if (0 == f.length) e.alert("Please enter a keyword");
			else {
				var f = f.split("ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Ãƒâ€šÃ‚Âµ"),
					h = [];
				c.c = [];
				for (var n = 0; n < f.length; n++) {
					var d = f[n],
						m = d.trim(); - 1 == d.indexOf("*") && (m = d + " *");
					var k = m.indexOf("*"),
						d = m.replace("*", "").trim();
					0 < d.length &&
						h.push({
							l: d,
							b: k
						});
					for (var k = c, d = h, g = 0; g < d.length; g++) {
						var l = d[g].l;
						l ? (l = {
							a: l,
							b: d[g].b,
							source: "google"
						}, k.c.push(l)) : null
					}
					for (g = 0; g < d.length; g++) l = {
						a: d[g].l,
						b: d[g].b,
						source: "amazon"
					}, k.c.push(l);
					for (g = 0; g < d.length; g++) l = {
						a: d[g].l,
						b: d[g].b,
						source: "cafepress"
					}, k.c.push(l);
					for (g = 0; g < d.length; g++) l = {
						a: d[g].l,
						b: d[g].b,
						source: "synonyms"
					}, k.c.push(l);
					for (g = 0; 26 > g; g++) h = m.replace("*", "abcdefghijklmnopqrstuvwxyz".charAt(g)).trim(), 0 < h.length && (k.c.push({
						source: "amazon",
						a: h,
						b: d[0].b
					}), k.c.push({
						source: "google",
						a: h,
						b: d[0].b
					}), k.c.push({
						source: "cafepress",
						a: h,
						b: d[0].b
					}))
				}
				c.f = 0;
				c.stop = !1;
				c.j = !0;
				document.getElementById("control").className = "button red_button";
				document.getElementById("control").innerHTML = "Stop";
				document.getElementById("progressbar_wrap").style.visibility = "visible";
				c.o();
				c.results = {};
				c.i = 0;
				document.getElementById("results").getElementsByTagName("tbody")[0].innerHTML = "";
				document.getElementById("synonyms").getElementsByTagName("tbody")[0].innerHTML = ""
			}
		}
	});
	document.getElementById("seed").addEventListener("keyup", function (c) {
		if (13 == c.keyCode) document.getElementById("control")["click"]()
	})
});
