import isVoid from '../util/isVoid';
import isArray from '../util/isArray';
import inArray from '../util/inArray';
import isValidAttribute from '../util/isValidAttribute';
import DOMRegistry from './DOMRegistry';
import addPixelSuffixToValueIfNeeded from '../shared/addPixelSuffixToValueIfNeeded';
import camelCasePropsToDashCase from '../shared/camelCasePropsToDashCase';

const template = {
	/**
	 * Sets the value for a property on a node. If a value is specified as
	 * '' ( empty string ), the corresponding style property will be unset.
	 *
	 * @param {DOMElement} node
	 * @param {string} name
	 * @param {*} value
	 */
	setProperty( vNode, domNode, name, value, useProperties ) {
		const propertyInfo = DOMRegistry[name] || null;

		if ( propertyInfo ) {
			if ( isVoid( value ) ||
				propertyInfo.hasBooleanValue && !value ||
				propertyInfo.hasNumericValue && ( value !== value ) ||
				propertyInfo.hasPositiveNumericValue && value < 1 ||
				value.length === 0 ) {
				template.removeProperty( vNode, domNode, name, useProperties );
			} else {
				const propName = propertyInfo.propertyName;

				if ( propertyInfo.mustUseProperty ) {
					if ( propName === 'value' && ( ( !isVoid( vNode ) && vNode.tag === 'select' ) || ( domNode.tagName === 'SELECT' ) ) ) {
						template.setSelectValueForProperty( vNode, domNode, value, useProperties );
					} else {
						if ( useProperties ) {
							if ( '' + domNode[propName] !== '' + value ) {
								domNode[propName] = value;
							}
						} else {
							if ( propertyInfo.hasBooleanValue && (value === true || value === 'true' ) ) {
								value = propName;
							}
							domNode.setAttribute( propName, value );
						}
					}
				} else {
					const attributeName = propertyInfo.attributeName;
					const namespace = propertyInfo.attributeNamespace;

					if ( namespace ) {
						domNode.setAttributeNS( namespace, attributeName, value );
					} else {
						// if 'truthy' value, and boolean, it will be 'propName=propName'
						if ( propertyInfo.hasBooleanValue && value === true ) {
							value = attributeName;
						}
						domNode.setAttribute( attributeName, value );
					}
				}
			}
        // HTML attributes and custom attributes
		} else {
			if ( isValidAttribute ( name ) ) {
				if ( isVoid( value ) ) {
					domNode.removeAttribute( name );
				} else if ( name ) {
					domNode.setAttribute( name, value );
				}
			}
		}
	},

	/**
	 * Sets the value for multiple styles on a node.	If a value is specified as
	 * '' ( empty string ), the corresponding style property will be unset.
	 *
   * @param {vNode} virtual node
	 * @param {DOMElement} node
	 * @param {object} styles
	 */
	setCSS( vNode, domNode, styles ) {
		for ( let styleName in styles ) {
			let styleValue = styles[styleName];
			let dashed = camelCasePropsToDashCase( styleName );

			if ( !isVoid( styleValue ) ) {
				domNode.style[dashed] = addPixelSuffixToValueIfNeeded( styleName, styleValue );
			} else {
				domNode.style[dashed] = '';
			}
		}
	},

	/**
	 * Removes the value for a property on a node.
	 *
	 * @param {DOMElement} node
	 * @param {string} name
	 */
	removeProperty( vNode, domNode, name, useProperties ) {
		const propertyInfo = DOMRegistry[name];

		if ( propertyInfo ) {
			if ( propertyInfo.mustUseProperty ) {
				const propName = propertyInfo.propertyName;

				if ( name === 'value' && ( ( vNode !== null && vNode.tag === 'select' ) || ( domNode.tagName === 'SELECT' ) ) ) {
					template.removeSelectValueForProperty( vNode, domNode );
				} else if ( propertyInfo.hasBooleanValue ) {
					if ( useProperties ) {
						domNode[propName] = false;
					} else {
						domNode.removeAttribute( propName );
					}
				} else {
					if ( useProperties ) {
						if ( '' + domNode[propName] !== '' ) {
							domNode[propName] = '';
						}
					} else {
						domNode.removeAttribute( propName );
					}
				}
			} else {
				domNode.removeAttribute( propertyInfo.attributeName );
			}
		} else {
			// HTML attributes and custom attributes
			domNode.removeAttribute( name );
		}
	},

  /**
   * Set the value for a select / select multiple on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */
	setSelectValueForProperty( vNode, domNode, value, useProperties ) {
		const isMultiple = isArray( value );
		const options = domNode.options;
		const len = options.length;

		value = typeof value === 'number' ? '' + value : value;

		let i = 0, optionNode;

		while ( i < len ) {
			optionNode = options[i++];
			if ( useProperties ) {
				optionNode.selected = !isVoid( value ) &&
					( isMultiple ? inArray( value, optionNode.value ) : optionNode.value === value );
			} else {
				if ( !isVoid( value ) && ( isMultiple ? inArray( value, optionNode.value ) : optionNode.value === value ) ) {
					optionNode.setAttribute( 'selected', 'selected' );
				} else {
					optionNode.removeAttribute( 'selected' );
				}
			}
		}
	},
	removeSelectValueForProperty( vNode, domNode/* , propName */ ) {
		const options = domNode.options;
		const len = options.length;

		let i = 0;

		while ( i < len ) {
			options[i++].selected = false;
		}
	}
};

export default template;
