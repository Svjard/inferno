import Inferno from '../../../../src';

const {
	createElement
} = Inferno.TemplateFactory;

describe('DOM SVG tests (no-jsx)', () => {
	let container;

	beforeEach(() => {
		container = document.createElement('div');
	});
	afterEach(() => {
		Inferno.render(null, container);
	});

	describe('using the Inferno functional API', () => {

		describe('should respect SVG namespace and render SVG attributes', () => {
			it('Initial render (creation)', () => {
				const template = Inferno.createTemplate((val1) =>
						createElement('svg', {
							xmlns: 'http://www.w3.org/2000/svg',
							version: '1.1',
							baseProfile: 'full',
							width: '200',
							height: val1
						}, null)
				);
				Inferno.render(template(200), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute('xmlns')).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute('version')).to.eql('1.1');
				expect(container.firstChild.getAttribute('baseProfile')).to.eql('full');
				expect(container.firstChild.getAttribute('width')).to.eql('200');

				expect(
					container.innerHTML
				).to.equal(
					'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="200" height="200"></svg>'
				);
			});
			it('Second render (update)', () => {
				const template = Inferno.createTemplate(() =>
						createElement('svg', {width: 200}, null)
				);
				Inferno.render(template(), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute('width')).to.eql('200');
				expect(
					container.innerHTML
				).to.equal(
					'<svg width="200"></svg>'
				);
				Inferno.render(template(), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute('width')).to.eql('200');
				expect(
					container.innerHTML
				).to.equal(
					'<svg width="200"></svg>'
				);

			});
		});

		describe('should set "class" attribute', () => {
			it('Initial render (creation)', () => {
				const template = Inferno.createTemplate(() =>
					createElement('svg', {xmlns: "http://www.w3.org/2000/svg", className: "hello, world!"})
				);
				Inferno.render(template(), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute('xmlns')).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute('class')).to.eql('hello, world!');

				expect(
					container.innerHTML
				).to.equal(
					'<svg xmlns="http://www.w3.org/2000/svg" class="hello, world!"></svg>'
				);
			});
			it('Second render (update)', () => {
				const template = Inferno.createTemplate((val1) =>
					createElement('svg', {height: val1})
				);
				Inferno.render(template(200), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql('svg');
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute('height')).to.eql('200');
				expect(
					container.innerHTML
				).to.equal(
					'<svg height="200"></svg>'
				);
			});
		});

		describe('should drive a advanced SVG circle with attributes', () => {
			it('Initial render (creation)', () => {
				let style = {stroke: '#000099', fill: '#000099', fontSize: 18};
				const template = Inferno.createTemplate((val1) =>
					createElement('svg', null,
						createElement('rect', {
							x: 50,
							y: 200,
							rx: 5,
							ry: 5,
							width: 100,
							height: 100,
							fill: '#CCCCFF'
						}, null),
						createElement('text', {x: 55, y: 220, style}, 'Weeeee!'),
						createElement('animateTransform', {
							attributeName: 'transform',
							type: 'rotate',
							values: '0 150 100; 360 150 100',
							repeatCount: 'indefinite',
							begin: '0s',
							dur: '5s'
						}, null)
					)
				);
				Inferno.render(template(false), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql("svg");
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.firstChild.getAttribute("width")).to.eql('100');
				expect(container.firstChild.firstChild.getAttribute("height")).to.eql('100');
				expect(container.firstChild.firstChild.getAttribute("fill")).to.eql('#CCCCFF');

				expect(
					container.innerHTML
				).to.equal(
					'<svg><rect x="50" y="200" rx="5" ry="5" width="100" height="100" fill="#CCCCFF"></rect><text x="55" y="220" style="stroke: rgb(0, 0, 153); fill: rgb(0, 0, 153); font-size: 18px;">Weeeee!</text><animateTransform attributeName="transform" type="rotate" values="0 150 100; 360 150 100" repeatCount="indefinite" begin="0s" dur="5s"></animateTransform></svg>'
				);
			});
			it('Second render (update)', () => {
				const template = Inferno.createTemplate((val1) =>
					createElement('svg', {height: 200}, null)
				);
				Inferno.render(template(false), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql("svg");
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute("height")).to.eql('200');
				expect(
					container.innerHTML
				).to.equal(
					'<svg height="200"></svg>'
				);
			});
		});

		describe('should set "className" property as a "class" attribute', () => {
			it('Initial render (creation)', () => {
				const template = Inferno.createTemplate(() =>
					createElement('svg', {xmlns: 'http://www.w3.org/2000/svg', className: 'hello, world!'})
				);
				Inferno.render(template(), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql("svg");
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute("xmlns")).to.eql("http://www.w3.org/2000/svg");
				expect(container.firstChild.getAttribute("class")).to.eql("hello, world!");

				expect(
					container.innerHTML
				).to.equal(
					'<svg xmlns="http://www.w3.org/2000/svg" class="hello, world!"></svg>'
				);
			});
			it('Second render (update)', () => {
				const template = Inferno.createTemplate((val1) =>
					createElement('svg', {xmlns: 'http://www.w3.org/2000/svg', className: false})
				);
				Inferno.render(template(false), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql("svg");
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute("xmlns")).to.eql("http://www.w3.org/2000/svg");
				expect(container.firstChild.getAttribute("class")).to.eql(null);
				expect(
					container.innerHTML
				).to.equal(
					'<svg xmlns="http://www.w3.org/2000/svg"></svg>'
				);
				Inferno.render(template(), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql("svg");
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute("xmlns")).to.eql("http://www.w3.org/2000/svg");
				expect(container.firstChild.getAttribute("class")).to.eql(null);
				expect(
					container.innerHTML
				).to.equal(
					'<svg xmlns="http://www.w3.org/2000/svg"></svg>'
				);

			});
		});

		describe('should set "viewBox" attribute', () => {
			it('Initial render (creation)', () => {
				const template = Inferno.createTemplate((val1) =>
					createElement('svg', {xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 50 20'})
				);
				Inferno.render(template(false), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql("svg");
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute("xmlns")).to.eql("http://www.w3.org/2000/svg");
				expect(container.firstChild.getAttribute("viewBox")).to.eql('0 0 50 20');

				expect(
					container.innerHTML
				).to.equal(
					'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 20"></svg>'
				);
			});
			it('Second render (update)', () => {
				const template = Inferno.createTemplate((val1) =>
					createElement('svg', {x1: 200, x2: 10})
				);
				Inferno.render(template(false), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql("svg");
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute("x1")).to.eql('200');
				expect(container.firstChild.getAttribute("x2")).to.eql('10');
				expect(
					container.innerHTML
				).to.equal(
					'<svg x1="200" x2="10"></svg>'
				);
			});
		});

		describe('should SVG element with children', () => {
			it('Initial render (creation)', () => {
				const style_1 = {border: "1px solid #cccccc"};
				const style_2 = {stroke: "#000000", fill: "#none"};
				const template = Inferno.createTemplate((val1) =>
					createElement('svg', {
							width: '100',
							height: '200',
							viewBox: '0 0 50 50',
							preserveAspectRatio: 'xMinYMin meet',
							style: style_1
						},
						createElement('circle', {cx: '25', cy: '25', r: '25', style: style_2})
					)
				);
				Inferno.render(template(false), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql("svg");
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(
					container.innerHTML
				).to.equal(
					'<svg width="100" height="200" viewBox="0 0 50 50" preserveAspectRatio="xMinYMin meet" style="border: 1px solid rgb(204, 204, 204);"><circle cx="25" cy="25" r="25" style="stroke: rgb(0, 0, 0);"></circle></svg>'
				);
			});
			it('Second render (update)', () => {
				const template = Inferno.createTemplate((val1) =>
						createElement('svg', {width: val1})
				);
				Inferno.render(template(200), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql("svg");
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute("width")).to.eql('200');
				expect(
					container.innerHTML
				).to.equal(
					'<svg width="200"></svg>'
				);

				Inferno.render(template(55), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql("svg");
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute("width")).to.eql('55');
				expect(
					container.innerHTML
				).to.equal(
					'<svg width="55"></svg>'
				);

			});
		});

		describe('should set xlink namespace attribute', () => {
			it('Initial render (creation)', () => {
				const template = Inferno.createTemplate(() =>
					createElement('img', {"xlink:href": "test.jpg"})
				);
				Inferno.render(template(null), container);

				expect(container.firstChild.getAttributeNS("http://www.w3.org/1999/xlink", "href")).to.eql("test.jpg");
				expect(
					container.innerHTML
				).to.equal(
					'<img xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="test.jpg">'
				);
			});
			it('Second render (update)', () => {
				const template = Inferno.createTemplate((val1) =>
						createElement('svg', {version: 200})
				);
				Inferno.render(template(false), container);

				expect(container.firstChild.tagName.toLowerCase()).to.eql("svg");
				expect(container.firstChild.namespaceURI).to.eql('http://www.w3.org/2000/svg');
				expect(container.firstChild.getAttribute("version")).to.eql('200');
				expect(
					container.innerHTML
				).to.equal(
					'<svg version="200"></svg>'
				);
			});
		});
	});

	it('should keep parent namespace ( dynamic)', () => {

		let child,
			template = Inferno.createTemplate((child) => ({
				tag: 'svg',
				attrs: {
					xmlns: 'http://www.w3.org/2000/svg'
				},
				children: child
			}));

		child = Inferno.createTemplate(() => ({
			tag: 'circle',
		}));

		Inferno.render(template(child()), container);
		expect(container.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		child = Inferno.createTemplate(() => ({
			tag: 'circle',
			attrs: {
				xmlns: 'http://www.w3.org/2000/svg'
			},
			children: {
				tag: 'circle',
				attrs: {
					xmlns: 'http://www.w3.org/2000/svg'
				}
			}
		}));

		Inferno.render(template(child()), container);
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		child = Inferno.createTemplate(() => ({
			tag: 'circle',
			children: {
				tag: 'circle',
				children: {
					tag: 'g',
					attrs: {
						xmlns: 'http://www.w3.org/2000/svg'
					}
				}
			}
		}));

		Inferno.render(template(child()), container);
		expect(container.firstChild.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		child = Inferno.createTemplate(() => ({
			tag: 'circle',
			children: {
				tag: 'circle',
				children: {
					tag: 'g',
					children: {
						tag: 'g'
					}
				}
			}
		}));

		Inferno.render(template(child()), container);
		expect(container.firstChild.firstChild.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		child = Inferno.createTemplate(() => ({
			tag: 'circle',
			children: {
				tag: 'circle',
				children: {
					tag: 'g',
					children: {
						tag: 'g',
						children: {
							tag: 'circle'
						}

					}
				}

			}
		}));

		Inferno.render(template(child()), container);
		expect(container.firstChild.firstChild.firstChild.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
	})

	it('should solve SVG edge when wrapped inside a non-namespace element ( static)', () => {

		let template = Inferno.createTemplate(() => ({
			tag: 'div',
			children:{
				tag: 'svg'

			}
		}));

		Inferno.render(template(), container);

		//expect(container.firstChild.firstChild.tagName).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

	})

	it('should solve SVG edge when wrapped inside a non-namespace element ( dynamic )', () => {

		let child = Inferno.createTemplate(() => ({
			tag: 'svg',
		}));

		let template = Inferno.createTemplate((child) => ({
			tag: 'div',
			children:child
		}));

		Inferno.render(template(child()), container);
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
	})

	it('should solve SVG edge case with XMLNS attribute when wrapped inside a non-namespace element ( static)', () => {

		let template = Inferno.createTemplate(() => ({
			tag: 'div',
			attrs: {
				xmlns: 'http://www.w3.org/2000/svg',
			},
			children:{
				tag: 'svg'

			}
		}));

		Inferno.render(template(), container);

		//expect(container.firstChild.firstChild.tagName).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

	})

	it('should solve SVG edge case with XMLNS attribute when wrapped inside a non-namespace element ( dynamic )', () => {

		let child = Inferno.createTemplate(() => ({
			tag: 'svg',
			attrs: {
				xmlns: 'http://www.w3.org/2000/svg',
			}
		}));

		let template = Inferno.createTemplate((child) => ({
			tag: 'div',
			children:child
		}));

		Inferno.render(template(child()), container);

		//expect(container.firstChild.firstChild.tagName).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
	})
	it('should diff from SVG namespace to mathML namespace ( dynamic )', () => {

		let child;

		let template = Inferno.createTemplate((child) => ({
			tag: 'div',
			children:child
		}));


		child = Inferno.createTemplate(() => ({
			tag: 'circle',
		}));
		Inferno.render(template(child()), container);

		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');

		child = Inferno.createTemplate(() => ({
			tag: 'math',
		}));
		Inferno.render(template(child()), container);

		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/1998/Math/MathML');

	})
	/*
	// xmlns as dynamic attr
	it('should solve SVG edge case with XMLNS attribute when wrapped inside a non-namespace element ( dynamic )', () => {

		let child = Inferno.createTemplate(() => ({
			tag: 'svg',
			attrs: {
				xmlns: 'http://www.w3.org/2000/svg',
			}
		}));

		let template = Inferno.createTemplate((ns, child) => ({
			tag: 'div',
			attrs: {
				xmlns: ns
			},
			children:child
		}));

		Inferno.render(template('http://www.w3.org/2000/svg', child()), container);

		//expect(container.firstChild.firstChild.tagName).to.equal('http://www.w3.org/2000/svg');
		expect(container.firstChild.firstChild.namespaceURI).to.equal('http://www.w3.org/2000/svg');
	})
	 */
});
