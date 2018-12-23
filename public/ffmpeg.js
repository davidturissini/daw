(function () {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var engine = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	const {
	  freeze,
	  seal,
	  keys,
	  create,
	  assign,
	  defineProperty,
	  getPrototypeOf,
	  setPrototypeOf,
	  getOwnPropertyDescriptor,
	  getOwnPropertyNames,
	  defineProperties,
	  getOwnPropertySymbols,
	  hasOwnProperty,
	  preventExtensions,
	  isExtensible
	} = Object;
	const {
	  isArray
	} = Array;
	const {
	  concat: ArrayConcat,
	  filter: ArrayFilter,
	  slice: ArraySlice,
	  splice: ArraySplice,
	  unshift: ArrayUnshift,
	  indexOf: ArrayIndexOf,
	  push: ArrayPush,
	  map: ArrayMap,
	  join: ArrayJoin,
	  forEach,
	  reduce: ArrayReduce,
	  reverse: ArrayReverse
	} = Array.prototype;
	const {
	  replace: StringReplace,
	  toLowerCase: StringToLowerCase,
	  indexOf: StringIndexOf,
	  charCodeAt: StringCharCodeAt,
	  slice: StringSlice,
	  split: StringSplit
	} = String.prototype;

	function isUndefined(obj) {
	  return obj === undefined;
	}

	function isNull(obj) {
	  return obj === null;
	}

	function isTrue(obj) {
	  return obj === true;
	}

	function isFalse(obj) {
	  return obj === false;
	}

	function isFunction(obj) {
	  return typeof obj === 'function';
	}

	function isObject(obj) {
	  return typeof obj === 'object';
	}

	function isString(obj) {
	  return typeof obj === 'string';
	}

	function isNumber(obj) {
	  return typeof obj === 'number';
	}

	const OtS = {}.toString;

	function toString(obj) {
	  if (obj && obj.toString) {
	    return obj.toString();
	  } else if (typeof obj === 'object') {
	    return OtS.call(obj);
	  } else {
	    return obj + '';
	  }
	}

	function getPropertyDescriptor(o, p) {
	  do {
	    const d = getOwnPropertyDescriptor(o, p);

	    if (!isUndefined(d)) {
	      return d;
	    }

	    o = getPrototypeOf(o);
	  } while (o !== null);
	}

	const emptyString = '';
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	const {
	  addEventListener,
	  removeEventListener,
	  hasAttribute,
	  getAttribute,
	  getAttributeNS,
	  setAttribute,
	  setAttributeNS,
	  removeAttribute,
	  removeAttributeNS,
	  querySelector,
	  querySelectorAll,
	  getBoundingClientRect,
	  getElementsByTagName,
	  getElementsByClassName,
	  getElementsByTagNameNS
	} = Element.prototype;
	const innerHTMLSetter = hasOwnProperty.call(Element.prototype, 'innerHTML') ? getOwnPropertyDescriptor(Element.prototype, 'innerHTML').set : getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHTML').set; // IE11

	const tagNameGetter = getOwnPropertyDescriptor(Element.prototype, 'tagName').get;
	const tabIndexGetter = getOwnPropertyDescriptor(HTMLElement.prototype, 'tabIndex').get;
	const matches = hasOwnProperty.call(Element.prototype, 'matches') ? Element.prototype.matches : Element.prototype.msMatchesSelector; // IE11

	const childrenGetter = hasOwnProperty.call(Element.prototype, 'innerHTML') ? getOwnPropertyDescriptor(Element.prototype, 'children').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'children').get; // IE11

	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	const {
	  DOCUMENT_POSITION_CONTAINED_BY,
	  DOCUMENT_POSITION_CONTAINS,
	  DOCUMENT_POSITION_PRECEDING,
	  DOCUMENT_POSITION_FOLLOWING,
	  DOCUMENT_FRAGMENT_NODE
	} = Node;
	const {
	  insertBefore,
	  removeChild,
	  appendChild,
	  hasChildNodes,
	  replaceChild,
	  compareDocumentPosition,
	  cloneNode
	} = Node.prototype;
	const parentNodeGetter = getOwnPropertyDescriptor(Node.prototype, 'parentNode').get;
	const parentElementGetter = hasOwnProperty.call(Node.prototype, 'parentElement') ? getOwnPropertyDescriptor(Node.prototype, 'parentElement').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'parentElement').get; // IE11

	const textContextSetter = getOwnPropertyDescriptor(Node.prototype, 'textContent').set;
	const childNodesGetter = hasOwnProperty.call(Node.prototype, 'childNodes') ? getOwnPropertyDescriptor(Node.prototype, 'childNodes').get : getOwnPropertyDescriptor(HTMLElement.prototype, 'childNodes').get; // IE11

	const nodeValueDescriptor = getOwnPropertyDescriptor(Node.prototype, 'nodeValue');
	const nodeValueSetter = nodeValueDescriptor.set;
	const nodeValueGetter = nodeValueDescriptor.get;
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	const ShadowRootHostGetter = typeof window.ShadowRoot !== "undefined" ? getOwnPropertyDescriptor(window.ShadowRoot.prototype, 'host').get : () => {
	  throw new Error('Internal Error: Missing ShadowRoot');
	};
	const ShadowRootInnerHTMLSetter = typeof window.ShadowRoot !== "undefined" ? getOwnPropertyDescriptor(window.ShadowRoot.prototype, 'innerHTML').set : () => {
	  throw new Error('Internal Error: Missing ShadowRoot');
	};
	const dispatchEvent = 'EventTarget' in window ? EventTarget.prototype.dispatchEvent : Node.prototype.dispatchEvent; // IE11

	const isNativeShadowRootAvailable = typeof window.ShadowRoot !== "undefined";
	const iFrameContentWindowGetter = getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'contentWindow').get;
	const eventTargetGetter = getOwnPropertyDescriptor(Event.prototype, 'target').get;
	const eventCurrentTargetGetter = getOwnPropertyDescriptor(Event.prototype, 'currentTarget').get;
	const focusEventRelatedTargetGetter = getOwnPropertyDescriptor(FocusEvent.prototype, 'relatedTarget').get;
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	const StringSplit$1 = String.prototype.split;

	function isLWC(element) {
	  return element instanceof Element && tagNameGetter.call(element).indexOf('-') !== -1;
	}

	function isShadowRoot(elmOrShadow) {
	  return !(elmOrShadow instanceof Element) && 'host' in elmOrShadow;
	}

	function getFormattedComponentStack(elm) {
	  const componentStack = [];
	  const indentationChar = '\t';
	  let indentation = '';
	  let currentElement = elm;

	  do {
	    if (isLWC(currentElement)) {
	      ArrayPush.call(componentStack, `${indentation}<${StringToLowerCase.call(tagNameGetter.call(currentElement))}>`);
	      indentation = indentation + indentationChar;
	    }

	    if (isShadowRoot(currentElement)) {
	      // if at some point we find a ShadowRoot, it must be a native shadow root.
	      currentElement = ShadowRootHostGetter.call(currentElement);
	    } else {
	      currentElement = parentNodeGetter.call(currentElement);
	    }
	  } while (!isNull(currentElement));

	  return ArrayJoin.call(componentStack, '\n');
	}

	const assert = {
	  invariant(value, msg) {
	    if (!value) {
	      throw new Error(`Invariant Violation: ${msg}`);
	    }
	  },

	  isTrue(value, msg) {
	    if (!value) {
	      throw new Error(`Assert Violation: ${msg}`);
	    }
	  },

	  isFalse(value, msg) {
	    if (value) {
	      throw new Error(`Assert Violation: ${msg}`);
	    }
	  },

	  fail(msg) {
	    throw new Error(msg);
	  },

	  logError(message, elm) {
	    let msg = `[LWC error]: ${message}`;

	    if (elm) {
	      msg = `${msg}\n${getFormattedComponentStack(elm)}`;
	    }

	    if (process.env.NODE_ENV === 'test') {
	      console.error(msg); // tslint:disable-line

	      return;
	    }

	    try {
	      throw new Error(msg);
	    } catch (e) {
	      console.error(e); // tslint:disable-line
	    }
	  },

	  logWarning(message, elm) {
	    let msg = `[LWC warning]: ${message}`;

	    if (elm) {
	      msg = `${msg}\n${getFormattedComponentStack(elm)}`;
	    }

	    if (process.env.NODE_ENV === 'test') {
	      console.warn(msg); // tslint:disable-line

	      return;
	    }

	    try {
	      throw new Error('error to get stacktrace');
	    } catch (e) {
	      // first line is the dummy message and second this function (which does not need to be there)
	      const stackTraceLines = StringSplit$1.call(e.stack, '\n').splice(2);
	      console.group(msg); // tslint:disable-line

	      forEach.call(stackTraceLines, trace => {
	        // We need to format this as a string,
	        // because Safari will detect that the string
	        // is a stack trace line item and will format it as so
	        console.log('%s', trace.trim()); // tslint:disable-line
	      });
	      console.groupEnd(); // tslint:disable-line
	    }
	  }

	};
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	/**
	 * In IE11, symbols are expensive.
	 * Due to the nature of the symbol polyfill. This method abstract the
	 * creation of symbols, so we can fallback to string when native symbols
	 * are not supported. Note that we can't use typeof since it will fail when tranpiling.
	 */

	const hasNativeSymbolsSupport = Symbol('x').toString() === 'Symbol(x)';

	function createFieldName(key) {
	  // @ts-ignore: using a string as a symbol for perf reasons
	  return hasNativeSymbolsSupport ? Symbol(key) : `$$lwc-${key}$$`;
	}

	function setInternalField(o, fieldName, value) {
	  // TODO: improve this to use  or a WeakMap
	  defineProperty(o, fieldName, {
	    value
	  });
	}

	function getInternalField(o, fieldName) {
	  return o[fieldName];
	}
	/**
	 * Store fields that should be hidden from outside world
	 * hiddenFieldsMap is a WeakMap.
	 * It stores a hash of any given objects associative relationships.
	 * The hash uses the fieldName as the key, the value represents the other end of the association.
	 *
	 * For example, if the association is
	 *              ViewModel
	 * Component-A --------------> VM-1
	 * then,
	 * hiddenFieldsMap : (Component-A, { Symbol(ViewModel) : VM-1 })
	 *
	 */


	const hiddenFieldsMap = new WeakMap();
	const setHiddenField = hasNativeSymbolsSupport ? (o, fieldName, value) => {
	  let valuesByField = hiddenFieldsMap.get(o);

	  if (isUndefined(valuesByField)) {
	    valuesByField = create(null);
	    hiddenFieldsMap.set(o, valuesByField);
	  }

	  valuesByField[fieldName] = value;
	} : setInternalField; // Fall back to symbol based approach in compat mode

	const getHiddenField = hasNativeSymbolsSupport ? (o, fieldName) => {
	  const valuesByField = hiddenFieldsMap.get(o);
	  return !isUndefined(valuesByField) && valuesByField[fieldName];
	} : getInternalField; // Fall back to symbol based approach in compat mode

	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	function detect(propName) {
	  return Object.getOwnPropertyDescriptor(Element.prototype, propName) === undefined;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// this regular expression is used to transform aria props into aria attributes because
	// that doesn't follow the regular transformation process. e.g.: `aria-labeledby` <=> `ariaLabelBy`


	const ARIA_REGEX = /^aria/;
	const nodeToAriaPropertyValuesMap = new WeakMap();
	const {
	  hasOwnProperty: hasOwnProperty$1
	} = Object.prototype;
	const {
	  replace: StringReplace$1,
	  toLowerCase: StringToLowerCase$1
	} = String.prototype;

	function getAriaPropertyMap(elm) {
	  let map = nodeToAriaPropertyValuesMap.get(elm);

	  if (map === undefined) {
	    map = {
	      host: {},
	      sr: {}
	    };
	    nodeToAriaPropertyValuesMap.set(elm, map);
	  }

	  return map;
	}

	function getNormalizedAriaPropertyValue(propName, value) {
	  return value == null ? null : value + '';
	}

	function createAriaPropertyPropertyDescriptor(propName, attrName) {
	  return {
	    get() {
	      const map = getAriaPropertyMap(this);

	      if (hasOwnProperty$1.call(map, propName)) {
	        return map[propName];
	      } // otherwise just reflect what's in the attribute


	      return hasAttribute.call(this, attrName) ? getAttribute.call(this, attrName) : null;
	    },

	    set(newValue) {
	      newValue = getNormalizedAriaPropertyValue(propName, newValue);
	      const map = getAriaPropertyMap(this);
	      map[propName] = newValue; // reflect into the corresponding attribute

	      if (newValue === null) {
	        removeAttribute.call(this, attrName);
	      } else {
	        setAttribute.call(this, attrName, newValue);
	      }
	    },

	    configurable: true,
	    enumerable: true
	  };
	}

	function patch(propName) {
	  const attrName = StringToLowerCase$1.call(StringReplace$1.call(propName, ARIA_REGEX, 'aria-'));
	  const descriptor = createAriaPropertyPropertyDescriptor(propName, attrName);
	  Object.defineProperty(Element.prototype, propName, descriptor);
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// Global Aria and Role Properties derived from ARIA and Role Attributes.
	// https://wicg.github.io/aom/spec/aria-reflection.html


	const ElementPrototypeAriaPropertyNames = ['ariaAutoComplete', 'ariaChecked', 'ariaCurrent', 'ariaDisabled', 'ariaExpanded', 'ariaHasPopUp', 'ariaHidden', 'ariaInvalid', 'ariaLabel', 'ariaLevel', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaPressed', 'ariaReadOnly', 'ariaRequired', 'ariaSelected', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'ariaLive', 'ariaRelevant', 'ariaAtomic', 'ariaBusy', 'ariaActiveDescendant', 'ariaControls', 'ariaDescribedBy', 'ariaFlowTo', 'ariaLabelledBy', 'ariaOwns', 'ariaPosInSet', 'ariaSetSize', 'ariaColCount', 'ariaColIndex', 'ariaDetails', 'ariaErrorMessage', 'ariaKeyShortcuts', 'ariaModal', 'ariaPlaceholder', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'role'];

	for (let i = 0, len = ElementPrototypeAriaPropertyNames.length; i < len; i += 1) {
	  const propName = ElementPrototypeAriaPropertyNames[i];

	  if (detect(propName)) {
	    patch(propName);
	  }
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// These properties get added to LWCElement.prototype publicProps automatically


	const defaultDefHTMLPropertyNames = ['dir', 'id', 'accessKey', 'title', 'lang', 'hidden', 'draggable', 'tabIndex']; // Few more exceptions that are using the attribute name to match the property in lowercase.
	// this list was compiled from https://msdn.microsoft.com/en-us/library/ms533062(v=vs.85).aspx
	// and https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
	// Note: this list most be in sync with the compiler as well.

	const HTMLPropertyNamesWithLowercasedReflectiveAttributes = ['accessKey', 'readOnly', 'tabIndex', 'bgColor', 'colSpan', 'rowSpan', 'contentEditable', 'dateTime', 'formAction', 'isMap', 'maxLength', 'useMap'];
	const OffsetPropertiesError = 'This property will round the value to an integer, and it is considered an anti-pattern. Instead, you can use \`this.getBoundingClientRect()\` to obtain `left`, `top`, `right`, `bottom`, `x`, `y`, `width`, and `height` fractional values describing the overall border-box in pixels.'; // Global HTML Attributes & Properties
	// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
	// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement

	function getGlobalHTMLPropertiesInfo() {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  }

	  return {
	    id: {
	      attribute: 'id',
	      reflective: true
	    },
	    accessKey: {
	      attribute: 'accesskey',
	      reflective: true
	    },
	    accessKeyLabel: {
	      readOnly: true
	    },
	    className: {
	      attribute: 'class',
	      error: `Using property "className" is an anti-pattern because of slow runtime behavior and conflicting with classes provided by the owner element. Instead use property "classList".`
	    },
	    contentEditable: {
	      attribute: 'contenteditable',
	      reflective: true
	    },
	    isContentEditable: {
	      readOnly: true
	    },
	    contextMenu: {
	      attribute: 'contextmenu'
	    },
	    dataset: {
	      readOnly: true,
	      error: 'Using property "dataset" is an anti-pattern. Components should not rely on dataset to implement its internal logic, nor use that as a communication channel.'
	    },
	    dir: {
	      attribute: 'dir',
	      reflective: true
	    },
	    draggable: {
	      attribute: 'draggable',
	      experimental: true,
	      reflective: true
	    },
	    dropzone: {
	      attribute: 'dropzone',
	      readOnly: true,
	      experimental: true
	    },
	    hidden: {
	      attribute: 'hidden',
	      reflective: true
	    },
	    itemScope: {
	      attribute: 'itemscope',
	      experimental: true
	    },
	    itemType: {
	      attribute: 'itemtype',
	      readOnly: true,
	      experimental: true
	    },
	    itemId: {
	      attribute: 'itemid',
	      experimental: true
	    },
	    itemRef: {
	      attribute: 'itemref',
	      readOnly: true,
	      experimental: true
	    },
	    itemProp: {
	      attribute: 'itemprop',
	      readOnly: true,
	      experimental: true
	    },
	    itemValue: {
	      experimental: true
	    },
	    lang: {
	      attribute: 'lang',
	      reflective: true
	    },
	    offsetHeight: {
	      readOnly: true,
	      error: OffsetPropertiesError
	    },
	    offsetLeft: {
	      readOnly: true,
	      error: OffsetPropertiesError
	    },
	    offsetParent: {
	      readOnly: true
	    },
	    offsetTop: {
	      readOnly: true,
	      error: OffsetPropertiesError
	    },
	    offsetWidth: {
	      readOnly: true,
	      error: OffsetPropertiesError
	    },
	    properties: {
	      readOnly: true,
	      experimental: true
	    },
	    spellcheck: {
	      experimental: true,
	      reflective: true
	    },
	    style: {
	      attribute: 'style',
	      error: `Using property or attribute "style" is an anti-pattern. Instead use property "classList".`
	    },
	    tabIndex: {
	      attribute: 'tabindex',
	      reflective: true
	    },
	    title: {
	      attribute: 'title',
	      reflective: true
	    },
	    translate: {
	      experimental: true
	    },
	    // additional global attributes that are not present in the link above.
	    role: {
	      attribute: 'role'
	    },
	    slot: {
	      attribute: 'slot',
	      experimental: true,
	      error: `Using property or attribute "slot" is an anti-pattern.`
	    }
	  };
	} // TODO: complete this list with Element properties
	// https://developer.mozilla.org/en-US/docs/Web/API/Element
	// TODO: complete this list with Node properties
	// https://developer.mozilla.org/en-US/docs/Web/API/Node


	const AttrNameToPropNameMap = create(null);
	const PropNameToAttrNameMap = create(null); // Synthetic creation of all AOM property descriptors for Custom Elements

	forEach.call(ElementPrototypeAriaPropertyNames, propName => {
	  const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, 'aria-'));
	  AttrNameToPropNameMap[attrName] = propName;
	  PropNameToAttrNameMap[propName] = attrName;
	});
	forEach.call(defaultDefHTMLPropertyNames, propName => {
	  const attrName = StringToLowerCase.call(propName);
	  AttrNameToPropNameMap[attrName] = propName;
	  PropNameToAttrNameMap[propName] = attrName;
	});
	forEach.call(HTMLPropertyNamesWithLowercasedReflectiveAttributes, propName => {
	  const attrName = StringToLowerCase.call(propName);
	  AttrNameToPropNameMap[attrName] = propName;
	  PropNameToAttrNameMap[propName] = attrName;
	});
	const CAMEL_REGEX = /-([a-z])/g;
	/**
	 * This method maps between attribute names
	 * and the corresponding property name.
	 */

	function getPropNameFromAttrName(attrName) {
	  if (isUndefined(AttrNameToPropNameMap[attrName])) {
	    AttrNameToPropNameMap[attrName] = StringReplace.call(attrName, CAMEL_REGEX, g => g[1].toUpperCase());
	  }

	  return AttrNameToPropNameMap[attrName];
	}

	const CAPS_REGEX = /[A-Z]/g;
	/**
	 * This method maps between property names
	 * and the corresponding attribute name.
	 */

	function getAttrNameFromPropName(propName) {
	  if (isUndefined(PropNameToAttrNameMap[propName])) {
	    PropNameToAttrNameMap[propName] = StringReplace.call(propName, CAPS_REGEX, match => '-' + match.toLowerCase());
	  }

	  return PropNameToAttrNameMap[propName];
	}

	let controlledElement = null;
	let controlledAttributeName;

	function isAttributeLocked(elm, attrName) {
	  return elm !== controlledElement || attrName !== controlledAttributeName;
	}

	function lockAttribute(elm, key) {
	  controlledElement = null;
	  controlledAttributeName = undefined;
	}

	function unlockAttribute(elm, key) {
	  controlledElement = elm;
	  controlledAttributeName = key;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	let nextTickCallbackQueue = [];
	const SPACE_CHAR = 32;
	const EmptyObject = seal(create(null));
	const EmptyArray = seal([]);
	const ViewModelReflection = createFieldName('ViewModel');

	function flushCallbackQueue() {
	  if (process.env.NODE_ENV !== 'production') {
	    if (nextTickCallbackQueue.length === 0) {
	      throw new Error(`Internal Error: If callbackQueue is scheduled, it is because there must be at least one callback on this pending queue.`);
	    }
	  }

	  const callbacks = nextTickCallbackQueue;
	  nextTickCallbackQueue = []; // reset to a new queue

	  for (let i = 0, len = callbacks.length; i < len; i += 1) {
	    callbacks[i]();
	  }
	}

	function addCallbackToNextTick(callback) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (!isFunction(callback)) {
	      throw new Error(`Internal Error: addCallbackToNextTick() can only accept a function callback`);
	    }
	  }

	  if (nextTickCallbackQueue.length === 0) {
	    Promise.resolve().then(flushCallbackQueue);
	  } // TODO: eventually, we might want to have priority when inserting callbacks


	  ArrayPush.call(nextTickCallbackQueue, callback);
	}

	function isCircularModuleDependency(value) {
	  return hasOwnProperty.call(value, '__circular__');
	}
	/**
	 * When LWC is used in the context of an Aura application, the compiler produces AMD
	 * modules, that doesn't resolve properly circular dependencies between modules. In order
	 * to circumvent this issue, the module loader returns a factory with a symbol attached
	 * to it.
	 *
	 * This method returns the resolved value if it received a factory as argument. Otherwise
	 * it returns the original value.
	 */


	function resolveCircularModuleDependency(fn) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (!isFunction(fn)) {
	      throw new ReferenceError(`Circular module dependency must be a function.`);
	    }
	  }

	  return fn();
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function handleEvent(event, vnode) {
	  const {
	    type
	  } = event;
	  const {
	    data: {
	      on
	    }
	  } = vnode;
	  const handler = on && on[type]; // call event handler if exists

	  if (handler) {
	    handler.call(undefined, event);
	  }
	}

	function createListener() {
	  return function handler(event) {
	    handleEvent(event, handler.vnode);
	  };
	}

	function updateAllEventListeners(oldVnode, vnode) {
	  if (isUndefined(oldVnode.listener)) {
	    createAllEventListeners(vnode);
	  } else {
	    vnode.listener = oldVnode.listener;
	    vnode.listener.vnode = vnode;
	  }
	}

	function createAllEventListeners(vnode) {
	  const {
	    data: {
	      on
	    }
	  } = vnode;

	  if (isUndefined(on)) {
	    return;
	  }

	  const elm = vnode.elm;
	  const listener = vnode.listener = createListener();
	  listener.vnode = vnode;
	  let name;

	  for (name in on) {
	    elm.addEventListener(name, listener);
	  }
	}

	var modEvents = {
	  update: updateAllEventListeners,
	  create: createAllEventListeners
	};
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	const xlinkNS = 'http://www.w3.org/1999/xlink';
	const xmlNS = 'http://www.w3.org/XML/1998/namespace';
	const ColonCharCode = 58;

	function updateAttrs(oldVnode, vnode) {
	  const {
	    data: {
	      attrs
	    }
	  } = vnode;

	  if (isUndefined(attrs)) {
	    return;
	  }

	  let {
	    data: {
	      attrs: oldAttrs
	    }
	  } = oldVnode;

	  if (oldAttrs === attrs) {
	    return;
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(isUndefined(oldAttrs) || keys(oldAttrs).join(',') === keys(attrs).join(','), `vnode.data.attrs cannot change shape.`);
	  }

	  const elm = vnode.elm;
	  let key;
	  oldAttrs = isUndefined(oldAttrs) ? EmptyObject : oldAttrs; // update modified attributes, add new attributes
	  // this routine is only useful for data-* attributes in all kind of elements
	  // and aria-* in standard elements (custom elements will use props for these)

	  for (key in attrs) {
	    const cur = attrs[key];
	    const old = oldAttrs[key];

	    if (old !== cur) {
	      unlockAttribute(elm, key);

	      if (StringCharCodeAt.call(key, 3) === ColonCharCode) {
	        // Assume xml namespace
	        elm.setAttributeNS(xmlNS, key, cur);
	      } else if (StringCharCodeAt.call(key, 5) === ColonCharCode) {
	        // Assume xlink namespace
	        elm.setAttributeNS(xlinkNS, key, cur);
	      } else if (isNull(cur)) {
	        elm.removeAttribute(key);
	      } else {
	        elm.setAttribute(key, cur);
	      }

	      lockAttribute(elm, key);
	    }
	  }
	}

	const emptyVNode = {
	  data: {}
	};
	var modAttrs = {
	  create: vnode => updateAttrs(emptyVNode, vnode),
	  update: updateAttrs
	};
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	const TargetToReactiveRecordMap = new WeakMap();

	function notifyMutation(target, key) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(!isRendering, `Mutating property ${toString(key)} of ${toString(target)} is not allowed during the rendering life-cycle of ${vmBeingRendered}.`);
	  }

	  const reactiveRecord = TargetToReactiveRecordMap.get(target);

	  if (!isUndefined(reactiveRecord)) {
	    const value = reactiveRecord[key];

	    if (value) {
	      const len = value.length;

	      for (let i = 0; i < len; i += 1) {
	        const vm = value[i];

	        if (process.env.NODE_ENV !== 'production') {
	          assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	        }

	        if (!vm.isDirty) {
	          markComponentAsDirty(vm);
	          scheduleRehydration(vm);
	        }
	      }
	    }
	  }
	}

	function observeMutation(target, key) {
	  if (isNull(vmBeingRendered)) {
	    return; // nothing to subscribe to
	  }

	  const vm = vmBeingRendered;
	  let reactiveRecord = TargetToReactiveRecordMap.get(target);

	  if (isUndefined(reactiveRecord)) {
	    const newRecord = create(null);
	    reactiveRecord = newRecord;
	    TargetToReactiveRecordMap.set(target, newRecord);
	  }

	  let value = reactiveRecord[key];

	  if (isUndefined(value)) {
	    value = [];
	    reactiveRecord[key] = value;
	  } else if (value[0] === vm) {
	    return; // perf optimization considering that most subscriptions will come from the same vm
	  }

	  if (ArrayIndexOf.call(value, vm) === -1) {
	    ArrayPush.call(value, vm); // we keep track of the sets that vm is listening from to be able to do some clean up later on

	    ArrayPush.call(vm.deps, value);
	  }
	}
	/**
	 * Copyright (C) 2017 salesforce.com, inc.
	 */


	const {
	  isArray: isArray$1
	} = Array;
	const {
	  getPrototypeOf: getPrototypeOf$1,
	  create: ObjectCreate,
	  defineProperty: ObjectDefineProperty,
	  defineProperties: ObjectDefineProperties,
	  isExtensible: isExtensible$1,
	  getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
	  getOwnPropertyNames: getOwnPropertyNames$1,
	  getOwnPropertySymbols: getOwnPropertySymbols$1,
	  preventExtensions: preventExtensions$1
	} = Object;
	const {
	  push: ArrayPush$1,
	  concat: ArrayConcat$1,
	  map: ArrayMap$1
	} = Array.prototype;
	const ObjectDotPrototype = Object.prototype;
	const OtS$1 = {}.toString;

	function toString$1(obj) {
	  if (obj && obj.toString) {
	    return obj.toString();
	  } else if (typeof obj === 'object') {
	    return OtS$1.call(obj);
	  } else {
	    return obj + '';
	  }
	}

	function isUndefined$1(obj) {
	  return obj === undefined;
	}

	const TargetSlot = Symbol(); // TODO: we are using a funky and leaky abstraction here to try to identify if
	// the proxy is a compat proxy, and define the unwrap method accordingly.
	// @ts-ignore

	const {
	  getKey
	} = Proxy;
	const unwrap = getKey ? replicaOrAny => replicaOrAny && getKey(replicaOrAny, TargetSlot) || replicaOrAny : replicaOrAny => replicaOrAny && replicaOrAny[TargetSlot] || replicaOrAny;

	function isObservable(value) {
	  // intentionally checking for null and undefined
	  if (value == null) {
	    return false;
	  }

	  if (isArray$1(value)) {
	    return true;
	  }

	  const proto = getPrototypeOf$1(value);
	  return proto === ObjectDotPrototype || proto === null || getPrototypeOf$1(proto) === null;
	}

	function isObject$1(obj) {
	  return typeof obj === 'object';
	} // Unwrap property descriptors
	// We only need to unwrap if value is specified


	function unwrapDescriptor(descriptor) {
	  if ('value' in descriptor) {
	    descriptor.value = unwrap(descriptor.value);
	  }

	  return descriptor;
	}

	function wrapDescriptor(membrane, descriptor) {
	  if ('value' in descriptor) {
	    descriptor.value = isObservable(descriptor.value) ? membrane.getProxy(descriptor.value) : descriptor.value;
	  }

	  return descriptor;
	}

	function lockShadowTarget(membrane, shadowTarget, originalTarget) {
	  const targetKeys = ArrayConcat$1.call(getOwnPropertyNames$1(originalTarget), getOwnPropertySymbols$1(originalTarget));
	  targetKeys.forEach(key => {
	    let descriptor = getOwnPropertyDescriptor$1(originalTarget, key); // We do not need to wrap the descriptor if not configurable
	    // Because we can deal with wrapping it when user goes through
	    // Get own property descriptor. There is also a chance that this descriptor
	    // could change sometime in the future, so we can defer wrapping
	    // until we need to

	    if (!descriptor.configurable) {
	      descriptor = wrapDescriptor(membrane, descriptor);
	    }

	    ObjectDefineProperty(shadowTarget, key, descriptor);
	  });
	  preventExtensions$1(shadowTarget);
	}

	class ReactiveProxyHandler {
	  constructor(membrane, value, options) {
	    this.originalTarget = value;
	    this.membrane = membrane;

	    if (!isUndefined$1(options)) {
	      this.valueMutated = options.valueMutated;
	      this.valueObserved = options.valueObserved;
	    }
	  }

	  get(shadowTarget, key) {
	    const {
	      originalTarget,
	      membrane
	    } = this;

	    if (key === TargetSlot) {
	      return originalTarget;
	    }

	    const value = originalTarget[key];
	    const {
	      valueObserved
	    } = this;

	    if (!isUndefined$1(valueObserved)) {
	      valueObserved(originalTarget, key);
	    }

	    return membrane.getProxy(value);
	  }

	  set(shadowTarget, key, value) {
	    const {
	      originalTarget,
	      valueMutated
	    } = this;
	    const oldValue = originalTarget[key];

	    if (oldValue !== value) {
	      originalTarget[key] = value;

	      if (!isUndefined$1(valueMutated)) {
	        valueMutated(originalTarget, key);
	      }
	    } else if (key === 'length' && isArray$1(originalTarget)) {
	      // fix for issue #236: push will add the new index, and by the time length
	      // is updated, the internal length is already equal to the new length value
	      // therefore, the oldValue is equal to the value. This is the forking logic
	      // to support this use case.
	      if (!isUndefined$1(valueMutated)) {
	        valueMutated(originalTarget, key);
	      }
	    }

	    return true;
	  }

	  deleteProperty(shadowTarget, key) {
	    const {
	      originalTarget,
	      valueMutated
	    } = this;
	    delete originalTarget[key];

	    if (!isUndefined$1(valueMutated)) {
	      valueMutated(originalTarget, key);
	    }

	    return true;
	  }

	  apply(shadowTarget, thisArg, argArray) {
	    /* No op */
	  }

	  construct(target, argArray, newTarget) {
	    /* No op */
	  }

	  has(shadowTarget, key) {
	    const {
	      originalTarget,
	      valueObserved
	    } = this;

	    if (!isUndefined$1(valueObserved)) {
	      valueObserved(originalTarget, key);
	    }

	    return key in originalTarget;
	  }

	  ownKeys(shadowTarget) {
	    const {
	      originalTarget
	    } = this;
	    return ArrayConcat$1.call(getOwnPropertyNames$1(originalTarget), getOwnPropertySymbols$1(originalTarget));
	  }

	  isExtensible(shadowTarget) {
	    const shadowIsExtensible = isExtensible$1(shadowTarget);

	    if (!shadowIsExtensible) {
	      return shadowIsExtensible;
	    }

	    const {
	      originalTarget,
	      membrane
	    } = this;
	    const targetIsExtensible = isExtensible$1(originalTarget);

	    if (!targetIsExtensible) {
	      lockShadowTarget(membrane, shadowTarget, originalTarget);
	    }

	    return targetIsExtensible;
	  }

	  setPrototypeOf(shadowTarget, prototype) {
	    if (process.env.NODE_ENV !== 'production') {
	      throw new Error(`Invalid setPrototypeOf invocation for reactive proxy ${toString$1(this.originalTarget)}. Prototype of reactive objects cannot be changed.`);
	    }
	  }

	  getPrototypeOf(shadowTarget) {
	    const {
	      originalTarget
	    } = this;
	    return getPrototypeOf$1(originalTarget);
	  }

	  getOwnPropertyDescriptor(shadowTarget, key) {
	    const {
	      originalTarget,
	      membrane,
	      valueObserved
	    } = this; // keys looked up via hasOwnProperty need to be reactive

	    if (!isUndefined$1(valueObserved)) {
	      valueObserved(originalTarget, key);
	    }

	    let desc = getOwnPropertyDescriptor$1(originalTarget, key);

	    if (isUndefined$1(desc)) {
	      return desc;
	    }

	    const shadowDescriptor = getOwnPropertyDescriptor$1(shadowTarget, key);

	    if (!desc.configurable && !shadowDescriptor) {
	      // If descriptor from original target is not configurable,
	      // We must copy the wrapped descriptor over to the shadow target.
	      // Otherwise, proxy will throw an invariant error.
	      // This is our last chance to lock the value.
	      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
	      desc = wrapDescriptor(membrane, desc);
	      ObjectDefineProperty(shadowTarget, key, desc);
	    }

	    return shadowDescriptor || desc;
	  }

	  preventExtensions(shadowTarget) {
	    const {
	      originalTarget,
	      membrane
	    } = this;
	    lockShadowTarget(membrane, shadowTarget, originalTarget);
	    preventExtensions$1(originalTarget);
	    return true;
	  }

	  defineProperty(shadowTarget, key, descriptor) {
	    const {
	      originalTarget,
	      membrane,
	      valueMutated
	    } = this;
	    const {
	      configurable
	    } = descriptor; // We have to check for value in descriptor
	    // because Object.freeze(proxy) calls this method
	    // with only { configurable: false, writeable: false }
	    // Additionally, method will only be called with writeable:false
	    // if the descriptor has a value, as opposed to getter/setter
	    // So we can just check if writable is present and then see if
	    // value is present. This eliminates getter and setter descriptors

	    if ('writable' in descriptor && !('value' in descriptor)) {
	      const originalDescriptor = getOwnPropertyDescriptor$1(originalTarget, key);
	      descriptor.value = originalDescriptor.value;
	    }

	    ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));

	    if (configurable === false) {
	      ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor));
	    }

	    if (!isUndefined$1(valueMutated)) {
	      valueMutated(originalTarget, key);
	    }

	    return true;
	  }

	}

	function wrapDescriptor$1(membrane, descriptor) {
	  if ('value' in descriptor) {
	    descriptor.value = isObservable(descriptor.value) ? membrane.getReadOnlyProxy(descriptor.value) : descriptor.value;
	  }

	  return descriptor;
	}

	class ReadOnlyHandler {
	  constructor(membrane, value, options) {
	    this.originalTarget = value;
	    this.membrane = membrane;

	    if (!isUndefined$1(options)) {
	      this.valueObserved = options.valueObserved;
	    }
	  }

	  get(shadowTarget, key) {
	    const {
	      membrane,
	      originalTarget
	    } = this;

	    if (key === TargetSlot) {
	      return originalTarget;
	    }

	    const value = originalTarget[key];
	    const {
	      valueObserved
	    } = this;

	    if (!isUndefined$1(valueObserved)) {
	      valueObserved(originalTarget, key);
	    }

	    return membrane.getReadOnlyProxy(value);
	  }

	  set(shadowTarget, key, value) {
	    if (process.env.NODE_ENV !== 'production') {
	      const {
	        originalTarget
	      } = this;
	      throw new Error(`Invalid mutation: Cannot set "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
	    }

	    return false;
	  }

	  deleteProperty(shadowTarget, key) {
	    if (process.env.NODE_ENV !== 'production') {
	      const {
	        originalTarget
	      } = this;
	      throw new Error(`Invalid mutation: Cannot delete "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
	    }

	    return false;
	  }

	  apply(shadowTarget, thisArg, argArray) {
	    /* No op */
	  }

	  construct(target, argArray, newTarget) {
	    /* No op */
	  }

	  has(shadowTarget, key) {
	    const {
	      originalTarget
	    } = this;
	    const {
	      valueObserved
	    } = this;

	    if (!isUndefined$1(valueObserved)) {
	      valueObserved(originalTarget, key);
	    }

	    return key in originalTarget;
	  }

	  ownKeys(shadowTarget) {
	    const {
	      originalTarget
	    } = this;
	    return ArrayConcat$1.call(getOwnPropertyNames$1(originalTarget), getOwnPropertySymbols$1(originalTarget));
	  }

	  setPrototypeOf(shadowTarget, prototype) {
	    if (process.env.NODE_ENV !== 'production') {
	      const {
	        originalTarget
	      } = this;
	      throw new Error(`Invalid prototype mutation: Cannot set prototype on "${originalTarget}". "${originalTarget}" prototype is read-only.`);
	    }
	  }

	  getOwnPropertyDescriptor(shadowTarget, key) {
	    const {
	      originalTarget,
	      membrane,
	      valueObserved
	    } = this; // keys looked up via hasOwnProperty need to be reactive

	    if (!isUndefined$1(valueObserved)) {
	      valueObserved(originalTarget, key);
	    }

	    let desc = getOwnPropertyDescriptor$1(originalTarget, key);

	    if (isUndefined$1(desc)) {
	      return desc;
	    }

	    const shadowDescriptor = getOwnPropertyDescriptor$1(shadowTarget, key);

	    if (!desc.configurable && !shadowDescriptor) {
	      // If descriptor from original target is not configurable,
	      // We must copy the wrapped descriptor over to the shadow target.
	      // Otherwise, proxy will throw an invariant error.
	      // This is our last chance to lock the value.
	      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
	      desc = wrapDescriptor$1(membrane, desc);
	      ObjectDefineProperty(shadowTarget, key, desc);
	    }

	    return shadowDescriptor || desc;
	  }

	  preventExtensions(shadowTarget) {
	    if (process.env.NODE_ENV !== 'production') {
	      const {
	        originalTarget
	      } = this;
	      throw new Error(`Invalid mutation: Cannot preventExtensions on ${originalTarget}". "${originalTarget} is read-only.`);
	    }

	    return false;
	  }

	  defineProperty(shadowTarget, key, descriptor) {
	    if (process.env.NODE_ENV !== 'production') {
	      const {
	        originalTarget
	      } = this;
	      throw new Error(`Invalid mutation: Cannot defineProperty "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
	    }

	    return false;
	  }

	}

	function getTarget(item) {
	  return item && item[TargetSlot];
	}

	function extract(objectOrArray) {
	  if (isArray$1(objectOrArray)) {
	    return objectOrArray.map(item => {
	      const original = getTarget(item);

	      if (original) {
	        return extract(original);
	      }

	      return item;
	    });
	  }

	  const obj = ObjectCreate(getPrototypeOf$1(objectOrArray));
	  const names = getOwnPropertyNames$1(objectOrArray);
	  return ArrayConcat$1.call(names, getOwnPropertySymbols$1(objectOrArray)).reduce((seed, key) => {
	    const item = objectOrArray[key];
	    const original = getTarget(item);

	    if (original) {
	      seed[key] = extract(original);
	    } else {
	      seed[key] = item;
	    }

	    return seed;
	  }, obj);
	}

	const formatter = {
	  header: plainOrProxy => {
	    const originalTarget = plainOrProxy[TargetSlot];

	    if (!originalTarget) {
	      return null;
	    }

	    const obj = extract(plainOrProxy);
	    return ['object', {
	      object: obj
	    }];
	  },
	  hasBody: () => {
	    return false;
	  },
	  body: () => {
	    return null;
	  }
	};

	function init() {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  } // Custom Formatter for Dev Tools
	  // To enable this, open Chrome Dev Tools
	  // Go to Settings,
	  // Under console, select "Enable custom formatters"
	  // For more information, https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview


	  const devWindow = window;
	  const devtoolsFormatters = devWindow.devtoolsFormatters || [];
	  ArrayPush$1.call(devtoolsFormatters, formatter);
	  devWindow.devtoolsFormatters = devtoolsFormatters;
	}

	if (process.env.NODE_ENV !== 'production') {
	  init();
	}

	function createShadowTarget(value) {
	  let shadowTarget = undefined;

	  if (isArray$1(value)) {
	    shadowTarget = [];
	  } else if (isObject$1(value)) {
	    shadowTarget = {};
	  }

	  return shadowTarget;
	}

	class ReactiveMembrane {
	  constructor(options) {
	    this.objectGraph = new WeakMap();

	    if (!isUndefined$1(options)) {
	      this.valueDistortion = options.valueDistortion;
	      this.valueMutated = options.valueMutated;
	      this.valueObserved = options.valueObserved;
	    }
	  }

	  getProxy(value) {
	    const {
	      valueDistortion
	    } = this;
	    const distorted = isUndefined$1(valueDistortion) ? value : valueDistortion(value);

	    if (isObservable(distorted)) {
	      const o = this.getReactiveState(distorted); // when trying to extract the writable version of a readonly
	      // we return the readonly.

	      return o.readOnly === value ? value : o.reactive;
	    }

	    return distorted;
	  }

	  getReadOnlyProxy(value) {
	    const {
	      valueDistortion
	    } = this;
	    const distorted = isUndefined$1(valueDistortion) ? value : valueDistortion(value);

	    if (isObservable(distorted)) {
	      return this.getReactiveState(distorted).readOnly;
	    }

	    return distorted;
	  }

	  unwrapProxy(p) {
	    return unwrap(p);
	  }

	  getReactiveState(value) {
	    const membrane = this;
	    const {
	      objectGraph,
	      valueMutated,
	      valueObserved
	    } = membrane;
	    value = unwrap(value);
	    let reactiveState = objectGraph.get(value);

	    if (reactiveState) {
	      return reactiveState;
	    }

	    reactiveState = ObjectDefineProperties(ObjectCreate(null), {
	      reactive: {
	        get() {
	          const reactiveHandler = new ReactiveProxyHandler(membrane, value, {
	            valueMutated,
	            valueObserved
	          }); // caching the reactive proxy after the first time it is accessed

	          const proxy = new Proxy(createShadowTarget(value), reactiveHandler);
	          ObjectDefineProperty(this, 'reactive', {
	            value: proxy
	          });
	          return proxy;
	        },

	        configurable: true
	      },
	      readOnly: {
	        get() {
	          const readOnlyHandler = new ReadOnlyHandler(membrane, value, {
	            valueObserved
	          }); // caching the readOnly proxy after the first time it is accessed

	          const proxy = new Proxy(createShadowTarget(value), readOnlyHandler);
	          ObjectDefineProperty(this, 'readOnly', {
	            value: proxy
	          });
	          return proxy;
	        },

	        configurable: true
	      }
	    });
	    objectGraph.set(value, reactiveState);
	    return reactiveState;
	  }

	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function valueDistortion(value) {
	  return value;
	}

	const reactiveMembrane = new ReactiveMembrane({
	  valueObserved: observeMutation,
	  valueMutated: notifyMutation,
	  valueDistortion
	}); // TODO: REMOVE THIS https://github.com/salesforce/lwc/issues/129

	function dangerousObjectMutation(obj) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.logWarning(`Dangerously Mutating Object ${toString(obj)}. This object was passed to you from a parent component, and should not be mutated here. This will be removed in the near future.`);
	  }

	  return reactiveMembrane.getProxy(unwrap$1(obj));
	} // Universal unwrap mechanism that works for observable membrane
	// and wrapped iframe contentWindow


	const unwrap$1 = function (value) {
	  const unwrapped = reactiveMembrane.unwrapProxy(value);

	  if (unwrapped !== value) {
	    return unwrapped;
	  }

	  return value;
	};
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function track(target, prop, descriptor) {
	  if (arguments.length === 1) {
	    return reactiveMembrane.getProxy(target);
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    if (arguments.length !== 3) {
	      assert.fail(`@track decorator can only be used with one argument to return a trackable object, or as a decorator function.`);
	    }

	    if (!isUndefined(descriptor)) {
	      const {
	        get,
	        set,
	        configurable,
	        writable
	      } = descriptor;
	      assert.isTrue(!get && !set, `Compiler Error: A @track decorator can only be applied to a public field.`);
	      assert.isTrue(configurable !== false, `Compiler Error: A @track decorator can only be applied to a configurable property.`);
	      assert.isTrue(writable !== false, `Compiler Error: A @track decorator can only be applied to a writable property.`);
	    }
	  }

	  return createTrackedPropertyDescriptor(target, prop, isUndefined(descriptor) ? true : descriptor.enumerable === true);
	}

	function createTrackedPropertyDescriptor(Ctor, key, enumerable) {
	  return {
	    get() {
	      const vm = getComponentVM(this);

	      if (process.env.NODE_ENV !== 'production') {
	        assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	      }

	      observeMutation(this, key);
	      return vm.cmpTrack[key];
	    },

	    set(newValue) {
	      const vm = getComponentVM(this);

	      if (process.env.NODE_ENV !== 'production') {
	        assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	        assert.invariant(!isRendering, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${String(key)}`);
	      }

	      const reactiveOrAnyValue = reactiveMembrane.getProxy(newValue);

	      if (reactiveOrAnyValue !== vm.cmpTrack[key]) {
	        if (process.env.NODE_ENV !== 'production') {
	          // reactiveMembrane.getProxy(newValue) will return a different value (proxy)
	          // Then newValue if newValue is observable (plain object or array)
	          const isObservable = reactiveOrAnyValue !== newValue;

	          if (!isObservable && newValue !== null && (isObject(newValue) || isArray(newValue))) {
	            assert.logWarning(`Property "${toString(key)}" of ${vm} is set to a non-trackable object, which means changes into that object cannot be observed.`, vm.elm);
	          }
	        }

	        vm.cmpTrack[key] = reactiveOrAnyValue;

	        if (vm.idx > 0) {
	          // perf optimization to skip this step if not in the DOM
	          notifyMutation(this, key);
	        }
	      }
	    },

	    enumerable,
	    configurable: true
	  };
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function wireDecorator(target, prop, descriptor) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (!isUndefined(descriptor)) {
	      const {
	        get,
	        set,
	        configurable,
	        writable
	      } = descriptor;
	      assert.isTrue(!get && !set, `Compiler Error: A @wire decorator can only be applied to a public field.`);
	      assert.isTrue(configurable !== false, `Compiler Error: A @wire decorator can only be applied to a configurable property.`);
	      assert.isTrue(writable !== false, `Compiler Error: A @wire decorator can only be applied to a writable property.`);
	    }
	  } // TODO: eventually this decorator should have its own logic


	  return createTrackedPropertyDescriptor(target, prop, isObject(descriptor) ? descriptor.enumerable === true : true);
	} // @wire is a factory that when invoked, returns the wire decorator


	function wire(adapter, config) {
	  const len = arguments.length;

	  if (len > 0 && len < 3) {
	    return wireDecorator;
	  } else {
	    if (process.env.NODE_ENV !== 'production') {
	      assert.fail("@wire(adapter, config?) may only be used as a decorator.");
	    }

	    throw new TypeError();
	  }
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function decorate(Ctor, decorators) {
	  // intentionally comparing decorators with null and undefined
	  if (!isFunction(Ctor) || decorators == null) {
	    throw new TypeError();
	  }

	  const props = getOwnPropertyNames(decorators); // intentionally allowing decoration of classes only for now

	  const target = Ctor.prototype;

	  for (let i = 0, len = props.length; i < len; i += 1) {
	    const propName = props[i];
	    const decorator = decorators[propName];

	    if (!isFunction(decorator)) {
	      throw new TypeError();
	    }

	    const originalDescriptor = getOwnPropertyDescriptor(target, propName);
	    const descriptor = decorator(Ctor, propName, originalDescriptor);

	    if (!isUndefined(descriptor)) {
	      defineProperty(target, propName, descriptor);
	    }
	  }

	  return Ctor; // chaining
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const signedDecoratorToMetaMap = new Map();

	function registerDecorators(Ctor, meta) {
	  const decoratorMap = create(null);
	  const props = getPublicPropertiesHash(Ctor, meta.publicProps);
	  const methods = getPublicMethodsHash(Ctor, meta.publicMethods);
	  const wire$$1 = getWireHash(Ctor, meta.wire);
	  const track$$1 = getTrackHash(Ctor, meta.track);
	  signedDecoratorToMetaMap.set(Ctor, {
	    props,
	    methods,
	    wire: wire$$1,
	    track: track$$1
	  });

	  for (const propName in props) {
	    decoratorMap[propName] = api;
	  }

	  if (wire$$1) {
	    for (const propName in wire$$1) {
	      const wireDef = wire$$1[propName];

	      if (wireDef.method) {
	        // for decorated methods we need to do nothing
	        continue;
	      }

	      decoratorMap[propName] = wire(wireDef.adapter, wireDef.params);
	    }
	  }

	  if (track$$1) {
	    for (const propName in track$$1) {
	      decoratorMap[propName] = track;
	    }
	  }

	  decorate(Ctor, decoratorMap);
	  return Ctor;
	}

	function getDecoratorsRegisteredMeta(Ctor) {
	  return signedDecoratorToMetaMap.get(Ctor);
	}

	function getTrackHash(target, track$$1) {
	  if (isUndefined(track$$1) || getOwnPropertyNames(track$$1).length === 0) {
	    return EmptyObject;
	  } // TODO: check that anything in `track` is correctly defined in the prototype


	  return assign(create(null), track$$1);
	}

	function getWireHash(target, wire$$1) {
	  if (isUndefined(wire$$1) || getOwnPropertyNames(wire$$1).length === 0) {
	    return;
	  } // TODO: check that anything in `wire` is correctly defined in the prototype


	  return assign(create(null), wire$$1);
	}

	function getPublicPropertiesHash(target, props) {
	  if (isUndefined(props) || getOwnPropertyNames(props).length === 0) {
	    return EmptyObject;
	  }

	  return getOwnPropertyNames(props).reduce((propsHash, propName) => {
	    const attrName = getAttrNameFromPropName(propName);

	    if (process.env.NODE_ENV !== 'production') {
	      const globalHTMLProperty = getGlobalHTMLPropertiesInfo()[propName];

	      if (globalHTMLProperty && globalHTMLProperty.attribute && globalHTMLProperty.reflective === false) {
	        const {
	          error,
	          attribute,
	          experimental
	        } = globalHTMLProperty;
	        const msg = [];

	        if (error) {
	          msg.push(error);
	        } else if (experimental) {
	          msg.push(`"${propName}" is an experimental property that is not standardized or supported by all browsers. You should not use "${propName}" and attribute "${attribute}" in your component.`);
	        } else {
	          msg.push(`"${propName}" is a global HTML property. Instead access it via the reflective attribute "${attribute}" with one of these techniques:`);
	          msg.push(`  * Use \`this.getAttribute("${attribute}")\` to access the attribute value. This option is best suited for accessing the value in a getter during the rendering process.`);
	        }

	        assert.logError(msg.join('\n'));
	      }
	    }

	    propsHash[propName] = assign({
	      config: 0,
	      type: 'any',
	      attr: attrName
	    }, props[propName]);
	    return propsHash;
	  }, create(null));
	}

	function getPublicMethodsHash(target, publicMethods) {
	  if (isUndefined(publicMethods) || publicMethods.length === 0) {
	    return EmptyObject;
	  }

	  return publicMethods.reduce((methodsHash, methodName) => {
	    if (process.env.NODE_ENV !== 'production') {
	      assert.isTrue(isFunction(target.prototype[methodName]), `Component "${target.name}" should have a method \`${methodName}\` instead of ${target.prototype[methodName]}.`);
	    }

	    methodsHash[methodName] = target.prototype[methodName];
	    return methodsHash;
	  }, create(null));
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function api(target, propName, descriptor) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (arguments.length !== 3) {
	      assert.fail(`@api decorator can only be used as a decorator function.`);
	    }
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(!descriptor || isFunction(descriptor.get) || isFunction(descriptor.set), `Invalid property ${toString(propName)} definition in ${target}, it cannot be a prototype definition if it is a public property. Instead use the constructor to define it.`);

	    if (isObject(descriptor) && isFunction(descriptor.set)) {
	      assert.isTrue(isObject(descriptor) && isFunction(descriptor.get), `Missing getter for property ${toString(propName)} decorated with @api in ${target}. You cannot have a setter without the corresponding getter.`);
	    }
	  }

	  const meta = getDecoratorsRegisteredMeta(target); // initializing getters and setters for each public prop on the target prototype

	  if (isObject(descriptor) && (isFunction(descriptor.get) || isFunction(descriptor.set))) {
	    // if it is configured as an accessor it must have a descriptor
	    // @ts-ignore it must always be set before calling this method
	    meta.props[propName].config = isFunction(descriptor.set) ? 3 : 1;
	    return createPublicAccessorDescriptor(target, propName, descriptor);
	  } else {
	    // @ts-ignore it must always be set before calling this method
	    meta.props[propName].config = 0;
	    return createPublicPropertyDescriptor(target, propName, descriptor);
	  }
	}

	let vmBeingUpdated = null;

	function prepareForPropUpdate(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  vmBeingUpdated = vm;
	}

	function createPublicPropertyDescriptor(proto, key, descriptor) {
	  return {
	    get() {
	      const vm = getComponentVM(this);

	      if (process.env.NODE_ENV !== 'production') {
	        assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	      }

	      if (isBeingConstructed(vm)) {
	        if (process.env.NODE_ENV !== 'production') {
	          assert.logError(`${vm} constructor should not read the value of property "${toString(key)}". The owner component has not yet set the value. Instead use the constructor to set default values for properties.`, vm.elm);
	        }

	        return;
	      }

	      observeMutation(this, key);
	      return vm.cmpProps[key];
	    },

	    set(newValue) {
	      const vm = getComponentVM(this);

	      if (process.env.NODE_ENV !== 'production') {
	        assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	        assert.invariant(!isRendering, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString(key)}`);
	      }

	      if (isTrue(vm.isRoot) || isBeingConstructed(vm)) {
	        vmBeingUpdated = vm;

	        if (process.env.NODE_ENV !== 'production') {
	          // reactiveMembrane.getProxy(newValue) will return a different value (proxy)
	          // Then newValue if newValue is observable (plain object or array)
	          const isObservable = reactiveMembrane.getProxy(newValue) !== newValue;

	          if (!isObservable && !isNull(newValue) && isObject(newValue)) {
	            assert.logWarning(`Assigning a non-reactive value ${newValue} to member property ${toString(key)} of ${vm} is not common because mutations on that value cannot be observed.`, vm.elm);
	          }
	        }
	      }

	      if (process.env.NODE_ENV !== 'production') {
	        if (vmBeingUpdated !== vm) {
	          // logic for setting new properties of the element directly from the DOM
	          // is only recommended for root elements created via createElement()
	          assert.logWarning(`If property ${toString(key)} decorated with @api in ${vm} is used in the template, the value ${toString(newValue)} set manually may be overridden by the template, consider binding the property only in the template.`, vm.elm);
	        }
	      }

	      vmBeingUpdated = null; // releasing the lock
	      // not need to wrap or check the value since that is happening somewhere else

	      vm.cmpProps[key] = reactiveMembrane.getReadOnlyProxy(newValue); // avoid notification of observability while constructing the instance

	      if (vm.idx > 0) {
	        // perf optimization to skip this step if not in the DOM
	        notifyMutation(this, key);
	      }
	    },

	    enumerable: isUndefined(descriptor) ? true : descriptor.enumerable
	  };
	}

	function createPublicAccessorDescriptor(Ctor, key, descriptor) {
	  const {
	    get,
	    set,
	    enumerable
	  } = descriptor;

	  if (!isFunction(get)) {
	    if (process.env.NODE_ENV !== 'production') {
	      assert.fail(`Invalid attempt to create public property descriptor ${toString(key)} in ${Ctor}. It is missing the getter declaration with @api get ${toString(key)}() {} syntax.`);
	    }

	    throw new TypeError();
	  }

	  return {
	    get() {
	      if (process.env.NODE_ENV !== 'production') {
	        const vm = getComponentVM(this);
	        assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	      }

	      return get.call(this);
	    },

	    set(newValue) {
	      const vm = getComponentVM(this);

	      if (process.env.NODE_ENV !== 'production') {
	        assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	        assert.invariant(!isRendering, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString(key)}`);
	      }

	      if (vm.isRoot || isBeingConstructed(vm)) {
	        vmBeingUpdated = vm;

	        if (process.env.NODE_ENV !== 'production') {
	          // reactiveMembrane.getProxy(newValue) will return a different value (proxy)
	          // Then newValue if newValue is observable (plain object or array)
	          const isObservable = reactiveMembrane.getProxy(newValue) !== newValue;

	          if (!isObservable && !isNull(newValue) && isObject(newValue)) {
	            assert.logWarning(`Assigning a non-reactive value ${newValue} to member property ${toString(key)} of ${vm} is not common because mutations on that value cannot be observed.`, vm.elm);
	          }
	        }
	      }

	      if (process.env.NODE_ENV !== 'production') {
	        if (vmBeingUpdated !== vm) {
	          // logic for setting new properties of the element directly from the DOM
	          // is only recommended for root elements created via createElement()
	          assert.logWarning(`If property ${toString(key)} decorated with @api in ${vm} is used in the template, the value ${toString(newValue)} set manually may be overridden by the template, consider binding the property only in the template.`, vm.elm);
	        }
	      }

	      vmBeingUpdated = null; // releasing the lock
	      // not need to wrap or check the value since that is happening somewhere else

	      if (set) {
	        set.call(this, reactiveMembrane.getReadOnlyProxy(newValue));
	      } else if (process.env.NODE_ENV !== 'production') {
	        assert.fail(`Invalid attempt to set a new value for property ${toString(key)} of ${vm} that does not has a setter decorated with @api.`);
	      }
	    },

	    enumerable
	  };
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const EspecialTagAndPropMap = create(null, {
	  input: {
	    value: create(null, {
	      value: {
	        value: 1
	      },
	      checked: {
	        value: 1
	      }
	    })
	  },
	  select: {
	    value: create(null, {
	      value: {
	        value: 1
	      }
	    })
	  },
	  textarea: {
	    value: create(null, {
	      value: {
	        value: 1
	      }
	    })
	  }
	});

	function isLiveBindingProp(sel, key) {
	  // For special whitelisted properties (e.g., `checked` and `value`), we
	  // check against the actual property value on the DOM element instead of
	  // relying on tracked property values.
	  return hasOwnProperty.call(EspecialTagAndPropMap, sel) && hasOwnProperty.call(EspecialTagAndPropMap[sel], key);
	}

	function update(oldVnode, vnode) {
	  const props = vnode.data.props;

	  if (isUndefined(props)) {
	    return;
	  }

	  const oldProps = oldVnode.data.props;

	  if (oldProps === props) {
	    return;
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(isUndefined(oldProps) || keys(oldProps).join(',') === keys(props).join(','), 'vnode.data.props cannot change shape.');
	  }

	  const elm = vnode.elm;
	  const vm = getInternalField(elm, ViewModelReflection);
	  const isFirstPatch = isUndefined(oldProps);
	  const isCustomElement = !isUndefined(vm);
	  const {
	    sel
	  } = vnode;

	  for (const key in props) {
	    const cur = props[key];

	    if (process.env.NODE_ENV !== 'production') {
	      if (!(key in elm)) {
	        // TODO: this should never really happen because the compiler should always validate
	        assert.fail(`Unknown public property "${key}" of element <${sel}>. This is likely a typo on the corresponding attribute "${getAttrNameFromPropName(key)}".`);
	      }
	    } // if it is the first time this element is patched, or the current value is different to the previous value...


	    if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? elm[key] : oldProps[key])) {
	      if (isCustomElement) {
	        prepareForPropUpdate(vm); // this is just in case the vnode is actually a custom element
	      }

	      elm[key] = cur;
	    }
	  }
	}

	const emptyVNode$1 = {
	  data: {}
	};
	var modProps = {
	  create: vnode => update(emptyVNode$1, vnode),
	  update
	};
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	const classNameToClassMap = create(null);

	function getMapFromClassName(className) {
	  // Intentionally using == to match undefined and null values from computed style attribute
	  if (className == null) {
	    return EmptyObject;
	  } // computed class names must be string


	  className = isString(className) ? className : className + '';
	  let map = classNameToClassMap[className];

	  if (map) {
	    return map;
	  }

	  map = create(null);
	  let start = 0;
	  let o;
	  const len = className.length;

	  for (o = 0; o < len; o++) {
	    if (StringCharCodeAt.call(className, o) === SPACE_CHAR) {
	      if (o > start) {
	        map[StringSlice.call(className, start, o)] = true;
	      }

	      start = o + 1;
	    }
	  }

	  if (o > start) {
	    map[StringSlice.call(className, start, o)] = true;
	  }

	  classNameToClassMap[className] = map;

	  if (process.env.NODE_ENV !== 'production') {
	    // just to make sure that this object never changes as part of the diffing algo
	    freeze(map);
	  }

	  return map;
	}

	function updateClassAttribute(oldVnode, vnode) {
	  const {
	    elm,
	    data: {
	      className: newClass
	    }
	  } = vnode;
	  const {
	    data: {
	      className: oldClass
	    }
	  } = oldVnode;

	  if (oldClass === newClass) {
	    return;
	  }

	  const {
	    classList
	  } = elm;
	  const newClassMap = getMapFromClassName(newClass);
	  const oldClassMap = getMapFromClassName(oldClass);
	  let name;

	  for (name in oldClassMap) {
	    // remove only if it is not in the new class collection and it is not set from within the instance
	    if (isUndefined(newClassMap[name])) {
	      classList.remove(name);
	    }
	  }

	  for (name in newClassMap) {
	    if (isUndefined(oldClassMap[name])) {
	      classList.add(name);
	    }
	  }
	}

	const emptyVNode$2 = {
	  data: {}
	};
	var modComputedClassName = {
	  create: vnode => updateClassAttribute(emptyVNode$2, vnode),
	  update: updateClassAttribute
	};
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// The style property is a string when defined via an expression in the template.

	function updateStyleAttribute(oldVnode, vnode) {
	  const {
	    style: newStyle
	  } = vnode.data;

	  if (oldVnode.data.style === newStyle) {
	    return;
	  }

	  const elm = vnode.elm;
	  const {
	    style
	  } = elm;

	  if (!isString(newStyle) || newStyle === '') {
	    removeAttribute.call(elm, 'style');
	  } else {
	    style.cssText = newStyle;
	  }
	}

	const emptyVNode$3 = {
	  data: {}
	};
	var modComputedStyle = {
	  create: vnode => updateStyleAttribute(emptyVNode$3, vnode),
	  update: updateStyleAttribute
	};
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// The HTML class property becomes the vnode.data.classMap object when defined as a string in the template.
	// The compiler takes care of transforming the inline classnames into an object. It's faster to set the
	// different classnames properties individually instead of via a string.

	function createClassAttribute(vnode) {
	  const {
	    elm,
	    data: {
	      classMap
	    }
	  } = vnode;

	  if (isUndefined(classMap)) {
	    return;
	  }

	  const {
	    classList
	  } = elm;

	  for (const name in classMap) {
	    classList.add(name);
	  }
	}

	var modStaticClassName = {
	  create: createClassAttribute
	};
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// The HTML style property becomes the vnode.data.styleMap object when defined as a string in the template.
	// The compiler takes care of transforming the inline style into an object. It's faster to set the
	// different style properties individually instead of via a string.

	function createStyleAttribute(vnode) {
	  const {
	    elm,
	    data: {
	      styleMap
	    }
	  } = vnode;

	  if (isUndefined(styleMap)) {
	    return;
	  }

	  const {
	    style
	  } = elm;

	  for (const name in styleMap) {
	    style[name] = styleMap[name];
	  }
	}

	var modStaticStyle = {
	  create: createStyleAttribute
	};
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	function createContext(vnode) {
	  const {
	    data: {
	      context
	    }
	  } = vnode;

	  if (isUndefined(context)) {
	    return;
	  }

	  const elm = vnode.elm;
	  const vm = getInternalField(elm, ViewModelReflection);

	  if (!isUndefined(vm)) {
	    assign(vm.context, context);
	  }
	}

	const contextModule = {
	  create: createContext
	};
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	let MO = window.MutationObserver; // MutationObserver is not yet implemented in jsdom:
	// https://github.com/jsdom/jsdom/issues/639

	if (typeof MO === 'undefined') {
	  /* tslint:disable-next-line:no-empty */
	  function MutationObserverMock() {}

	  MutationObserverMock.prototype = {
	    observe() {
	      if (process.env.NODE_ENV !== 'production') {
	        if (process.env.NODE_ENV !== 'test') {
	          throw new Error(`MutationObserver should not be mocked outside of the jest test environment`);
	        }
	      }
	    }

	  };
	  MO = window.MutationObserver = MutationObserverMock;
	}

	const MutationObserver = MO;
	const MutationObserverObserve = MutationObserver.prototype.observe;
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	function getTextContent(node) {
	  switch (node.nodeType) {
	    case Node.ELEMENT_NODE:
	      const childNodes = getFilteredChildNodes(node);
	      let content = '';

	      for (let i = 0, len = childNodes.length; i < len; i += 1) {
	        content += getTextContent(childNodes[i]);
	      }

	      return content;

	    default:
	      return node.nodeValue;
	  }
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const Items = createFieldName('items'); // tslint:disable-next-line:no-empty

	function StaticNodeList() {
	  throw new TypeError('Illegal constructor');
	}

	StaticNodeList.prototype = create(NodeList.prototype, {
	  constructor: {
	    writable: true,
	    configurable: true,
	    value: StaticNodeList
	  },
	  item: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(index) {
	      return this[index];
	    }

	  },
	  length: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return getInternalField(this, Items).length;
	    }

	  },
	  // Iterator protocol
	  forEach: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(cb, thisArg) {
	      forEach.call(getInternalField(this, Items), cb, thisArg);
	    }

	  },
	  entries: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value() {
	      return ArrayMap.call(getInternalField(this, Items), (v, i) => [i, v]);
	    }

	  },
	  keys: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value() {
	      return ArrayMap.call(getInternalField(this, Items), (v, i) => i);
	    }

	  },
	  values: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value() {
	      return getInternalField(this, Items);
	    }

	  },
	  [Symbol.iterator]: {
	    writable: true,
	    configurable: true,

	    value() {
	      let nextIndex = 0;
	      return {
	        next: () => {
	          const items = getInternalField(this, Items);
	          return nextIndex < items.length ? {
	            value: items[nextIndex++],
	            done: false
	          } : {
	            done: true
	          };
	        }
	      };
	    }

	  }
	}); // prototype inheritance dance

	setPrototypeOf(StaticNodeList, NodeList);

	function createStaticNodeList(items) {
	  const nodeList = create(StaticNodeList.prototype, {
	    [Items]: {
	      value: items
	    }
	  }); // setting static indexes

	  forEach.call(items, (item, index) => {
	    defineProperty(nodeList, index, {
	      value: item,
	      enumerable: true,
	      configurable: true
	    });
	  });
	  return nodeList;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const DocumentPrototypeActiveElement = getOwnPropertyDescriptor(Document.prototype, 'activeElement').get;
	const elementFromPoint = hasOwnProperty.call(Document.prototype, 'elementFromPoint') ? Document.prototype.elementFromPoint : Document.prototype.msElementFromPoint; // IE11

	const {
	  createDocumentFragment,
	  createElement,
	  createElementNS,
	  createTextNode,
	  createComment,
	  querySelector: querySelector$1,
	  querySelectorAll: querySelectorAll$1,
	  getElementById,
	  getElementsByClassName: getElementsByClassName$1,
	  getElementsByName,
	  getElementsByTagName: getElementsByTagName$1,
	  getElementsByTagNameNS: getElementsByTagNameNS$1
	} = Document.prototype;
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	const Items$1 = createFieldName('items');

	function isValidHTMLCollectionName(name) {
	  return name !== 'length' && isNaN(name);
	}

	function getNodeHTMLCollectionName(node) {
	  return node.getAttribute('id') || node.getAttribute('name');
	}

	function StaticHTMLCollection() {
	  throw new TypeError('Illegal constructor');
	}

	StaticHTMLCollection.prototype = create(HTMLCollection.prototype, {
	  constructor: {
	    writable: true,
	    configurable: true,
	    value: StaticHTMLCollection
	  },
	  item: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(index) {
	      return this[index];
	    }

	  },
	  length: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return getInternalField(this, Items$1).length;
	    }

	  },
	  // https://dom.spec.whatwg.org/#dom-htmlcollection-nameditem-key
	  namedItem: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(name) {
	      if (isValidHTMLCollectionName(name) && this[name]) {
	        return this[name];
	      }

	      const items = getInternalField(this, Items$1); // Note: loop in reverse so that the first named item matches the named property

	      for (let len = items.length - 1; len >= 0; len -= 1) {
	        const item = items[len];
	        const nodeName = getNodeHTMLCollectionName(item);

	        if (nodeName === name) {
	          return item;
	        }
	      }

	      return null;
	    }

	  },
	  // Iterator protocol
	  forEach: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(cb, thisArg) {
	      forEach.call(getInternalField(this, Items$1), cb, thisArg);
	    }

	  },
	  entries: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value() {
	      return ArrayMap.call(getInternalField(this, Items$1), (v, i) => [i, v]);
	    }

	  },
	  keys: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value() {
	      return ArrayMap.call(getInternalField(this, Items$1), (v, i) => i);
	    }

	  },
	  values: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value() {
	      return getInternalField(this, Items$1);
	    }

	  },
	  [Symbol.iterator]: {
	    writable: true,
	    configurable: true,

	    value() {
	      let nextIndex = 0;
	      return {
	        next: () => {
	          const items = getInternalField(this, Items$1);
	          return nextIndex < items.length ? {
	            value: items[nextIndex++],
	            done: false
	          } : {
	            done: true
	          };
	        }
	      };
	    }

	  }
	}); // prototype inheritance dance

	setPrototypeOf(StaticHTMLCollection, HTMLCollection);

	function createStaticHTMLCollection(items) {
	  const collection = create(StaticHTMLCollection.prototype, {
	    [Items$1]: {
	      value: items
	    }
	  }); // setting static indexes

	  forEach.call(items, (item, index) => {
	    defineProperty(collection, index, {
	      value: item,
	      enumerable: true,
	      configurable: true
	    });
	  });
	  return collection;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function getInnerHTML(node) {
	  let s = '';
	  const childNodes = getFilteredChildNodes(node);

	  for (let i = 0, len = childNodes.length; i < len; i += 1) {
	    s += getOuterHTML(childNodes[i]);
	  }

	  return s;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString


	const escapeAttrRegExp = /[&\u00A0"]/g;
	const escapeDataRegExp = /[&\u00A0<>]/g;
	const {
	  replace,
	  toLowerCase
	} = String.prototype;

	function escapeReplace(c) {
	  switch (c) {
	    case '&':
	      return '&amp;';

	    case '<':
	      return '&lt;';

	    case '>':
	      return '&gt;';

	    case '"':
	      return '&quot;';

	    case '\u00A0':
	      return '&nbsp;';
	  }
	}

	function escapeAttr(s) {
	  return replace.call(s, escapeAttrRegExp, escapeReplace);
	}

	function escapeData(s) {
	  return replace.call(s, escapeDataRegExp, escapeReplace);
	} // http://www.whatwg.org/specs/web-apps/current-work/#void-elements


	const voidElements = new Set(['AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR']);
	const plaintextParents = new Set(['STYLE', 'SCRIPT', 'XMP', 'IFRAME', 'NOEMBED', 'NOFRAMES', 'PLAINTEXT', 'NOSCRIPT']);

	function getOuterHTML(node) {
	  switch (node.nodeType) {
	    case Node.ELEMENT_NODE:
	      {
	        const {
	          attributes: attrs
	        } = node;
	        const tagName = tagNameGetter.call(node);
	        let s = '<' + toLowerCase.call(tagName);

	        for (let i = 0, attr; attr = attrs[i]; i++) {
	          s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
	        }

	        s += '>';

	        if (voidElements.has(tagName)) {
	          return s;
	        }

	        return s + getInnerHTML(node) + '</' + toLowerCase.call(tagName) + '>';
	      }

	    case Node.TEXT_NODE:
	      {
	        const {
	          data,
	          parentNode
	        } = node;

	        if (parentNode instanceof Element && plaintextParents.has(tagNameGetter.call(parentNode))) {
	          return data;
	        }

	        return escapeData(data);
	      }

	    case Node.COMMENT_NODE:
	      {
	        return '<!--' + node.data + '-->';
	      }

	    default:
	      {
	        throw new Error();
	      }
	  }
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/


	function pathComposer(startNode, composed) {
	  const composedPath = [];
	  let current = startNode;
	  const startRoot = startNode === window ? window : getRootNodeGetter.call(startNode);

	  while (current) {
	    composedPath.push(current);

	    if (current.assignedSlot) {
	      current = current.assignedSlot;
	    } else if (current.nodeType === DOCUMENT_FRAGMENT_NODE && current.host && (composed || current !== startRoot)) {
	      current = current.host;
	    } else {
	      current = current.parentNode;
	    }
	  } // event composedPath includes window when startNode's ownerRoot is document


	  if (composedPath[composedPath.length - 1] === document) {
	    composedPath.push(window);
	  }

	  return composedPath;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/


	function retarget(refNode, path) {
	  // If ANCESTOR's root is not a shadow root or ANCESTOR's root is BASE's
	  // shadow-including inclusive ancestor, return ANCESTOR.
	  const refNodePath = pathComposer(refNode, true);
	  const p$ = path;

	  for (let i = 0, ancestor, lastRoot, root, rootIdx; i < p$.length; i++) {
	    ancestor = p$[i];
	    root = ancestor === window ? window : getRootNodeGetter.call(ancestor);

	    if (root !== lastRoot) {
	      rootIdx = refNodePath.indexOf(root);
	      lastRoot = root;
	    }

	    if (!(root instanceof SyntheticShadowRoot) || rootIdx > -1) {
	      return ancestor;
	    }
	  }

	  return null;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const HostKey = createFieldName('host');
	const ShadowRootKey = createFieldName('shadowRoot');
	const {
	  createDocumentFragment: createDocumentFragment$1
	} = document;

	function isDelegatingFocus(host) {
	  const shadowRoot = getShadowRoot(host);
	  return shadowRoot.delegatesFocus;
	}

	function getHost(root) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(root[HostKey], `A 'ShadowRoot' node must be attached to an 'HTMLElement' node.`);
	  }

	  return root[HostKey];
	}

	function getShadowRoot(elm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(getInternalField(elm, ShadowRootKey), `A Custom Element with a shadow attached must be provided as the first argument.`);
	  }

	  return getInternalField(elm, ShadowRootKey);
	}

	function attachShadow(elm, options) {
	  if (getInternalField(elm, ShadowRootKey)) {
	    throw new Error(`Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.`);
	  }

	  const {
	    mode,
	    delegatesFocus
	  } = options; // creating a real fragment for shadowRoot instance

	  const sr = createDocumentFragment$1.call(document);
	  defineProperty(sr, 'mode', {
	    get() {
	      return mode;
	    },

	    configurable: true,
	    enumerable: true
	  });
	  defineProperty(sr, 'delegatesFocus', {
	    get() {
	      return !!delegatesFocus;
	    },

	    configurable: true,
	    enumerable: true
	  }); // correcting the proto chain

	  setPrototypeOf(sr, SyntheticShadowRoot.prototype);
	  setInternalField(sr, HostKey, elm);
	  setInternalField(elm, ShadowRootKey, sr); // expose the shadow via a hidden symbol for testing purposes

	  if (process.env.NODE_ENV === 'test') {
	    elm['$$ShadowRoot$$'] = sr; // tslint:disable-line
	  }

	  return sr;
	}

	var ShadowRootMode;

	(function (ShadowRootMode) {
	  ShadowRootMode["CLOSED"] = "closed";
	  ShadowRootMode["OPEN"] = "open";
	})(ShadowRootMode || (ShadowRootMode = {}));

	const SyntheticShadowRootDescriptors = {
	  constructor: {
	    writable: true,
	    configurable: true,
	    value: SyntheticShadowRoot
	  },
	  toString: {
	    writable: true,
	    configurable: true,

	    value() {
	      return `[object ShadowRoot]`;
	    }

	  }
	};
	const ShadowRootDescriptors = {
	  activeElement: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      const activeElement = DocumentPrototypeActiveElement.call(document);

	      if (isNull(activeElement)) {
	        return activeElement;
	      }

	      const host = getHost(this);

	      if ((compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) === 0) {
	        return null;
	      } // activeElement must be child of the host and owned by it


	      let node = activeElement;

	      while (!isNodeOwnedBy(host, node)) {
	        node = parentElementGetter.call(node);
	      } // If we have a slot element here that means that we were dealing
	      // with an element that was passed to one of our slots. In this
	      // case, activeElement returns null.


	      if (isSlotElement(node)) {
	        return null;
	      }

	      return node;
	    }

	  },
	  delegatesFocus: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return false;
	    }

	  },
	  elementFromPoint: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(left, top) {
	      const element = elementFromPoint.call(document, left, top);

	      if (isNull(element)) {
	        return element;
	      }

	      return retarget(this, pathComposer(element, true));
	    }

	  },
	  elementsFromPoint: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(left, top) {
	      throw new Error();
	    }

	  },
	  getSelection: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value() {
	      throw new Error();
	    }

	  },
	  host: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return getHost(this);
	    }

	  },
	  mode: {
	    configurable: true,

	    get() {
	      return ShadowRootMode.OPEN;
	    }

	  },
	  styleSheets: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      throw new Error();
	    }

	  }
	};
	const NodePatchDescriptors = {
	  addEventListener: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(type, listener, options) {
	      addShadowRootEventListener(this, type, listener, options);
	    }

	  },
	  removeEventListener: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(type, listener, options) {
	      removeShadowRootEventListener(this, type, listener, options);
	    }

	  },
	  baseURI: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return getHost(this).baseURI;
	    }

	  },
	  childNodes: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return createStaticNodeList(shadowRootChildNodes(this));
	    }

	  },
	  compareDocumentPosition: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(otherNode) {
	      const host = getHost(this);

	      if (this === otherNode) {
	        // it is the root itself
	        return 0;
	      }

	      if (this.contains(otherNode)) {
	        // it belongs to the shadow root instance
	        return 20; // 10100 === DOCUMENT_POSITION_FOLLOWING & DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
	      } else if (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) {
	        // it is a child element but does not belong to the shadow root instance
	        return 37; // 100101 === DOCUMENT_POSITION_DISCONNECTED & DOCUMENT_POSITION_FOLLOWING & DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
	      } else {
	        // it is not a descendant
	        return 35; // 100011 === DOCUMENT_POSITION_DISCONNECTED & DOCUMENT_POSITION_PRECEDING & DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
	      }
	    }

	  },
	  contains: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(otherNode) {
	      const host = getHost(this); // must be child of the host and owned by it.

	      return (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 && isNodeOwnedBy(host, otherNode);
	    }

	  },
	  firstChild: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      const {
	        childNodes
	      } = this;
	      return childNodes[0] || null;
	    }

	  },
	  lastChild: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      const {
	        childNodes
	      } = this;
	      return childNodes[childNodes.length - 1] || null;
	    }

	  },
	  hasChildNodes: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value() {
	      return this.childNodes.length > 0;
	    }

	  },
	  isConnected: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return (compareDocumentPosition.call(document, getHost(this)) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
	    }

	  },
	  nextSibling: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return null;
	    }

	  },
	  previousSibling: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return null;
	    }

	  },
	  nodeName: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return '#document-fragment';
	    }

	  },
	  nodeType: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return 11; // Node.DOCUMENT_FRAGMENT_NODE
	    }

	  },
	  nodeValue: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return null;
	    }

	  },
	  ownerDocument: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return getHost(this).ownerDocument;
	    }

	  },
	  parentElement: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return null;
	    }

	  },
	  parentNode: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return null;
	    }

	  },
	  textContent: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      const {
	        childNodes
	      } = this;
	      let textContent = '';

	      for (let i = 0, len = childNodes.length; i < len; i += 1) {
	        textContent += getTextContent(childNodes[i]);
	      }

	      return textContent;
	    }

	  },
	  getRootNode: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(options) {
	      return getRootNodeGetter.call(this, options);
	    }

	  }
	};
	const ElementPatchDescriptors = {
	  innerHTML: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      const {
	        childNodes
	      } = this;
	      let innerHTML = '';

	      for (let i = 0, len = childNodes.length; i < len; i += 1) {
	        innerHTML += getOuterHTML(childNodes[i]);
	      }

	      return innerHTML;
	    }

	  },
	  localName: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return null;
	    }

	  },
	  namespaceURI: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return null;
	    }

	  },
	  nextElementSibling: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return null;
	    }

	  },
	  previousElementSibling: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return null;
	    }

	  },
	  prefix: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return null;
	    }

	  }
	};
	const ParentNodePatchDescriptors = {
	  childElementCount: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return this.children.length;
	    }

	  },
	  children: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return createStaticHTMLCollection(ArrayFilter.call(shadowRootChildNodes(this), elm => elm instanceof Element));
	    }

	  },
	  firstElementChild: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      return this.children[0] || null;
	    }

	  },
	  lastElementChild: {
	    enumerable: true,
	    configurable: true,

	    get() {
	      const {
	        children
	      } = this;
	      return children.item(children.length - 1) || null;
	    }

	  },
	  querySelector: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(selectors) {
	      return shadowRootQuerySelector(this, selectors);
	    }

	  },
	  querySelectorAll: {
	    writable: true,
	    enumerable: true,
	    configurable: true,

	    value(selectors) {
	      return createStaticNodeList(shadowRootQuerySelectorAll(this, selectors));
	    }

	  }
	};
	assign(SyntheticShadowRootDescriptors, NodePatchDescriptors, ParentNodePatchDescriptors, ElementPatchDescriptors, ShadowRootDescriptors);

	function SyntheticShadowRoot() {
	  throw new TypeError('Illegal constructor');
	}

	SyntheticShadowRoot.prototype = create(DocumentFragment.prototype, SyntheticShadowRootDescriptors); // Is native ShadowDom is available on window,
	// we need to make sure that our synthetic shadow dom
	// passed instanceof checks against window.ShadowDom

	if (isNativeShadowRootAvailable) {
	  setPrototypeOf(SyntheticShadowRoot.prototype, window.ShadowRoot.prototype);
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// DO NOT CHANGE this:
	// these two values need to be in sync with framework/vm.ts


	const OwnerKey = '$$OwnerKey$$';
	const OwnKey = '$$OwnKey$$';

	function getNodeOwnerKey(node) {
	  return node[OwnerKey];
	}

	function setNodeOwnerKey(node, key) {
	  node[OwnerKey] = key;
	}

	function getNodeNearestOwnerKey(node) {
	  let ownerKey; // search for the first element with owner identity (just in case of manually inserted elements)

	  while (!isNull(node) && isUndefined(ownerKey = node[OwnerKey])) {
	    node = parentNodeGetter.call(node);
	  }

	  return ownerKey;
	}

	function getNodeKey(node) {
	  return node[OwnKey];
	}

	const portals = new WeakMap(); // We can use a single observer without having to worry about leaking because
	// "Registered observers in a node’s registered observer list have a weak
	// reference to the node."
	// https://dom.spec.whatwg.org/#garbage-collection

	let portalObserver;
	const portalObserverConfig = {
	  childList: true,
	  subtree: true
	};

	function patchPortalElement(node, ownerKey, shadowToken) {
	  // If node aleady has an ownerkey, we can skip
	  // Note: checking if a node as any ownerKey is not enough
	  // because this element could be moved from one
	  // shadow to another
	  if (getNodeOwnerKey(node) === ownerKey) {
	    return;
	  }

	  setNodeOwnerKey(node, ownerKey);

	  if (node instanceof Element) {
	    setCSSToken(node, shadowToken);
	    const {
	      childNodes
	    } = node;

	    for (let i = 0, len = childNodes.length; i < len; i += 1) {
	      const child = childNodes[i];
	      patchPortalElement(child, ownerKey, shadowToken);
	    }
	  }
	}

	function initPortalObserver() {
	  return new MutationObserver(mutations => {
	    forEach.call(mutations, mutation => {
	      const {
	        target: elm,
	        addedNodes
	      } = mutation;
	      const ownerKey = getNodeOwnerKey(elm);
	      const shadowToken = getCSSToken(elm); // OwnerKey might be undefined at this point.
	      // We used to throw an error here, but we need to return early instead.
	      //
	      // This routine results in a mutation target that will have no key
	      // because its been removed by the time the observer runs
	      // const div = document.createElement('div');
	      // div.innerHTML = '<span>span</span>';
	      // const span = div.querySelector('span');
	      // manualElement.appendChild(div);
	      // span.textContent = '';
	      // span.parentNode.removeChild(span);

	      if (isUndefined(ownerKey)) {
	        return;
	      }

	      for (let i = 0, len = addedNodes.length; i < len; i += 1) {
	        const node = addedNodes[i];
	        patchPortalElement(node, ownerKey, shadowToken);
	      }
	    });
	  });
	}

	const ShadowTokenKey = '$$ShadowTokenKey$$';

	function setCSSToken(elm, shadowToken) {
	  if (!isUndefined(shadowToken)) {
	    setAttribute.call(elm, shadowToken, '');
	    elm[ShadowTokenKey] = shadowToken;
	  }
	}

	function getCSSToken(elm) {
	  return elm[ShadowTokenKey];
	}

	function markElementAsPortal(elm) {
	  portals.set(elm, 1);

	  if (!portalObserver) {
	    portalObserver = initPortalObserver();
	  } // install mutation observer for portals


	  MutationObserverObserve.call(portalObserver, elm, portalObserverConfig);
	}

	function getShadowParent(node, value) {
	  const owner = getNodeOwner(node);

	  if (value === owner) {
	    // walking up via parent chain might end up in the shadow root element
	    return getShadowRoot(owner);
	  } else if (value instanceof Element) {
	    if (getNodeNearestOwnerKey(node) === getNodeNearestOwnerKey(value)) {
	      // the element and its parent node belong to the same shadow root
	      return value;
	    } else if (!isNull(owner) && isSlotElement(value)) {
	      // slotted elements must be top level childNodes of the slot element
	      // where they slotted into, but its shadowed parent is always the
	      // owner of the slot.
	      const slotOwner = getNodeOwner(value);

	      if (!isNull(slotOwner) && isNodeOwnedBy(owner, slotOwner)) {
	        // it is a slotted element, and therefore its parent is always going to be the host of the slot
	        return slotOwner;
	      }
	    }
	  }

	  return null;
	}

	function PatchedNode(node) {
	  const Ctor = getPrototypeOf(node).constructor;

	  class PatchedNodeClass {
	    constructor() {
	      // Patched classes are not supposed to be instantiated directly, ever!
	      throw new TypeError('Illegal constructor');
	    }

	    hasChildNodes() {
	      return this.childNodes.length > 0;
	    } // @ts-ignore until ts@3.x


	    get firstChild() {
	      const {
	        childNodes
	      } = this; // @ts-ignore until ts@3.x

	      return childNodes[0] || null;
	    } // @ts-ignore until ts@3.x


	    get lastChild() {
	      const {
	        childNodes
	      } = this; // @ts-ignore until ts@3.x

	      return childNodes[childNodes.length - 1] || null;
	    }

	    get textContent() {
	      return getTextContent(this);
	    }

	    set textContent(value) {
	      textContextSetter.call(this, value);
	    }

	    get childElementCount() {
	      return this.children.length;
	    }

	    get firstElementChild() {
	      return this.children[0] || null;
	    }

	    get lastElementChild() {
	      const {
	        children
	      } = this;
	      return children.item(children.length - 1) || null;
	    }

	    get assignedSlot() {
	      const parentNode = parentNodeGetter.call(this);
	      /**
	       * if it doesn't have a parent node,
	       * or the parent is not an slot element
	       * or they both belong to the same template (default content)
	       * we should assume that it is not slotted
	       */

	      if (isNull(parentNode) || !isSlotElement(parentNode) || getNodeNearestOwnerKey(parentNode) === getNodeNearestOwnerKey(this)) {
	        return null;
	      }

	      return parentNode;
	    }

	    get parentNode() {
	      const value = parentNodeGetter.call(this);

	      if (isNull(value)) {
	        return value;
	      }

	      return getShadowParent(this, value);
	    }

	    get parentElement() {
	      const parentNode = parentNodeGetter.call(this);

	      if (isNull(parentNode)) {
	        return null;
	      }

	      const nodeOwner = getNodeOwner(this);

	      if (isNull(nodeOwner)) {
	        return parentNode;
	      } // If we have traversed to the host element,
	      // we need to return null


	      if (nodeOwner === parentNode) {
	        return null;
	      }

	      return parentNode;
	    }

	    getRootNode(options) {
	      return getRootNodeGetter.call(this, options);
	    }

	    compareDocumentPosition(otherNode) {
	      if (getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
	        // it is from another shadow
	        return 0;
	      }

	      return compareDocumentPosition.call(this, otherNode);
	    }

	    contains(otherNode) {
	      if (getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
	        // it is from another shadow
	        return false;
	      }

	      return (compareDocumentPosition.call(this, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
	    }

	    cloneNode(deep) {
	      const clone = cloneNode.call(this, false); // Per spec, browsers only care about truthy values
	      // Not strict true or false

	      if (!deep) {
	        return clone;
	      }

	      const childNodes = this.childNodes;

	      for (let i = 0, len = childNodes.length; i < len; i += 1) {
	        clone.appendChild(childNodes[i].cloneNode(true));
	      }

	      return clone;
	    }

	  } // prototype inheritance dance


	  setPrototypeOf(PatchedNodeClass, Ctor);
	  setPrototypeOf(PatchedNodeClass.prototype, Ctor.prototype);
	  return PatchedNodeClass;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function wrapIframeWindow(win) {
	  return {
	    postMessage() {
	      return win.postMessage.apply(win, arguments);
	    },

	    blur() {
	      return win.blur.apply(win, arguments);
	    },

	    close() {
	      return win.close.apply(win, arguments);
	    },

	    focus() {
	      return win.focus.apply(win, arguments);
	    },

	    get closed() {
	      return win.closed;
	    },

	    get frames() {
	      return win.frames;
	    },

	    get length() {
	      return win.length;
	    },

	    get location() {
	      return win.location;
	    },

	    set location(value) {
	      win.location = value;
	    },

	    get opener() {
	      return win.opener;
	    },

	    get parent() {
	      return win.parent;
	    },

	    get self() {
	      return win.self;
	    },

	    get top() {
	      return win.top;
	    },

	    get window() {
	      return win.window;
	    }

	  };
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// We can use a single observer without having to worry about leaking because
	// "Registered observers in a node’s registered observer list have a weak
	// reference to the node."
	// https://dom.spec.whatwg.org/#garbage-collection


	let observer;
	const observerConfig = {
	  childList: true
	};
	const SlotChangeKey = createFieldName('slotchange');

	function initSlotObserver() {
	  return new MutationObserver(mutations => {
	    const slots = [];
	    forEach.call(mutations, mutation => {
	      if (process.env.NODE_ENV !== 'production') {
	        assert.isTrue(mutation.type === 'childList', `Invalid mutation type: ${mutation.type}. This mutation handler for slots should only handle "childList" mutations.`);
	      }

	      const {
	        target: slot
	      } = mutation;

	      if (ArrayIndexOf.call(slots, slot) === -1) {
	        ArrayPush.call(slots, slot);
	        dispatchEvent.call(slot, new CustomEvent('slotchange'));
	      }
	    });
	  });
	}

	function getFilteredSlotAssignedNodes(slot) {
	  const owner = getNodeOwner(slot);

	  if (isNull(owner)) {
	    return [];
	  }

	  return ArrayReduce.call(childNodesGetter.call(slot), (seed, child) => {
	    if (!isNodeOwnedBy(owner, child)) {
	      ArrayPush.call(seed, child);
	    }

	    return seed;
	  }, []);
	}

	function getFilteredSlotFlattenNodes(slot) {
	  return ArrayReduce.call(childNodesGetter.call(slot), (seed, child) => {
	    if (child instanceof Element && isSlotElement(child)) {
	      ArrayPush.apply(seed, getFilteredSlotFlattenNodes(child));
	    } else {
	      ArrayPush.call(seed, child);
	    }

	    return seed;
	  }, []);
	}

	function PatchedSlotElement(elm) {
	  const Ctor = PatchedElement(elm);
	  const {
	    addEventListener: superAddEventListener
	  } = elm;
	  return class PatchedHTMLSlotElement extends Ctor {
	    addEventListener(type, listener, options) {
	      if (type === 'slotchange' && !getInternalField(this, SlotChangeKey)) {
	        if (process.env.NODE_ENV === 'test') {
	          /* tslint:disable-next-line:no-console */
	          console.warn('The "slotchange" event is not supported in our jest test environment.');
	        }

	        setInternalField(this, SlotChangeKey, true);

	        if (!observer) {
	          observer = initSlotObserver();
	        }

	        MutationObserverObserve.call(observer, this, observerConfig);
	      }

	      superAddEventListener.call(this, type, listener, options);
	    }

	    assignedElements(options) {
	      const flatten = !isUndefined(options) && isTrue(options.flatten);
	      const nodes = flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
	      return ArrayFilter.call(nodes, node => node instanceof Element);
	    }

	    assignedNodes(options) {
	      const flatten = !isUndefined(options) && isTrue(options.flatten);
	      return flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
	    }

	    get name() {
	      // in browsers that do not support shadow dom, slot's name attribute is not reflective
	      const name = getAttribute.call(this, 'name');
	      return isNull(name) ? '' : name;
	    }

	    get childNodes() {
	      const owner = getNodeOwner(this);
	      const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
	      return createStaticNodeList(childNodes);
	    }

	    get children() {
	      // We cannot patch `children` in test mode
	      // because JSDOM uses children for its "native"
	      // querySelector implementation. If we patch this,
	      // HTMLElement.prototype.querySelector.call(element) will not
	      // return any elements from shadow, which is not what we want
	      if (process.env.NODE_ENV === 'test') {
	        return childrenGetter.call(this);
	      }

	      const owner = getNodeOwner(this);
	      const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
	      return createStaticHTMLCollection(ArrayFilter.call(childNodes, node => node instanceof Element));
	    }

	  };
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function getNodeOwner(node) {
	  if (!(node instanceof Node)) {
	    return null;
	  }

	  const ownerKey = getNodeNearestOwnerKey(node);

	  if (isUndefined(ownerKey)) {
	    return null;
	  } // At this point, node is a valid node with owner identity, now we need to find the owner node
	  // search for a custom element with a VM that owns the first element with owner identity attached to it


	  while (!isNull(node) && getNodeKey(node) !== ownerKey) {
	    node = parentNodeGetter.call(node);
	  }

	  if (isNull(node)) {
	    return null;
	  }

	  return node;
	}

	function isSlotElement(elm) {
	  return tagNameGetter.call(elm) === 'SLOT';
	}

	function isNodeOwnedBy(owner, node) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(owner instanceof HTMLElement, `isNodeOwnedBy() should be called with an element as the first argument instead of ${owner}`);
	    assert.invariant(node instanceof Node, `isNodeOwnedBy() should be called with a node as the second argument instead of ${node}`);
	    assert.isTrue(compareDocumentPosition.call(node, owner) & DOCUMENT_POSITION_CONTAINS, `isNodeOwnedBy() should never be called with a node that is not a child node of ${owner}`);
	  }

	  const ownerKey = getNodeNearestOwnerKey(node);
	  return isUndefined(ownerKey) || getNodeKey(owner) === ownerKey;
	}

	function isNodeSlotted(host, node) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(host instanceof HTMLElement, `isNodeSlotted() should be called with a host as the first argument instead of ${host}`);
	    assert.invariant(node instanceof Node, `isNodeSlotted() should be called with a node as the second argument instead of ${node}`);
	    assert.isTrue(compareDocumentPosition.call(node, host) & DOCUMENT_POSITION_CONTAINS, `isNodeSlotted() should never be called with a node that is not a child node of ${host}`);
	  }

	  const hostKey = getNodeKey(host); // just in case the provided node is not an element

	  let currentElement = node instanceof Element ? node : parentElementGetter.call(node);

	  while (!isNull(currentElement) && currentElement !== host) {
	    const elmOwnerKey = getNodeNearestOwnerKey(currentElement);
	    const parent = parentElementGetter.call(currentElement);

	    if (elmOwnerKey === hostKey) {
	      // we have reached a host's node element, and only if
	      // that element is an slot, then the node is considered slotted
	      return isSlotElement(currentElement);
	    } else if (parent !== host && getNodeNearestOwnerKey(parent) !== elmOwnerKey) {
	      // we are crossing a boundary of some sort since the elm and its parent
	      // have different owner key. for slotted elements, this is only possible
	      // if the parent happens to be a slot that is not owned by the host
	      if (!isSlotElement(parent)) {
	        return false;
	      }
	    }

	    currentElement = parent;
	  }

	  return false;
	}

	function shadowRootChildNodes(root) {
	  const elm = getHost(root);
	  return getAllMatches(elm, childNodesGetter.call(elm));
	}

	function getAllMatches(owner, nodeList) {
	  const filteredAndPatched = [];

	  for (let i = 0, len = nodeList.length; i < len; i += 1) {
	    const node = nodeList[i];
	    const isOwned = isNodeOwnedBy(owner, node);

	    if (isOwned) {
	      // Patch querySelector, querySelectorAll, etc
	      // if element is owned by VM
	      ArrayPush.call(filteredAndPatched, node);
	    }
	  }

	  return filteredAndPatched;
	}

	function getRoot(node) {
	  const ownerNode = getNodeOwner(node);

	  if (isNull(ownerNode)) {
	    // we hit a wall, is not in lwc boundary.
	    return getShadowIncludingRoot(node);
	  } // @ts-ignore: Attributes property is removed from Node (https://developer.mozilla.org/en-US/docs/Web/API/Node)


	  return getShadowRoot(ownerNode);
	}

	function getShadowIncludingRoot(node) {
	  let nodeParent;

	  while (!isNull(nodeParent = parentNodeGetter.call(node))) {
	    node = nodeParent;
	  }

	  return node;
	}
	/**
	 * Dummy implementation of the Node.prototype.getRootNode.
	 * Spec: https://dom.spec.whatwg.org/#dom-node-getrootnode
	 *
	 * TODO: Once we start using the real shadowDOM, this method should be replaced by:
	 * const { getRootNode } = Node.prototype;
	 */


	function getRootNodeGetter(options) {
	  const composed = isUndefined(options) ? false : !!options.composed;
	  return isTrue(composed) ? getShadowIncludingRoot(this) : getRoot(this);
	}

	function getFirstMatch(owner, nodeList) {
	  for (let i = 0, len = nodeList.length; i < len; i += 1) {
	    if (isNodeOwnedBy(owner, nodeList[i])) {
	      return nodeList[i];
	    }
	  }

	  return null;
	}

	function getAllSlottedMatches(host, nodeList) {
	  const filteredAndPatched = [];

	  for (let i = 0, len = nodeList.length; i < len; i += 1) {
	    const node = nodeList[i];

	    if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
	      ArrayPush.call(filteredAndPatched, node);
	    }
	  }

	  return filteredAndPatched;
	}

	function getFirstSlottedMatch(host, nodeList) {
	  for (let i = 0, len = nodeList.length; i < len; i += 1) {
	    const node = nodeList[i];

	    if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
	      return node;
	    }
	  }

	  return null;
	}

	function lightDomQuerySelectorAll(elm, selectors) {
	  const owner = getNodeOwner(elm);

	  if (isNull(owner)) {
	    return [];
	  }

	  const nodeList = querySelectorAll.call(elm, selectors);

	  if (getNodeKey(elm)) {
	    // it is a custom element, and we should then filter by slotted elements
	    return getAllSlottedMatches(elm, nodeList);
	  } else {
	    // regular element, we should then filter by ownership
	    return getAllMatches(owner, nodeList);
	  }
	}

	function lightDomQuerySelector(elm, selector) {
	  const owner = getNodeOwner(elm);

	  if (isNull(owner)) {
	    // the it is a root, and those can't have a lightdom
	    return null;
	  }

	  const nodeList = querySelectorAll.call(elm, selector);

	  if (getNodeKey(elm)) {
	    // it is a custom element, and we should then filter by slotted elements
	    return getFirstSlottedMatch(elm, nodeList);
	  } else {
	    // regular element, we should then filter by ownership
	    return getFirstMatch(owner, nodeList);
	  }
	}

	function shadowRootQuerySelector(root, selector) {
	  const elm = getHost(root);
	  const nodeList = querySelectorAll.call(elm, selector);
	  return getFirstMatch(elm, nodeList);
	}

	function shadowRootQuerySelectorAll(root, selector) {
	  const elm = getHost(root);
	  const nodeList = querySelectorAll.call(elm, selector);
	  return getAllMatches(elm, nodeList);
	}

	function getFilteredChildNodes(node) {
	  let children;

	  if (!isUndefined(getNodeKey(node))) {
	    // node itself is a custom element
	    // lwc element, in which case we need to get only the nodes
	    // that were slotted
	    const slots = querySelectorAll.call(node, 'slot');
	    children = ArrayReduce.call(slots, (seed, slot) => {
	      if (isNodeOwnedBy(node, slot)) {
	        ArrayPush.apply(seed, getFilteredSlotAssignedNodes(slot));
	      }

	      return seed;
	    }, []);
	  } else {
	    // regular element
	    children = childNodesGetter.call(node);
	  }

	  const owner = getNodeOwner(node);

	  if (isNull(owner)) {
	    return [];
	  }

	  return ArrayReduce.call(children, (seed, child) => {
	    if (isNodeOwnedBy(owner, child)) {
	      ArrayPush.call(seed, child);
	    }

	    return seed;
	  }, []);
	}

	function PatchedElement(elm) {
	  const Ctor = PatchedNode(elm); // @ts-ignore type-mismatch

	  return class PatchedHTMLElement extends Ctor {
	    querySelector(selector) {
	      return lightDomQuerySelector(this, selector);
	    }

	    querySelectorAll(selectors) {
	      return createStaticNodeList(lightDomQuerySelectorAll(this, selectors));
	    }

	    get innerHTML() {
	      const {
	        childNodes
	      } = this;
	      let innerHTML = '';

	      for (let i = 0, len = childNodes.length; i < len; i += 1) {
	        innerHTML += getOuterHTML(childNodes[i]);
	      }

	      return innerHTML;
	    }

	    set innerHTML(value) {
	      innerHTMLSetter.call(this, value);
	    }

	    get outerHTML() {
	      return getOuterHTML(this);
	    }

	  };
	}

	function PatchedIframeElement(elm) {
	  const Ctor = PatchedElement(elm);
	  return class PatchedHTMLIframeElement extends Ctor {
	    get contentWindow() {
	      const original = iFrameContentWindowGetter.call(this);

	      if (original) {
	        return wrapIframeWindow(original);
	      }

	      return original;
	    }

	  };
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	var EventListenerContext;

	(function (EventListenerContext) {
	  EventListenerContext[EventListenerContext["CUSTOM_ELEMENT_LISTENER"] = 1] = "CUSTOM_ELEMENT_LISTENER";
	  EventListenerContext[EventListenerContext["SHADOW_ROOT_LISTENER"] = 2] = "SHADOW_ROOT_LISTENER";
	})(EventListenerContext || (EventListenerContext = {}));

	const eventToContextMap = new WeakMap();

	function isChildNode(root, node) {
	  return !!(compareDocumentPosition.call(root, node) & DOCUMENT_POSITION_CONTAINED_BY);
	}

	const GET_ROOT_NODE_CONFIG_FALSE = {
	  composed: false
	};

	function getRootNodeHost(node, options) {
	  let rootNode = getRootNodeGetter.call(node, options); // is SyntheticShadowRootInterface

	  if ('mode' in rootNode && 'delegatesFocus' in rootNode) {
	    rootNode = getHost(rootNode);
	  }

	  return rootNode;
	}

	function patchEvent(event) {
	  if (eventToContextMap.has(event)) {
	    return; // already patched
	  } // not all events implement the relatedTarget getter, that's why we need to extract it from the instance
	  // Note: we can't really use the super here because of issues with the typescript transpilation for accessors


	  const originalRelatedTargetDescriptor = getPropertyDescriptor(event, 'relatedTarget');
	  defineProperties(event, {
	    relatedTarget: {
	      get() {
	        const eventContext = eventToContextMap.get(this);
	        const originalCurrentTarget = eventCurrentTargetGetter.call(this);

	        if (isUndefined(originalRelatedTargetDescriptor)) {
	          return undefined;
	        }

	        const relatedTarget = originalRelatedTargetDescriptor.get.call(this);

	        if (isNull(relatedTarget)) {
	          return null;
	        }

	        const currentTarget = eventContext === EventListenerContext.SHADOW_ROOT_LISTENER ? getShadowRoot(originalCurrentTarget) : originalCurrentTarget;
	        return retarget(currentTarget, pathComposer(relatedTarget, true));
	      },

	      enumerable: true,
	      configurable: true
	    },
	    target: {
	      get() {
	        const originalCurrentTarget = eventCurrentTargetGetter.call(this);
	        const originalTarget = eventTargetGetter.call(this);
	        const composedPath = pathComposer(originalTarget, this.composed); // Handle cases where the currentTarget is null (for async events),
	        // and when an event has been added to Window

	        if (!(originalCurrentTarget instanceof Node)) {
	          return retarget(document, composedPath);
	        }

	        const eventContext = eventToContextMap.get(this);
	        const currentTarget = eventContext === EventListenerContext.SHADOW_ROOT_LISTENER ? getShadowRoot(originalCurrentTarget) : originalCurrentTarget;
	        return retarget(currentTarget, composedPath);
	      },

	      enumerable: true,
	      configurable: true
	    }
	  });
	  eventToContextMap.set(event, 0);
	}

	const customElementToWrappedListeners = new WeakMap();

	function getEventMap(elm) {
	  let listenerInfo = customElementToWrappedListeners.get(elm);

	  if (isUndefined(listenerInfo)) {
	    listenerInfo = create(null);
	    customElementToWrappedListeners.set(elm, listenerInfo);
	  }

	  return listenerInfo;
	}

	const shadowRootEventListenerMap = new WeakMap();

	function getWrappedShadowRootListener(sr, listener) {
	  if (!isFunction(listener)) {
	    throw new TypeError(); // avoiding problems with non-valid listeners
	  }

	  let shadowRootWrappedListener = shadowRootEventListenerMap.get(listener);

	  if (isUndefined(shadowRootWrappedListener)) {
	    shadowRootWrappedListener = function (event) {
	      // * if the event is dispatched directly on the host, it is not observable from root
	      // * if the event is dispatched in an element that does not belongs to the shadow and it is not composed,
	      //   it is not observable from the root
	      const {
	        composed
	      } = event;
	      const target = eventTargetGetter.call(event);
	      const currentTarget = eventCurrentTargetGetter.call(event);

	      if (target !== currentTarget) {
	        const rootNode = getRootNodeHost(target, {
	          composed
	        });

	        if (isChildNode(rootNode, currentTarget) || composed === false && rootNode === currentTarget) {
	          listener.call(sr, event);
	        }
	      }
	    };

	    shadowRootWrappedListener.placement = EventListenerContext.SHADOW_ROOT_LISTENER;

	    if (process.env.NODE_ENV !== 'production') {
	      shadowRootWrappedListener.original = listener; // for logging purposes
	    }

	    shadowRootEventListenerMap.set(listener, shadowRootWrappedListener);
	  }

	  return shadowRootWrappedListener;
	}

	const customElementEventListenerMap = new WeakMap();

	function getWrappedCustomElementListener(elm, listener) {
	  if (!isFunction(listener)) {
	    throw new TypeError(); // avoiding problems with non-valid listeners
	  }

	  let customElementWrappedListener = customElementEventListenerMap.get(listener);

	  if (isUndefined(customElementWrappedListener)) {
	    customElementWrappedListener = function (event) {
	      if (isValidEventForCustomElement(event)) {
	        // all handlers on the custom element should be called with undefined 'this'
	        listener.call(elm, event);
	      }
	    };

	    customElementWrappedListener.placement = EventListenerContext.CUSTOM_ELEMENT_LISTENER;

	    if (process.env.NODE_ENV !== 'production') {
	      customElementWrappedListener.original = listener; // for logging purposes
	    }

	    customElementEventListenerMap.set(listener, customElementWrappedListener);
	  }

	  return customElementWrappedListener;
	}

	function domListener(evt) {
	  let immediatePropagationStopped = false;
	  let propagationStopped = false;
	  const {
	    type,
	    stopImmediatePropagation,
	    stopPropagation
	  } = evt;
	  const currentTarget = eventCurrentTargetGetter.call(evt);
	  const listenerMap = getEventMap(currentTarget);
	  const listeners = listenerMap[type]; // it must have listeners at this point

	  defineProperty(evt, 'stopImmediatePropagation', {
	    value() {
	      immediatePropagationStopped = true;
	      stopImmediatePropagation.call(evt);
	    },

	    writable: true,
	    enumerable: true,
	    configurable: true
	  });
	  defineProperty(evt, 'stopPropagation', {
	    value() {
	      propagationStopped = true;
	      stopPropagation.call(evt);
	    },

	    writable: true,
	    enumerable: true,
	    configurable: true
	  });
	  patchEvent(evt); // in case a listener adds or removes other listeners during invocation

	  const bookkeeping = ArraySlice.call(listeners);

	  function invokeListenersByPlacement(placement) {
	    forEach.call(bookkeeping, listener => {
	      if (isFalse(immediatePropagationStopped) && listener.placement === placement) {
	        // making sure that the listener was not removed from the original listener queue
	        if (ArrayIndexOf.call(listeners, listener) !== -1) {
	          // all handlers on the custom element should be called with undefined 'this'
	          listener.call(undefined, evt);
	        }
	      }
	    });
	  }

	  eventToContextMap.set(evt, EventListenerContext.SHADOW_ROOT_LISTENER);
	  invokeListenersByPlacement(EventListenerContext.SHADOW_ROOT_LISTENER);

	  if (isFalse(immediatePropagationStopped) && isFalse(propagationStopped)) {
	    // doing the second iteration only if the first one didn't interrupt the event propagation
	    eventToContextMap.set(evt, EventListenerContext.CUSTOM_ELEMENT_LISTENER);
	    invokeListenersByPlacement(EventListenerContext.CUSTOM_ELEMENT_LISTENER);
	  }

	  eventToContextMap.set(evt, 0);
	}

	function attachDOMListener(elm, type, wrappedListener) {
	  const listenerMap = getEventMap(elm);
	  let cmpEventHandlers = listenerMap[type];

	  if (isUndefined(cmpEventHandlers)) {
	    cmpEventHandlers = listenerMap[type] = [];
	  } // only add to DOM if there is no other listener on the same placement yet


	  if (cmpEventHandlers.length === 0) {
	    addEventListener.call(elm, type, domListener);
	  } else if (process.env.NODE_ENV !== 'production') {
	    if (ArrayIndexOf.call(cmpEventHandlers, wrappedListener) !== -1) {
	      assert.logWarning(`${toString(elm)} has duplicate listener for event "${type}". Instead add the event listener in the connectedCallback() hook.`, elm);
	    }
	  }

	  ArrayPush.call(cmpEventHandlers, wrappedListener);
	}

	function detachDOMListener(elm, type, wrappedListener) {
	  const listenerMap = getEventMap(elm);
	  let p;
	  let listeners;

	  if (!isUndefined(listeners = listenerMap[type]) && (p = ArrayIndexOf.call(listeners, wrappedListener)) !== -1) {
	    ArraySplice.call(listeners, p, 1); // only remove from DOM if there is no other listener on the same placement

	    if (listeners.length === 0) {
	      removeEventListener.call(elm, type, domListener);
	    }
	  } else if (process.env.NODE_ENV !== 'production') {
	    assert.logError(`Did not find event listener for event "${type}" executing removeEventListener on ${toString(elm)}. This is probably a typo or a life cycle mismatch. Make sure that you add the right event listeners in the connectedCallback() hook and remove them in the disconnectedCallback() hook.`, elm);
	  }
	}

	function isValidEventForCustomElement(event) {
	  const target = eventTargetGetter.call(event);
	  const currentTarget = eventCurrentTargetGetter.call(event);
	  const {
	    composed
	  } = event;
	  return (// it is composed, and we should always get it, or
	    composed === true || // it is dispatched onto the custom element directly, or
	    target === currentTarget || // it is coming from a slotted element
	    isChildNode(getRootNodeHost(target, GET_ROOT_NODE_CONFIG_FALSE), currentTarget)
	  );
	}

	function addCustomElementEventListener(elm, type, listener, options) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(isFunction(listener), `Invalid second argument for this.template.addEventListener() in ${toString(elm)} for event "${type}". Expected an EventListener but received ${listener}.`); // TODO: issue #420
	    // this is triggered when the component author attempts to add a listener programmatically into a lighting element node

	    if (!isUndefined(options)) {
	      assert.logWarning(`The 'addEventListener' method in 'LightningElement' does not support more than 2 arguments. Options to make the listener passive, once, or capture are not allowed but received: ${toString(options)}`, elm);
	    }
	  }

	  const wrappedListener = getWrappedCustomElementListener(elm, listener);
	  attachDOMListener(elm, type, wrappedListener);
	}

	function removeCustomElementEventListener(elm, type, listener, options) {
	  const wrappedListener = getWrappedCustomElementListener(elm, listener);
	  detachDOMListener(elm, type, wrappedListener);
	}

	function addShadowRootEventListener(sr, type, listener, options) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(isFunction(listener), `Invalid second argument for this.template.addEventListener() in ${toString(sr)} for event "${type}". Expected an EventListener but received ${listener}.`); // TODO: issue #420
	    // this is triggered when the component author attempts to add a listener programmatically into its Component's shadow root

	    if (!isUndefined(options)) {
	      assert.logWarning(`The 'addEventListener' method in 'ShadowRoot' does not support more than 2 arguments. Options to make the listener passive, once, or capture are not allowed but received: ${toString(options)}`, getHost(sr));
	    }
	  }

	  const elm = getHost(sr);
	  const wrappedListener = getWrappedShadowRootListener(sr, listener);
	  attachDOMListener(elm, type, wrappedListener);
	}

	function removeShadowRootEventListener(sr, type, listener, options) {
	  const elm = getHost(sr);
	  const wrappedListener = getWrappedShadowRootListener(sr, listener);
	  detachDOMListener(elm, type, wrappedListener);
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const TabbableElementsQuery = `
    button:not([tabindex="-1"]):not([disabled]),
    [contenteditable]:not([tabindex="-1"]),
    video[controls]:not([tabindex="-1"]),
    audio[controls]:not([tabindex="-1"]),
    [href]:not([tabindex="-1"]),
    input:not([tabindex="-1"]):not([disabled]),
    select:not([tabindex="-1"]):not([disabled]),
    textarea:not([tabindex="-1"]):not([disabled]),
    [tabindex="0"]
`;

	function isVisible(element) {
	  const {
	    width,
	    height
	  } = getBoundingClientRect.call(element);
	  const noZeroSize = width > 0 || height > 0;
	  return noZeroSize && getComputedStyle(element).visibility !== 'hidden';
	}

	function hasFocusableTabIndex(element) {
	  if (isFalse(hasAttribute.call(element, 'tabindex'))) {
	    return false;
	  }

	  const value = getAttribute.call(element, 'tabindex'); // Really, any numeric tabindex value is valid
	  // But LWC only allows 0 or -1, so we can just check against that.
	  // The main point here is to make sure the tabindex attribute is not an invalid
	  // value like tabindex="hello"

	  if (value === '' || value !== '0' && value !== '-1') {
	    return false;
	  }

	  return true;
	} // This function based on https://allyjs.io/data-tables/focusable.html
	// It won't catch everything, but should be good enough
	// There are a lot of edge cases here that we can't realistically handle
	// Determines if a particular element is tabbable, as opposed to simply focusable
	// Exported for jest purposes


	function isTabbable(element) {
	  return matches.call(element, TabbableElementsQuery) && isVisible(element);
	}

	const focusableTagNames = {
	  IFRAME: 1,
	  VIDEO: 1,
	  AUDIO: 1,
	  A: 1,
	  INPUT: 1,
	  SELECT: 1,
	  TEXTAREA: 1,
	  BUTTON: 1
	}; // This function based on https://allyjs.io/data-tables/focusable.html
	// It won't catch everything, but should be good enough
	// There are a lot of edge cases here that we can't realistically handle
	// Exported for jest purposes

	function isFocusable(element) {
	  const tagName = tagNameGetter.call(element);
	  return isVisible(element) && (hasFocusableTabIndex(element) || hasAttribute.call(element, 'contenteditable') || hasOwnProperty.call(focusableTagNames, tagName));
	}

	function getFirstTabbableMatch(elements) {
	  for (let i = 0, len = elements.length; i < len; i += 1) {
	    const elm = elements[i];

	    if (isTabbable(elm)) {
	      return elm;
	    }
	  }

	  return null;
	}

	function getLastTabbableMatch(elements) {
	  for (let i = elements.length - 1; i >= 0; i -= 1) {
	    const elm = elements[i];

	    if (isTabbable(elm)) {
	      return elm;
	    }
	  }

	  return null;
	}

	function getTabbableSegments(host) {
	  const all = querySelectorAll$1.call(document, TabbableElementsQuery);
	  const inner = querySelectorAll.call(host, TabbableElementsQuery);

	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(tabIndexGetter.call(host) === -1 || isDelegatingFocus(host), `The focusin event is only relevant when the tabIndex property is -1 on the host.`);
	  }

	  const firstChild = inner[0];
	  const lastChild = inner[inner.length - 1];
	  const hostIndex = ArrayIndexOf.call(all, host); // Host element can show up in our "previous" section if its tabindex is 0
	  // We want to filter that out here

	  const firstChildIndex = hostIndex > -1 ? hostIndex : ArrayIndexOf.call(all, firstChild); // Account for an empty inner list

	  const lastChildIndex = inner.length === 0 ? firstChildIndex + 1 : ArrayIndexOf.call(all, lastChild) + 1;
	  const prev = ArraySlice.call(all, 0, firstChildIndex);
	  const next = ArraySlice.call(all, lastChildIndex);
	  return {
	    prev,
	    inner,
	    next
	  };
	}

	function getActiveElement(host) {
	  const activeElement = DocumentPrototypeActiveElement.call(document);

	  if (isNull(activeElement)) {
	    return activeElement;
	  } // activeElement must be child of the host and owned by it


	  return (compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 ? activeElement : null;
	}

	function relatedTargetPosition(host, relatedTarget) {
	  // assert: target must be child of host
	  const pos = compareDocumentPosition.call(host, relatedTarget);

	  if (pos & DOCUMENT_POSITION_CONTAINED_BY) {
	    // focus remains inside the host
	    return 0;
	  } else if (pos & DOCUMENT_POSITION_PRECEDING) {
	    // focus is coming from above
	    return 1;
	  } else if (pos & DOCUMENT_POSITION_FOLLOWING) {
	    // focus is coming from below
	    return 2;
	  } // we don't know what's going on.


	  return -1;
	}

	function getPreviousTabbableElement(segments) {
	  const {
	    prev
	  } = segments;
	  return getFirstTabbableMatch(ArrayReverse.call(prev));
	}

	function getNextTabbableElement(segments) {
	  const {
	    next
	  } = segments;
	  return getFirstTabbableMatch(next);
	}

	function focusOnNextOrBlur(focusEventTarget, segments) {
	  const nextNode = getNextTabbableElement(segments);

	  if (isNull(nextNode)) {
	    // nothing to focus on, blur to invalidate the operation
	    focusEventTarget.blur();
	    return;
	  }

	  nextNode.focus();
	}

	function focusOnPrevOrBlur(focusEventTarget, segments) {
	  const prevNode = getPreviousTabbableElement(segments);

	  if (isNull(prevNode)) {
	    // nothing to focus on, blur to invalidate the operation
	    focusEventTarget.blur();
	    return;
	  }

	  prevNode.focus();
	}

	function isFirstTabbableChild(target, segments) {
	  return getFirstTabbableMatch(segments.inner) === target;
	}

	function isLastTabbableChild(target, segments) {
	  return getLastTabbableMatch(segments.inner) === target;
	}

	function keyboardFocusHandler(event) {
	  const host = eventCurrentTargetGetter.call(event);
	  const target = eventTargetGetter.call(event); // Ideally, we would be able to use a "focus" event that doesn't bubble
	  // but, IE11 doesn't support relatedTarget on focus events so we have to use
	  // focusin instead. The logic below is predicated on non-bubbling events
	  // So, if currentTarget(host) ir not target, we know that the event is bubbling
	  // and we escape because focus occured on something below the host.

	  if (host !== target) {
	    return;
	  }

	  const relatedTarget = focusEventRelatedTargetGetter.call(event);

	  if (isNull(relatedTarget)) {
	    return;
	  }

	  const segments = getTabbableSegments(host);
	  const position = relatedTargetPosition(host, relatedTarget);

	  if (position === 1) {
	    // probably tabbing into element
	    const first = getFirstTabbableMatch(segments.inner);

	    if (!isNull(first)) {
	      first.focus();
	    } else {
	      focusOnNextOrBlur(target, segments);
	    }

	    return;
	  } else if (host === target) {
	    // Shift tabbed back to the host
	    focusOnPrevOrBlur(host, segments);
	  }
	} // focusin handler for custom elements
	// This handler should only be called when a user
	// focuses on either the custom element, or an internal element
	// via keyboard navigation (tab or shift+tab)
	// Focusing via mouse should be disqualified before this gets called


	function keyboardFocusInHandler(event) {
	  const host = eventCurrentTargetGetter.call(event);
	  const target = eventTargetGetter.call(event);
	  const relatedTarget = focusEventRelatedTargetGetter.call(event);
	  const segments = getTabbableSegments(host);
	  const isFirstFocusableChildReceivingFocus = isFirstTabbableChild(target, segments);
	  const isLastFocusableChildReceivingFocus = isLastTabbableChild(target, segments);

	  if ( // If we receive a focusin event that is not focusing on the first or last
	  // element inside of a shadow, we can assume that the user is tabbing between
	  // elements inside of the custom element shadow, so we do nothing
	  isFalse(isFirstFocusableChildReceivingFocus) && isFalse(isLastFocusableChildReceivingFocus) || // If related target is null, user is probably tabbing into the document from the browser chrome (location bar?)
	  // If relatedTarget is null, we can't do much here because we don't know what direction the user is tabbing
	  // This is a bit of an edge case, and only comes up if the custom element is the very first or very last
	  // tabbable element in a document
	  isNull(relatedTarget)) {
	    return;
	  } // Determine where the focus is coming from (Tab or Shift+Tab)


	  const post = relatedTargetPosition(host, relatedTarget);

	  switch (post) {
	    case 1:
	      // focus is probably coming from above
	      if (isFirstFocusableChildReceivingFocus && relatedTarget === getPreviousTabbableElement(segments)) {
	        // the focus was on the immediate focusable elements from above,
	        // it is almost certain that the focus is due to tab keypress
	        focusOnNextOrBlur(target, segments);
	      }

	      break;

	    case 2:
	      // focus is probably coming from below
	      if (isLastFocusableChildReceivingFocus && relatedTarget === getNextTabbableElement(segments)) {
	        // the focus was on the immediate focusable elements from above,
	        // it is almost certain that the focus is due to tab keypress
	        focusOnPrevOrBlur(target, segments);
	      }

	      break;
	  }
	}

	function willTriggerFocusInEvent(target) {
	  return target !== DocumentPrototypeActiveElement.call(document) && // if the element is currently active, it will not fire a focusin event
	  isFocusable(target);
	}

	function stopFocusIn(evt) {
	  const currentTarget = eventCurrentTargetGetter.call(evt);
	  removeEventListener.call(currentTarget, 'focusin', keyboardFocusInHandler);
	  setTimeout(() => {
	    // only reinstate the focus if the tabindex is still -1
	    if (tabIndexGetter.call(currentTarget) === -1) {
	      addEventListener.call(currentTarget, 'focusin', keyboardFocusInHandler);
	    }
	  }, 0);
	}

	function handleFocusMouseDown(evt) {
	  const target = eventTargetGetter.call(evt); // If we are mouse down in an element that can be focused
	  // and the currentTarget's activeElement is not element we are mouse-ing down in
	  // We can bail out and let the browser do its thing.

	  if (willTriggerFocusInEvent(target)) {
	    addEventListener.call(eventCurrentTargetGetter.call(evt), 'focusin', stopFocusIn, true);
	  }
	}

	function handleFocus(elm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(isDelegatingFocus(elm), `Invalid attempt to handle focus event for ${toString(elm)}. ${toString(elm)} should have delegates focus true, but is not delegating focus`);
	  } // Unbind any focusin listeners we may have going on


	  ignoreFocusIn(elm);
	  addEventListener.call(elm, 'focusin', keyboardFocusHandler, true);
	}

	function ignoreFocus(elm) {
	  removeEventListener.call(elm, 'focusin', keyboardFocusHandler, true);
	}

	function handleFocusIn(elm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(tabIndexGetter.call(elm) === -1, `Invalid attempt to handle focus in  ${toString(elm)}. ${toString(elm)} should have tabIndex -1, but has tabIndex ${tabIndexGetter.call(elm)}`);
	  } // Unbind any focus listeners we may have going on


	  ignoreFocus(elm); // We want to listen for mousedown
	  // If the user is triggering a mousedown event on an element
	  // That can trigger a focus event, then we need to opt out
	  // of our tabindex -1 dance. The tabindex -1 only applies for keyboard navigation

	  addEventListener.call(elm, 'mousedown', handleFocusMouseDown, true); // This focusin listener is to catch focusin events from keyboard interactions
	  // A better solution would perhaps be to listen for keydown events, but
	  // the keydown event happens on whatever element already has focus (or no element
	  // at all in the case of the location bar. So, instead we have to assume that focusin
	  // without a mousedown means keyboard navigation

	  addEventListener.call(elm, 'focusin', keyboardFocusInHandler);
	}

	function ignoreFocusIn(elm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(tabIndexGetter.call(elm) !== -1, `Invalid attempt to ignore focus in  ${toString(elm)}. ${toString(elm)} should not have tabIndex -1`);
	  }

	  removeEventListener.call(elm, 'focusin', keyboardFocusInHandler);
	  removeEventListener.call(elm, 'mousedown', handleFocusMouseDown, true);
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function PatchedCustomElement(Base) {
	  const Ctor = PatchedElement(Base);
	  return class PatchedHTMLElement extends Ctor {
	    attachShadow(options) {
	      return attachShadow(this, options);
	    }

	    addEventListener(type, listener, options) {
	      addCustomElementEventListener(this, type, listener, options);
	    }

	    removeEventListener(type, listener, options) {
	      removeCustomElementEventListener(this, type, listener, options);
	    }

	    get shadowRoot() {
	      const shadow = getShadowRoot(this);

	      if (shadow.mode === ShadowRootMode.OPEN) {
	        return shadow;
	      }

	      return null;
	    }

	    get tabIndex() {
	      if (isDelegatingFocus(this) && isFalse(hasAttribute.call(this, 'tabindex'))) {
	        // this cover the case where the default tabindex should be 0 because the
	        // custom element is delegating its focus
	        return 0;
	      } // NOTE: Technically this should be `super.tabIndex` however Typescript
	      // has a known bug while transpiling down to ES5
	      // https://github.com/Microsoft/TypeScript/issues/338


	      const descriptor = getPropertyDescriptor(Ctor.prototype, 'tabIndex');
	      return descriptor.get.call(this);
	    }

	    set tabIndex(value) {
	      // get the original value from the element before changing it, just in case
	      // the custom element is doing something funky. we only really care about
	      // the actual changes in the DOM.
	      const hasAttr = hasAttribute.call(this, 'tabindex');
	      const originalValue = tabIndexGetter.call(this); // run the super logic, which bridges the setter to the component
	      // NOTE: Technically this should be `super.tabIndex` however Typescript
	      // has a known bug while transpiling down to ES5
	      // https://github.com/Microsoft/TypeScript/issues/338

	      const descriptor = getPropertyDescriptor(Ctor.prototype, 'tabIndex');
	      descriptor.set.call(this, value); // Check if the value from the dom has changed

	      const newValue = tabIndexGetter.call(this);

	      if (!hasAttr || originalValue !== newValue) {
	        // Value has changed
	        if (newValue === -1) {
	          // add the magic to skip this element
	          handleFocusIn(this);
	        } else if (newValue === 0 && isDelegatingFocus(this)) {
	          // Listen for focus if the new tabIndex is 0, and we are delegating focus
	          handleFocus(this);
	        } else {
	          // TabIndex is set to 0, but we aren't delegating focus, so we can ignore everything
	          ignoreFocusIn(this);
	          ignoreFocus(this);
	        }
	      } else if (originalValue === -1) {
	        // remove the magic
	        ignoreFocusIn(this);
	        ignoreFocus(this);
	      }
	    }

	    blur() {
	      if (isDelegatingFocus(this)) {
	        const currentActiveElement = getActiveElement(this);

	        if (!isNull(currentActiveElement)) {
	          // if there is an active element, blur it
	          currentActiveElement.blur();
	          return;
	        }
	      }

	      super.blur();
	    }

	    get childNodes() {
	      const owner = getNodeOwner(this);
	      const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
	      return createStaticNodeList(childNodes);
	    }

	    get children() {
	      // We cannot patch `children` in test mode
	      // because JSDOM uses children for its "native"
	      // querySelector implementation. If we patch this,
	      // HTMLElement.prototype.querySelector.call(element) will not
	      // return any elements from shadow, which is not what we want
	      if (process.env.NODE_ENV === 'test') {
	        return childrenGetter.call(this);
	      }

	      const owner = getNodeOwner(this);
	      const childNodes = isNull(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
	      return createStaticHTMLCollection(ArrayFilter.call(childNodes, node => node instanceof Element));
	    }

	  };
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	/**
	@license
	Copyright (c) 2015 Simon Friis Vindum.
	This code may only be used under the MIT License found at
	https://github.com/snabbdom/snabbdom/blob/master/LICENSE
	Code distributed by Snabbdom as part of the Snabbdom project at
	https://github.com/snabbdom/snabbdom/
	*/


	function isUndef(s) {
	  return s === undefined;
	}

	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}

	function isVNode(vnode) {
	  return vnode != null;
	}

	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  const map = {};
	  let j, key, ch; // TODO: simplify this by assuming that all vnodes has keys

	  for (j = beginIdx; j <= endIdx; ++j) {
	    ch = children[j];

	    if (isVNode(ch)) {
	      key = ch.key;

	      if (key !== undefined) {
	        map[key] = j;
	      }
	    }
	  }

	  return map;
	}

	function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
	  for (; startIdx <= endIdx; ++startIdx) {
	    const ch = vnodes[startIdx];

	    if (isVNode(ch)) {
	      ch.hook.create(ch);
	      ch.hook.insert(ch, parentElm, before);
	    }
	  }
	}

	function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	  for (; startIdx <= endIdx; ++startIdx) {
	    const ch = vnodes[startIdx]; // text nodes do not have logic associated to them

	    if (isVNode(ch)) {
	      ch.hook.remove(ch, parentElm);
	    }
	  }
	}

	function updateDynamicChildren(parentElm, oldCh, newCh) {
	  let oldStartIdx = 0;
	  let newStartIdx = 0;
	  let oldEndIdx = oldCh.length - 1;
	  let oldStartVnode = oldCh[0];
	  let oldEndVnode = oldCh[oldEndIdx];
	  let newEndIdx = newCh.length - 1;
	  let newStartVnode = newCh[0];
	  let newEndVnode = newCh[newEndIdx];
	  let oldKeyToIdx;
	  let idxInOld;
	  let elmToMove;
	  let before;

	  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	    if (!isVNode(oldStartVnode)) {
	      oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
	    } else if (!isVNode(oldEndVnode)) {
	      oldEndVnode = oldCh[--oldEndIdx];
	    } else if (!isVNode(newStartVnode)) {
	      newStartVnode = newCh[++newStartIdx];
	    } else if (!isVNode(newEndVnode)) {
	      newEndVnode = newCh[--newEndIdx];
	    } else if (sameVnode(oldStartVnode, newStartVnode)) {
	      patchVnode(oldStartVnode, newStartVnode);
	      oldStartVnode = oldCh[++oldStartIdx];
	      newStartVnode = newCh[++newStartIdx];
	    } else if (sameVnode(oldEndVnode, newEndVnode)) {
	      patchVnode(oldEndVnode, newEndVnode);
	      oldEndVnode = oldCh[--oldEndIdx];
	      newEndVnode = newCh[--newEndIdx];
	    } else if (sameVnode(oldStartVnode, newEndVnode)) {
	      // Vnode moved right
	      patchVnode(oldStartVnode, newEndVnode);
	      newEndVnode.hook.move(oldStartVnode, parentElm, // TODO: resolve this, but using dot notation for nextSibling for now
	      oldEndVnode.elm.nextSibling);
	      oldStartVnode = oldCh[++oldStartIdx];
	      newEndVnode = newCh[--newEndIdx];
	    } else if (sameVnode(oldEndVnode, newStartVnode)) {
	      // Vnode moved left
	      patchVnode(oldEndVnode, newStartVnode);
	      newStartVnode.hook.move(oldEndVnode, parentElm, oldStartVnode.elm);
	      oldEndVnode = oldCh[--oldEndIdx];
	      newStartVnode = newCh[++newStartIdx];
	    } else {
	      if (oldKeyToIdx === undefined) {
	        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	      }

	      idxInOld = oldKeyToIdx[newStartVnode.key];

	      if (isUndef(idxInOld)) {
	        // New element
	        newStartVnode.hook.create(newStartVnode);
	        newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        elmToMove = oldCh[idxInOld];

	        if (isVNode(elmToMove)) {
	          if (elmToMove.sel !== newStartVnode.sel) {
	            // New element
	            newStartVnode.hook.create(newStartVnode);
	            newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
	          } else {
	            patchVnode(elmToMove, newStartVnode);
	            oldCh[idxInOld] = undefined;
	            newStartVnode.hook.move(elmToMove, parentElm, oldStartVnode.elm);
	          }
	        }

	        newStartVnode = newCh[++newStartIdx];
	      }
	    }
	  }

	  if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
	    if (oldStartIdx > oldEndIdx) {
	      const n = newCh[newEndIdx + 1];
	      before = isVNode(n) ? n.elm : null;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
	    } else {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }
	}

	function updateStaticChildren(parentElm, oldCh, newCh) {
	  const {
	    length
	  } = newCh;

	  if (oldCh.length === 0) {
	    // the old list is empty, we can directly insert anything new
	    addVnodes(parentElm, null, newCh, 0, length);
	    return;
	  } // if the old list is not empty, the new list MUST have the same
	  // amount of nodes, that's why we call this static children


	  let referenceElm = null;

	  for (let i = length - 1; i >= 0; i -= 1) {
	    const vnode = newCh[i];
	    const oldVNode = oldCh[i];

	    if (vnode !== oldVNode) {
	      if (isVNode(oldVNode)) {
	        if (isVNode(vnode)) {
	          // both vnodes must be equivalent, and se just need to patch them
	          patchVnode(oldVNode, vnode);
	          referenceElm = vnode.elm;
	        } else {
	          // removing the old vnode since the new one is null
	          oldVNode.hook.remove(oldVNode, parentElm);
	        }
	      } else if (isVNode(vnode)) {
	        // this condition is unnecessary
	        vnode.hook.create(vnode); // insert the new node one since the old one is null

	        vnode.hook.insert(vnode, parentElm, referenceElm);
	        referenceElm = vnode.elm;
	      }
	    }
	  }
	}

	function patchVnode(oldVnode, vnode) {
	  if (oldVnode !== vnode) {
	    vnode.elm = oldVnode.elm;
	    vnode.hook.update(oldVnode, vnode);
	  }
	} // Using a WeakMap instead of a WeakSet because this one works in IE11 :(


	const FromIteration = new WeakMap(); // dynamic children means it was generated by an iteration
	// in a template, and will require a more complex diffing algo.

	function markAsDynamicChildren(children) {
	  FromIteration.set(children, 1);
	}

	function hasDynamicChildren(children) {
	  return FromIteration.has(children);
	}

	function patchChildren(host, shadowRoot, oldCh, newCh, isFallback) {
	  if (oldCh !== newCh) {
	    const parentNode = isFallback ? host : shadowRoot;
	    const fn = hasDynamicChildren(newCh) ? updateDynamicChildren : updateStaticChildren;
	    fn(parentNode, oldCh, newCh);
	  }
	}

	let TextNodeProto; // this method is supposed to be invoked when in fallback mode only
	// to patch text nodes generated by a template.

	function patchTextNodeProto(text) {
	  if (isUndefined(TextNodeProto)) {
	    TextNodeProto = PatchedNode(text).prototype;
	  }

	  setPrototypeOf(text, TextNodeProto);
	}

	let CommentNodeProto; // this method is supposed to be invoked when in fallback mode only
	// to patch comment nodes generated by a template.

	function patchCommentNodeProto(comment) {
	  if (isUndefined(CommentNodeProto)) {
	    CommentNodeProto = PatchedNode(comment).prototype;
	  }

	  setPrototypeOf(comment, CommentNodeProto);
	}

	const TagToProtoCache = create(null);

	function getPatchedElementClass(elm) {
	  switch (tagNameGetter.call(elm)) {
	    case 'SLOT':
	      return PatchedSlotElement(elm);

	    case 'IFRAME':
	      return PatchedIframeElement(elm);
	  }

	  return PatchedElement(elm);
	} // this method is supposed to be invoked when in fallback mode only
	// to patch elements generated by a template.


	function patchElementProto(elm, options) {
	  const {
	    sel,
	    isPortal,
	    shadowAttribute
	  } = options;
	  let proto = TagToProtoCache[sel];

	  if (isUndefined(proto)) {
	    proto = TagToProtoCache[sel] = getPatchedElementClass(elm).prototype;
	  }

	  setPrototypeOf(elm, proto);

	  if (isTrue(isPortal)) {
	    markElementAsPortal(elm);
	  }

	  setCSSToken(elm, shadowAttribute);
	}

	function patchCustomElementProto(elm, options) {
	  const {
	    def,
	    shadowAttribute
	  } = options;
	  let patchedBridge = def.patchedBridge;

	  if (isUndefined(patchedBridge)) {
	    patchedBridge = def.patchedBridge = PatchedCustomElement(elm);
	  } // temporary patching the proto, eventually this should be just more nodes in the proto chain


	  setPrototypeOf(elm, patchedBridge.prototype);
	  setCSSToken(elm, shadowAttribute);
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function getNodeRestrictionsDescriptors(node, options) {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  } // getPropertyDescriptor here recursively looks up the prototype chain
	  // and returns the first descriptor for the property


	  const originalTextContentDescriptor = getPropertyDescriptor(node, 'textContent');
	  const originalNodeValueDescriptor = getPropertyDescriptor(node, 'nodeValue');
	  const {
	    appendChild,
	    insertBefore,
	    removeChild,
	    replaceChild
	  } = node;
	  return {
	    appendChild: {
	      value(aChild) {
	        if (this instanceof Element && options.isPortal !== true) {
	          assert.logError(`appendChild is disallowed in Element unless \`lwc:dom="manual"\` directive is used in the template.`, this);
	        }

	        return appendChild.call(this, aChild);
	      },

	      enumerable: false,
	      writable: false,
	      configurable: true
	    },
	    insertBefore: {
	      value(newNode, referenceNode) {
	        if (this instanceof Element && options.isPortal !== true) {
	          assert.logError(`insertBefore is disallowed in Element unless \`lwc:dom="manual"\` directive is used in the template.`, this);
	        }

	        return insertBefore.call(this, newNode, referenceNode);
	      },

	      enumerable: false,
	      writable: false,
	      configurable: true
	    },
	    removeChild: {
	      value(aChild) {
	        if (this instanceof Element && options.isPortal !== true) {
	          assert.logError(`removeChild is disallowed in Element unless \`lwc:dom="manual"\` directive is used in the template.`, this);
	        }

	        return removeChild.call(this, aChild);
	      },

	      enumerable: false,
	      writable: false,
	      configurable: true
	    },
	    replaceChild: {
	      value(newChild, oldChild) {
	        if (this instanceof Element && options.isPortal !== true) {
	          assert.logError(`replaceChild is disallowed in Element unless \`lwc:dom="manual"\` directive is used in the template.`, this);
	        }

	        return replaceChild.call(this, newChild, oldChild);
	      },

	      enumerable: false,
	      writable: false,
	      configurable: true
	    },
	    nodeValue: {
	      get() {
	        return originalNodeValueDescriptor.get.call(this);
	      },

	      set(value) {
	        if (process.env.NODE_ENV !== 'production') {
	          if (this instanceof Element && options.isPortal !== true) {
	            assert.logError(`nodeValue is disallowed in Element unless \`lwc:dom="manual"\` directive is used in the template.`, this);
	          }
	        }

	        originalNodeValueDescriptor.set.call(this, value);
	      }

	    },
	    textContent: {
	      get() {
	        return originalTextContentDescriptor.get.call(this);
	      },

	      set(value) {
	        if (process.env.NODE_ENV !== 'production') {
	          if (this instanceof Element && options.isPortal !== true) {
	            assert.logError(`textContent is disallowed in Element unless \`lwc:dom="manual"\` directive is used in the template.`, this);
	          }
	        }

	        originalTextContentDescriptor.set.call(this, value);
	      }

	    }
	  };
	}

	function getElementRestrictionsDescriptors(elm, options) {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  }

	  const descriptors = getNodeRestrictionsDescriptors(elm, options);
	  const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
	  assign(descriptors, {
	    innerHTML: {
	      get() {
	        return originalInnerHTMLDescriptor.get.call(this);
	      },

	      set(value) {
	        if (process.env.NODE_ENV !== 'production') {
	          if (options.isPortal !== true) {
	            assert.logError(`innerHTML is disallowed in Element unless \`lwc:dom="manual"\` directive is used in the template.`, this);
	          }
	        }

	        return originalInnerHTMLDescriptor.set.call(this, value);
	      },

	      enumerable: true,
	      configurable: true
	    }
	  });
	  return descriptors;
	}

	function getShadowRootRestrictionsDescriptors(sr, options) {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  } // blacklisting properties in dev mode only to avoid people doing the wrong
	  // thing when using the real shadow root, because if that's the case,
	  // the component will not work when running in fallback mode.


	  const originalQuerySelector = sr.querySelector;
	  const originalQuerySelectorAll = sr.querySelectorAll;
	  const originalAddEventListener = sr.addEventListener;
	  const descriptors = getNodeRestrictionsDescriptors(sr, options);
	  assign(descriptors, {
	    addEventListener: {
	      value(type) {
	        assert.invariant(!isRendering, `${vmBeingRendered}.render() method has side effects on the state of ${toString(sr)} by adding an event listener for "${type}".`);
	        return originalAddEventListener.apply(this, arguments);
	      }

	    },
	    querySelector: {
	      value() {
	        const vm = getShadowRootVM(this);
	        assert.isFalse(isBeingConstructed(vm), `this.template.querySelector() cannot be called during the construction of the custom element for ${vm} because no content has been rendered yet.`);
	        return originalQuerySelector.apply(this, arguments);
	      }

	    },
	    querySelectorAll: {
	      value() {
	        const vm = getShadowRootVM(this);
	        assert.isFalse(isBeingConstructed(vm), `this.template.querySelectorAll() cannot be called during the construction of the custom element for ${vm} because no content has been rendered yet.`);
	        return originalQuerySelectorAll.apply(this, arguments);
	      }

	    }
	  });
	  const BlackListedShadowRootMethods = {
	    appendChild: 0,
	    removeChild: 0,
	    replaceChild: 0,
	    cloneNode: 0,
	    insertBefore: 0,
	    getElementById: 0,
	    getSelection: 0,
	    elementsFromPoint: 0
	  };
	  forEach.call(getOwnPropertyNames(BlackListedShadowRootMethods), methodName => {
	    const descriptor = {
	      get() {
	        throw new Error(`Disallowed method "${methodName}" in ShadowRoot.`);
	      }

	    };
	    descriptors[methodName] = descriptor;
	  });
	  return descriptors;
	} // Custom Elements Restrictions:
	// -----------------------------


	function getAttributePatched(attrName) {
	  if (process.env.NODE_ENV !== 'production') {
	    const vm = getCustomElementVM(this);
	    assertAttributeReflectionCapability(vm, attrName);
	  }

	  return getAttribute.apply(this, ArraySlice.call(arguments));
	}

	function setAttributePatched(attrName, newValue) {
	  const vm = getCustomElementVM(this);

	  if (process.env.NODE_ENV !== 'production') {
	    assertAttributeMutationCapability(vm, attrName);
	    assertAttributeReflectionCapability(vm, attrName);
	  }

	  setAttribute.apply(this, ArraySlice.call(arguments));
	}

	function setAttributeNSPatched(attrNameSpace, attrName, newValue) {
	  const vm = getCustomElementVM(this);

	  if (process.env.NODE_ENV !== 'production') {
	    assertAttributeMutationCapability(vm, attrName);
	    assertAttributeReflectionCapability(vm, attrName);
	  }

	  setAttributeNS.apply(this, ArraySlice.call(arguments));
	}

	function removeAttributePatched(attrName) {
	  const vm = getCustomElementVM(this); // marking the set is needed for the AOM polyfill

	  if (process.env.NODE_ENV !== 'production') {
	    assertAttributeMutationCapability(vm, attrName);
	    assertAttributeReflectionCapability(vm, attrName);
	  }

	  removeAttribute.apply(this, ArraySlice.call(arguments));
	}

	function removeAttributeNSPatched(attrNameSpace, attrName) {
	  const vm = getCustomElementVM(this);

	  if (process.env.NODE_ENV !== 'production') {
	    assertAttributeMutationCapability(vm, attrName);
	    assertAttributeReflectionCapability(vm, attrName);
	  }

	  removeAttributeNS.apply(this, ArraySlice.call(arguments));
	}

	function assertAttributeReflectionCapability(vm, attrName) {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  }

	  const propName = isString(attrName) ? getPropNameFromAttrName(StringToLowerCase.call(attrName)) : null;
	  const {
	    elm,
	    def: {
	      props: propsConfig
	    }
	  } = vm;

	  if (!isUndefined(getNodeOwnerKey$1(elm)) && isAttributeLocked(elm, attrName) && propsConfig && propName && propsConfig[propName]) {
	    assert.logError(`Invalid attribute "${StringToLowerCase.call(attrName)}" for ${vm}. Instead access the public property with \`element.${propName};\`.`, elm);
	  }
	}

	function assertAttributeMutationCapability(vm, attrName) {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  }

	  const {
	    elm
	  } = vm;

	  if (!isUndefined(getNodeOwnerKey$1(elm)) && isAttributeLocked(elm, attrName)) {
	    assert.logError(`Invalid operation on Element ${vm}. Elements created via a template should not be mutated using DOM APIs. Instead of attempting to update this element directly to change the value of attribute "${attrName}", you can update the state of the component, and let the engine to rehydrate the element accordingly.`, elm);
	  }
	}

	function getCustomElementRestrictionsDescriptors(elm, options) {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  }

	  const descriptors = getNodeRestrictionsDescriptors(elm, options);
	  const originalAddEventListener = elm.addEventListener;
	  return assign(descriptors, {
	    addEventListener: {
	      value(type) {
	        assert.invariant(!isRendering, `${vmBeingRendered}.render() method has side effects on the state of ${toString(elm)} by adding an event listener for "${type}".`);
	        return originalAddEventListener.apply(this, arguments);
	      }

	    },
	    // replacing mutators and accessors on the element itself to catch any mutation
	    getAttribute: {
	      value: getAttributePatched,
	      configurable: true
	    },
	    setAttribute: {
	      value: setAttributePatched,
	      configurable: true
	    },
	    setAttributeNS: {
	      value: setAttributeNSPatched,
	      configurable: true
	    },
	    removeAttribute: {
	      value: removeAttributePatched,
	      configurable: true
	    },
	    removeAttributeNS: {
	      value: removeAttributeNSPatched,
	      configurable: true
	    }
	  });
	}

	function getComponentRestrictionsDescriptors(cmp, options) {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  }

	  const originalSetAttribute = cmp.setAttribute;
	  return {
	    setAttribute: {
	      value(attrName, value) {
	        // logging errors for experimental and special attributes
	        if (isString(attrName)) {
	          const propName = getPropNameFromAttrName(attrName);
	          const info = getGlobalHTMLPropertiesInfo();

	          if (info[propName] && info[propName].attribute) {
	            const {
	              error,
	              experimental
	            } = info[propName];

	            if (error) {
	              assert.logError(error, getComponentVM(this).elm);
	            } else if (experimental) {
	              assert.logError(`Attribute \`${attrName}\` is an experimental attribute that is not standardized or supported by all browsers. Property "${propName}" and attribute "${attrName}" are ignored.`, getComponentVM(this).elm);
	            }
	          }
	        }

	        originalSetAttribute.apply(this, arguments);
	      },

	      enumerable: true,
	      configurable: true,
	      writable: true
	    },
	    tagName: {
	      get() {
	        throw new Error(`Usage of property \`tagName\` is disallowed because the component itself does not know which tagName will be used to create the element, therefore writing code that check for that value is error prone.`);
	      },

	      enumerable: true,
	      configurable: true
	    }
	  };
	}

	function getLightingElementProtypeRestrictionsDescriptors(proto, options) {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  }

	  const info = getGlobalHTMLPropertiesInfo();
	  const descriptors = {};
	  forEach.call(getOwnPropertyNames(info), propName => {
	    if (propName in proto) {
	      return; // no need to redefine something that we are already exposing
	    }

	    descriptors[propName] = {
	      get() {
	        const {
	          error,
	          attribute,
	          readOnly,
	          experimental
	        } = info[propName];
	        const msg = [];
	        msg.push(`Accessing the global HTML property "${propName}" in ${this} is disabled.`);

	        if (error) {
	          msg.push(error);
	        } else {
	          if (experimental) {
	            msg.push(`This is an experimental property that is not standardized or supported by all browsers. Property "${propName}" and attribute "${attribute}" are ignored.`);
	          }

	          if (readOnly) {
	            // TODO - need to improve this message
	            msg.push(`Property is read-only.`);
	          }

	          if (attribute) {
	            msg.push(`"Instead access it via the reflective attribute "${attribute}" with one of these techniques:`);
	            msg.push(`  * Use \`this.getAttribute("${attribute}")\` to access the attribute value. This option is best suited for accessing the value in a getter during the rendering process.`);
	            msg.push(`  * Declare \`static observedAttributes = ["${attribute}"]\` and use \`attributeChangedCallback(attrName, oldValue, newValue)\` to get a notification each time the attribute changes. This option is best suited for reactive programming, eg. fetching new data each time the attribute is updated.`);
	          }
	        }

	        assert.logWarning(msg.join('\n'), getComponentVM(this).elm);
	        return; // explicit undefined
	      },

	      // a setter is required here to avoid TypeError's when an attribute is set in a template but only the above getter is defined
	      set() {}

	    };
	  });
	  return descriptors;
	}

	function patchElementWithRestrictions(elm, options) {
	  defineProperties(elm, getElementRestrictionsDescriptors(elm, options));
	} // This routine will prevent access to certain properties on a shadow root instance to guarantee
	// that all components will work fine in IE11 and other browsers without shadow dom support.


	function patchShadowRootWithRestrictions(sr, options) {
	  defineProperties(sr, getShadowRootRestrictionsDescriptors(sr, options));
	}

	function patchCustomElementWithRestrictions(elm, options) {
	  const restrictionsDescriptors = getCustomElementRestrictionsDescriptors(elm, options);
	  const elmProto = getPrototypeOf(elm);
	  setPrototypeOf(elm, create(elmProto, restrictionsDescriptors));
	}

	function patchComponentWithRestrictions(cmp, options) {
	  defineProperties(cmp, getComponentRestrictionsDescriptors(cmp, options));
	}

	function patchLightningElementPrototypeWithRestrictions(proto, options) {
	  defineProperties(proto, getLightingElementProtypeRestrictionsDescriptors(proto, options));
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function updateNodeHook(oldVnode, vnode) {
	  if (oldVnode.text !== vnode.text) {
	    nodeValueSetter.call(vnode.elm, vnode.text);
	  }
	}

	function insertNodeHook(vnode, parentNode, referenceNode) {
	  insertBefore.call(parentNode, vnode.elm, referenceNode);
	}

	function removeNodeHook(vnode, parentNode) {
	  removeChild.call(parentNode, vnode.elm);
	}

	function createTextHook(vnode) {
	  const text = vnode.elm;
	  setNodeOwnerKey$1(text, vnode.uid);

	  if (isTrue(vnode.fallback)) {
	    patchTextNodeProto(text);
	  }
	}

	function createCommentHook(vnode) {
	  const comment = vnode.elm;
	  setNodeOwnerKey$1(comment, vnode.uid);

	  if (isTrue(vnode.fallback)) {
	    patchCommentNodeProto(comment);
	  }
	}

	function createElmDefaultHook(vnode) {
	  modEvents.create(vnode); // Attrs need to be applied to element before props
	  // IE11 will wipe out value on radio inputs if value
	  // is set before type=radio.

	  modAttrs.create(vnode);
	  modProps.create(vnode);
	  modStaticClassName.create(vnode);
	  modStaticStyle.create(vnode);
	  modComputedClassName.create(vnode);
	  modComputedStyle.create(vnode);
	  contextModule.create(vnode);
	}

	var LWCDOMMode;

	(function (LWCDOMMode) {
	  LWCDOMMode["manual"] = "manual";
	})(LWCDOMMode || (LWCDOMMode = {}));

	function createElmHook(vnode) {
	  const {
	    uid,
	    sel,
	    fallback
	  } = vnode;
	  const elm = vnode.elm;
	  setNodeOwnerKey$1(elm, uid);

	  if (isTrue(fallback)) {
	    const {
	      shadowAttribute,
	      data: {
	        context
	      }
	    } = vnode;
	    const isPortal = !isUndefined(context) && !isUndefined(context.lwc) && context.lwc.dom === LWCDOMMode.manual;
	    patchElementProto(elm, {
	      sel,
	      isPortal,
	      shadowAttribute
	    });
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    const {
	      data: {
	        context
	      }
	    } = vnode;
	    const isPortal = !isUndefined(context) && !isUndefined(context.lwc) && context.lwc.dom === LWCDOMMode.manual;
	    patchElementWithRestrictions(elm, {
	      isPortal
	    });
	  }
	}

	function updateElmDefaultHook(oldVnode, vnode) {
	  // Attrs need to be applied to element before props
	  // IE11 will wipe out value on radio inputs if value
	  // is set before type=radio.
	  modAttrs.update(oldVnode, vnode);
	  modProps.update(oldVnode, vnode);
	  modComputedClassName.update(oldVnode, vnode);
	  modComputedStyle.update(oldVnode, vnode);
	}

	function insertCustomElmHook(vnode) {
	  const vm = getCustomElementVM(vnode.elm);
	  appendVM(vm);
	  renderVM(vm);
	}

	function updateChildrenHook(oldVnode, vnode) {
	  const {
	    children
	  } = vnode;
	  const fn = hasDynamicChildren(children) ? updateDynamicChildren : updateStaticChildren;
	  fn(vnode.elm, oldVnode.children, children);
	}

	function allocateChildrenHook(vnode) {
	  if (isTrue(vnode.fallback)) {
	    // slow path
	    const elm = vnode.elm;
	    const vm = getCustomElementVM(elm);
	    const children = vnode.children;
	    allocateInSlot(vm, children); // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!

	    vnode.children = EmptyArray;
	  }
	}

	function createCustomElmHook(vnode) {
	  const elm = vnode.elm;

	  if (hasOwnProperty.call(elm, ViewModelReflection)) {
	    // There is a possibility that a custom element is registered under tagName,
	    // in which case, the initialization is already carry on, and there is nothing else
	    // to do here since this hook is called right after invoking `document.createElement`.
	    return;
	  }

	  const {
	    mode,
	    ctor,
	    uid,
	    fallback
	  } = vnode;
	  setNodeOwnerKey$1(elm, uid);
	  const def = getComponentDef(ctor);
	  setElementProto(elm, def);

	  if (isTrue(fallback)) {
	    const {
	      shadowAttribute
	    } = vnode;
	    patchCustomElementProto(elm, {
	      def,
	      shadowAttribute
	    });
	  }

	  createVM(vnode.sel, elm, ctor, {
	    mode,
	    fallback
	  });
	  const vm = getCustomElementVM(elm);

	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    assert.isTrue(isArray(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    patchCustomElementWithRestrictions(elm, EmptyObject);
	  }
	}

	function createCustomElmDefaultHook(vnode) {
	  modEvents.create(vnode); // Attrs need to be applied to element before props
	  // IE11 will wipe out value on radio inputs if value
	  // is set before type=radio.

	  modAttrs.create(vnode);
	  modProps.create(vnode);
	  modStaticClassName.create(vnode);
	  modStaticStyle.create(vnode);
	  modComputedClassName.create(vnode);
	  modComputedStyle.create(vnode);
	  contextModule.create(vnode);
	}

	function createChildrenHook(vnode) {
	  const {
	    elm,
	    children
	  } = vnode;

	  for (let j = 0; j < children.length; ++j) {
	    const ch = children[j];

	    if (ch != null) {
	      ch.hook.create(ch);
	      ch.hook.insert(ch, elm, null);
	    }
	  }
	}

	function renderCustomElmHook(vnode) {
	  const vm = getCustomElementVM(vnode.elm);

	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    assert.isTrue(isArray(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
	  }

	  renderVM(vm);
	}

	function updateCustomElmDefaultHook(oldVnode, vnode) {
	  // Attrs need to be applied to element before props
	  // IE11 will wipe out value on radio inputs if value
	  // is set before type=radio.
	  modAttrs.update(oldVnode, vnode);
	  modProps.update(oldVnode, vnode);
	  modComputedClassName.update(oldVnode, vnode);
	  modComputedStyle.update(oldVnode, vnode);
	}

	function removeElmHook(vnode) {
	  vnode.hook.destroy(vnode);
	}

	function destroyCustomElmHook(vnode) {
	  removeVM(getCustomElementVM(vnode.elm));
	}

	function destroyElmHook(vnode) {
	  const {
	    children
	  } = vnode;

	  for (let j = 0, len = children.length; j < len; ++j) {
	    const ch = children[j];

	    if (ch != null) {
	      ch.hook.destroy(ch);
	    }
	  }
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const Services = create(null);
	const hooks = ['wiring', 'locator', 'rendered', 'connected', 'disconnected'];

	function register(service) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(isObject(service), `Invalid service declaration, ${service}: service must be an object`);
	  }

	  for (let i = 0; i < hooks.length; ++i) {
	    const hookName = hooks[i];

	    if (hookName in service) {
	      let l = Services[hookName];

	      if (isUndefined(l)) {
	        Services[hookName] = l = [];
	      }

	      ArrayPush.call(l, service[hookName]);
	    }
	  }
	}

	function invokeServiceHook(vm, cbs) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    assert.isTrue(isArray(cbs) && cbs.length > 0, `Optimize invokeServiceHook() to be invoked only when needed`);
	  }

	  const {
	    component,
	    data,
	    def,
	    context
	  } = vm;

	  for (let i = 0, len = cbs.length; i < len; ++i) {
	    cbs[i].call(undefined, component, data, def, context);
	  }
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const {
	  createElement: createElement$1,
	  createElementNS: createElementNS$1,
	  createTextNode: createTextNode$1,
	  createComment: createComment$1
	} = document;
	const CHAR_S = 115;
	const CHAR_V = 118;
	const CHAR_G = 103;
	const NamespaceAttributeForSVG = 'http://www.w3.org/2000/svg';
	const SymbolIterator = Symbol.iterator;

	function noop() {}

	const TextHook = {
	  create: vnode => {
	    if (isUndefined(vnode.elm)) {
	      // supporting the ability to inject an element via a vnode
	      // this is used mostly for caching in compiler
	      vnode.elm = createTextNode$1.call(document, vnode.text);
	    }

	    createTextHook(vnode);
	  },
	  update: updateNodeHook,
	  insert: insertNodeHook,
	  move: insertNodeHook,
	  remove: removeNodeHook,
	  destroy: noop
	};
	const CommentHook = {
	  create: vnode => {
	    if (isUndefined(vnode.elm)) {
	      // supporting the ability to inject an element via a vnode
	      // this is used mostly for caching in compiler
	      vnode.elm = createComment$1.call(document, vnode.text);
	    }

	    createCommentHook(vnode);
	  },
	  update: updateNodeHook,
	  insert: insertNodeHook,
	  move: insertNodeHook,
	  remove: removeNodeHook,
	  destroy: noop
	}; // insert is called after update, which is used somewhere else (via a module)
	// to mark the vm as inserted, that means we cannot use update as the main channel
	// to rehydrate when dirty, because sometimes the element is not inserted just yet,
	// which breaks some invariants. For that reason, we have the following for any
	// Custom Element that is inserted via a template.

	const ElementHook = {
	  create: vnode => {
	    const {
	      data,
	      sel,
	      elm
	    } = vnode;
	    const {
	      ns,
	      create: create$$1
	    } = data;

	    if (isUndefined(elm)) {
	      // supporting the ability to inject an element via a vnode
	      // this is used mostly for caching in compiler and style tags
	      vnode.elm = isUndefined(ns) ? createElement$1.call(document, sel) : createElementNS$1.call(document, ns, sel);
	    }

	    createElmHook(vnode);
	    create$$1(vnode);
	  },
	  update: (oldVnode, vnode) => {
	    const {
	      data: {
	        update
	      }
	    } = vnode;
	    update(oldVnode, vnode);
	    updateChildrenHook(oldVnode, vnode);
	  },
	  insert: (vnode, parentNode, referenceNode) => {
	    insertBefore.call(parentNode, vnode.elm, referenceNode);
	    createChildrenHook(vnode);
	  },
	  move: (vnode, parentNode, referenceNode) => {
	    insertBefore.call(parentNode, vnode.elm, referenceNode);
	  },
	  remove: (vnode, parentNode) => {
	    removeChild.call(parentNode, vnode.elm);
	    removeElmHook(vnode);
	  },
	  destroy: destroyElmHook
	};
	const CustomElementHook = {
	  create: vnode => {
	    const {
	      sel,
	      data: {
	        create: create$$1
	      },
	      elm
	    } = vnode;

	    if (isUndefined(elm)) {
	      // supporting the ability to inject an element via a vnode
	      // this is used mostly for caching in compiler and style tags
	      vnode.elm = createElement$1.call(document, sel);
	    }

	    createCustomElmHook(vnode);
	    allocateChildrenHook(vnode);
	    create$$1(vnode);
	  },
	  update: (oldVnode, vnode) => {
	    const {
	      data: {
	        update
	      }
	    } = vnode;
	    update(oldVnode, vnode); // in fallback mode, the allocation will always the children to
	    // empty and delegate the real allocation to the slot elements

	    allocateChildrenHook(vnode); // in fallback mode, the children will be always empty, so, nothing
	    // will happen, but in native, it does allocate the light dom

	    updateChildrenHook(oldVnode, vnode); // this will update the shadowRoot

	    renderCustomElmHook(vnode);
	  },
	  insert: (vnode, parentNode, referenceNode) => {
	    insertBefore.call(parentNode, vnode.elm, referenceNode);
	    createChildrenHook(vnode);
	    insertCustomElmHook(vnode);
	  },
	  move: (vnode, parentNode, referenceNode) => {
	    insertBefore.call(parentNode, vnode.elm, referenceNode);
	  },
	  remove: (vnode, parentNode) => {
	    removeChild.call(parentNode, vnode.elm);
	    removeElmHook(vnode);
	  },
	  destroy: vnode => {
	    destroyCustomElmHook(vnode);
	    destroyElmHook(vnode);
	  }
	}; // TODO: this should be done by the compiler, adding ns to every sub-element

	function addNS(vnode) {
	  const {
	    data,
	    children,
	    sel
	  } = vnode; // TODO: review why `sel` equal `foreignObject` should get this `ns`

	  data.ns = NamespaceAttributeForSVG;

	  if (isArray(children) && sel !== 'foreignObject') {
	    for (let j = 0, n = children.length; j < n; ++j) {
	      const childNode = children[j];

	      if (childNode != null && childNode.hook === ElementHook) {
	        addNS(childNode);
	      }
	    }
	  }
	}

	function getCurrentOwnerId() {
	  if (process.env.NODE_ENV !== 'production') {
	    // TODO: enable this after refactoring all failing tests
	    if (isNull(vmBeingRendered)) {
	      return 0;
	    } // assert.invariant(!isNull(vmBeingRendered), `Invalid invocation of getCurrentOwnerId().`);

	  }

	  return vmBeingRendered.uid;
	}

	const getCurrentFallback = isNativeShadowRootAvailable ? function () {
	  if (process.env.NODE_ENV !== 'production') ;
	  return vmBeingRendered.fallback;
	} : () => {
	  if (process.env.NODE_ENV !== 'production') ;
	  return true;
	};

	function getCurrentShadowAttribute() {
	  if (process.env.NODE_ENV !== 'production') {
	    // TODO: enable this after refactoring all failing tests
	    if (isNull(vmBeingRendered)) {
	      return;
	    } // assert.invariant(!isNull(vmBeingRendered), `Invalid invocation of getCurrentShadowToken().`);

	  } // TODO: remove this condition after refactoring all failing tests


	  return vmBeingRendered.context.shadowAttribute;
	} // [h]tml node


	function h(sel, data, children) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(isString(sel), `h() 1st argument sel must be a string.`);
	    assert.isTrue(isObject(data), `h() 2nd argument data must be an object.`);
	    assert.isTrue(isArray(children), `h() 3rd argument children must be an array.`);
	    assert.isTrue("key" in data, ` <${sel}> "key" attribute is invalid or missing for ${vmBeingRendered}. Key inside iterator is either undefined or null.`); // checking reserved internal data properties

	    assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
	    assert.isFalse(data.styleMap && data.style, `vnode.data.styleMap and vnode.data.style ambiguous declaration.`);

	    if (data.style && !isString(data.style)) {
	      assert.logWarning(`Invalid 'style' attribute passed to <${sel}> should be a string value, and will be ignored.`, vmBeingRendered.elm);
	    }

	    forEach.call(children, childVnode => {
	      if (childVnode != null) {
	        assert.isTrue(childVnode && "sel" in childVnode && "data" in childVnode && "children" in childVnode && "text" in childVnode && "elm" in childVnode && "key" in childVnode, `${childVnode} is not a vnode.`);
	      }
	    });
	  }

	  const {
	    key
	  } = data;

	  if (isUndefined(data.create)) {
	    data.create = createElmDefaultHook;
	  }

	  if (isUndefined(data.update)) {
	    data.update = updateElmDefaultHook;
	  }

	  let text, elm, shadowAttribute; // tslint:disable-line

	  const fallback = getCurrentFallback(); // shadowAttribute is only really needed in fallback mode

	  if (fallback) {
	    shadowAttribute = getCurrentShadowAttribute();
	  }

	  const uid = getCurrentOwnerId();
	  const vnode = {
	    sel,
	    data,
	    children,
	    text,
	    elm,
	    key,
	    hook: ElementHook,
	    shadowAttribute,
	    uid,
	    fallback
	  };

	  if (sel.length === 3 && StringCharCodeAt.call(sel, 0) === CHAR_S && StringCharCodeAt.call(sel, 1) === CHAR_V && StringCharCodeAt.call(sel, 2) === CHAR_G) {
	    addNS(vnode);
	  }

	  return vnode;
	} // [t]ab[i]ndex function


	function ti(value) {
	  // if value is greater than 0, we normalize to 0
	  // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
	  // If value is less than -1, we don't care
	  const shouldNormalize = value > 0 && !(isTrue(value) || isFalse(value));

	  if (process.env.NODE_ENV !== 'production') {
	    if (shouldNormalize) {
	      assert.logWarning(`Invalid tabindex value \`${toString(value)}\` in template for ${vmBeingRendered}. This attribute can only be set to 0 or -1.`, vmBeingRendered.elm);
	    }
	  }

	  return shouldNormalize ? 0 : value;
	} // [s]lot element node


	function s(slotName, data, children, slotset) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(isString(slotName), `s() 1st argument slotName must be a string.`);
	    assert.isTrue(isObject(data), `s() 2nd argument data must be an object.`);
	    assert.isTrue(isArray(children), `h() 3rd argument children must be an array.`);
	  }

	  if (!isUndefined(slotset) && !isUndefined(slotset[slotName]) && slotset[slotName].length !== 0) {
	    children = slotset[slotName];
	  }

	  const vnode = h('slot', data, children);

	  if (isTrue(vnode.fallback)) {
	    markAsDynamicChildren(children);
	  }

	  return vnode;
	} // [c]ustom element node


	function c(sel, Ctor, data, children) {
	  if (isCircularModuleDependency(Ctor)) {
	    Ctor = resolveCircularModuleDependency(Ctor);
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(isString(sel), `c() 1st argument sel must be a string.`);
	    assert.isTrue(isFunction(Ctor), `c() 2nd argument Ctor must be a function.`);
	    assert.isTrue(isObject(data), `c() 3nd argument data must be an object.`);
	    assert.isTrue(arguments.length === 3 || isArray(children), `c() 4nd argument data must be an array.`); // TODO: enable this once all tests are changed to use compileTemplate utility
	    // assert.isTrue("key" in compilerData, ` <${sel}> "key" attribute is invalid or missing for ${vmBeingRendered}. Key inside iterator is either undefined or null.`);
	    // checking reserved internal data properties

	    assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
	    assert.isFalse(data.styleMap && data.style, `vnode.data.styleMap and vnode.data.style ambiguous declaration.`);

	    if (data.style && !isString(data.style)) {
	      assert.logWarning(`Invalid 'style' attribute passed to <${sel}> should be a string value, and will be ignored.`, vmBeingRendered.elm);
	    }

	    if (arguments.length === 4) {
	      forEach.call(children, childVnode => {
	        if (childVnode != null) {
	          assert.isTrue(childVnode && "sel" in childVnode && "data" in childVnode && "children" in childVnode && "text" in childVnode && "elm" in childVnode && "key" in childVnode, `${childVnode} is not a vnode.`);
	        }
	      });
	    }
	  }

	  const {
	    key
	  } = data;

	  if (isUndefined(data.create)) {
	    data.create = createCustomElmDefaultHook;
	  }

	  if (isUndefined(data.update)) {
	    data.update = updateCustomElmDefaultHook;
	  }

	  let text, elm, shadowAttribute; // tslint:disable-line

	  const fallback = getCurrentFallback(); // shadowAttribute is only really needed in fallback mode

	  if (fallback) {
	    shadowAttribute = getCurrentShadowAttribute();
	  }

	  const uid = getCurrentOwnerId();
	  children = arguments.length === 3 ? EmptyArray : children;
	  const vnode = {
	    sel,
	    data,
	    children,
	    text,
	    elm,
	    key,
	    hook: CustomElementHook,
	    ctor: Ctor,
	    shadowAttribute,
	    uid,
	    fallback,
	    mode: 'open'
	  };
	  return vnode;
	} // [i]terable node


	function i(iterable, factory) {
	  const list = []; // marking the list as generated from iteration so we can optimize the diffing

	  markAsDynamicChildren(list);

	  if (isUndefined(iterable) || iterable === null) {
	    if (process.env.NODE_ENV !== 'production') {
	      assert.logWarning(`Invalid template iteration for value "${iterable}" in ${vmBeingRendered}, it should be an Array or an iterable Object.`, vmBeingRendered.elm);
	    }

	    return list;
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert.isFalse(isUndefined(iterable[SymbolIterator]), `Invalid template iteration for value \`${iterable}\` in ${vmBeingRendered}, it requires an array-like object, not \`null\` or \`undefined\`.`);
	  }

	  const iterator = iterable[SymbolIterator]();

	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(iterator && isFunction(iterator.next), `Invalid iterator function for "${iterable}" in ${vmBeingRendered}.`);
	  }

	  let next = iterator.next();
	  let j = 0;
	  let {
	    value,
	    done: last
	  } = next;
	  let keyMap;
	  let iterationError;

	  if (process.env.NODE_ENV !== 'production') {
	    keyMap = create(null);
	  }

	  while (last === false) {
	    // implementing a look-back-approach because we need to know if the element is the last
	    next = iterator.next();
	    last = next.done; // template factory logic based on the previous collected value

	    const vnode = factory(value, j, j === 0, last);

	    if (isArray(vnode)) {
	      ArrayPush.apply(list, vnode);
	    } else {
	      ArrayPush.call(list, vnode);
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      const vnodes = isArray(vnode) ? vnode : [vnode];
	      forEach.call(vnodes, childVnode => {
	        if (!isNull(childVnode) && isObject(childVnode) && !isUndefined(childVnode.sel)) {
	          const {
	            key
	          } = childVnode;

	          if (isString(key) || isNumber(key)) {
	            if (keyMap[key] === 1 && isUndefined(iterationError)) {
	              iterationError = `Duplicated "key" attribute value for "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. Key with value "${childVnode.key}" appears more than once in iteration. Key values must be unique numbers or strings.`;
	            }

	            keyMap[key] = 1;
	          } else if (isUndefined(iterationError)) {
	            iterationError = `Invalid "key" attribute value in "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. Instead set a unique "key" attribute value on all iteration children so internal state can be preserved during rehydration.`;
	          }
	        }
	      });
	    } // preparing next value


	    j += 1;
	    value = next.value;
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    if (!isUndefined(iterationError)) {
	      assert.logError(iterationError, vmBeingRendered.elm);
	    }
	  }

	  return list;
	}
	/**
	 * [f]lattening
	 */


	function f(items) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(isArray(items), 'flattening api can only work with arrays.');
	  }

	  const len = items.length;
	  const flattened = []; // all flattened nodes should be marked as dynamic because
	  // flattened nodes are because of a conditional or iteration.
	  // We have to mark as dynamic because this could switch from an
	  // iterator to "static" text at any time.
	  // TODO: compiler should give us some sort of indicator
	  // to describe whether a vnode is dynamic or not

	  markAsDynamicChildren(flattened);

	  for (let j = 0; j < len; j += 1) {
	    const item = items[j];

	    if (isArray(item)) {
	      ArrayPush.apply(flattened, item);
	    } else {
	      ArrayPush.call(flattened, item);
	    }
	  }

	  return flattened;
	} // [t]ext node


	function t(text) {
	  const data = EmptyObject;
	  let sel, children, key, elm; // tslint:disable-line

	  return {
	    sel,
	    data,
	    children,
	    text,
	    elm,
	    key,
	    hook: TextHook,
	    uid: getCurrentOwnerId(),
	    fallback: getCurrentFallback()
	  };
	} // comment node


	function p(text) {
	  const data = EmptyObject;
	  let sel = '!',
	      children,
	      key,
	      elm; // tslint:disable-line

	  return {
	    sel,
	    data,
	    children,
	    text,
	    elm,
	    key,
	    hook: CommentHook,
	    uid: getCurrentOwnerId(),
	    fallback: getCurrentFallback()
	  };
	} // [d]ynamic value to produce a text vnode


	function d(value) {
	  if (value == null) {
	    return null;
	  }

	  return t(value);
	} // [b]ind function


	function b(fn) {
	  if (isNull(vmBeingRendered)) {
	    throw new Error();
	  }

	  const vm = vmBeingRendered;
	  return function (event) {
	    if (vm.fallback) {
	      patchEvent(event);
	    }

	    invokeEventListener(vm, fn, vm.component, event);
	  };
	} // [f]unction_[b]ind


	function fb(fn) {
	  if (isNull(vmBeingRendered)) {
	    throw new Error();
	  }

	  const vm = vmBeingRendered;
	  return function () {
	    return invokeComponentCallback(vm, fn, ArraySlice.call(arguments));
	  };
	} // [l]ocator_[l]istener function


	function ll(originalHandler, id, context) {
	  if (isNull(vmBeingRendered)) {
	    throw new Error();
	  }

	  const vm = vmBeingRendered; // bind the original handler with b() so we can call it
	  // after resolving the locator

	  const eventListener = b(originalHandler); // create a wrapping handler to resolve locator, and
	  // then invoke the original handler.

	  return function (event) {
	    // located service for the locator metadata
	    const {
	      context: {
	        locator
	      }
	    } = vm;

	    if (!isUndefined(locator)) {
	      const {
	        locator: locatorService
	      } = Services;

	      if (locatorService) {
	        locator.resolved = {
	          target: id,
	          host: locator.id,
	          targetContext: isFunction(context) && context(),
	          hostContext: isFunction(locator.context) && locator.context()
	        }; // a registered `locator` service will be invoked with
	        // access to the context.locator.resolved, which will contain:
	        // outer id, outer context, inner id, and inner context

	        invokeServiceHook(vm, locatorService);
	      }
	    } // invoke original event listener via b()


	    eventListener(event);
	  };
	} // [k]ey function


	function k(compilerKey, obj) {
	  switch (typeof obj) {
	    case 'number': // TODO: when obj is a numeric key, we might be able to use some
	    // other strategy to combine two numbers into a new unique number

	    case 'string':
	      return compilerKey + ':' + obj;

	    case 'object':
	      if (process.env.NODE_ENV !== 'production') {
	        assert.fail(`Invalid key value "${obj}" in ${vmBeingRendered}. Key must be a string or number.`);
	      }

	  }
	} // [g]lobal [id] function


	function gid(id) {
	  if (isUndefined(id) || id === '') {
	    if (process.env.NODE_ENV !== 'production') {
	      assert.logError(`Invalid id value "${id}". Expected a non-empty string.`, vmBeingRendered.elm);
	    }

	    return id;
	  }

	  return isNull(id) ? id : `${id}-${getCurrentOwnerId()}`;
	}

	var api$1 =
	/*#__PURE__*/
	Object.freeze({
	  h: h,
	  ti: ti,
	  s: s,
	  c: c,
	  i: i,
	  f: f,
	  t: t,
	  p: p,
	  d: d,
	  b: b,
	  fb: fb,
	  ll: ll,
	  k: k,
	  gid: gid
	});
	const signedTemplateSet = new Set();

	function defaultEmptyTemplate() {
	  return [];
	}

	signedTemplateSet.add(defaultEmptyTemplate);

	function isTemplateRegistered(tpl) {
	  return signedTemplateSet.has(tpl);
	} // chaining this method as a way to wrap existing
	// assignment of templates easily, without too much transformation


	function registerTemplate(tpl) {
	  signedTemplateSet.add(tpl);
	  return tpl;
	} // locker-service patches this function during runtime to sanitize vulnerable attributes.
	// when ran off-core this function becomes a noop and returns the user authored value.


	function sanitizeAttribute(tagName, namespaceUri, attrName, attrValue) {
	  return attrValue;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const CachedStyleFragments = create(null);

	function createStyleElement(styleContent) {
	  const elm = createElement.call(document, 'style');
	  elm.type = 'text/css';
	  elm.textContent = styleContent;
	  return elm;
	}

	function getCachedStyleElement(styleContent) {
	  let fragment = CachedStyleFragments[styleContent];

	  if (isUndefined(fragment)) {
	    fragment = createDocumentFragment.call(document);
	    const elm = createStyleElement(styleContent);
	    appendChild.call(fragment, elm);
	    CachedStyleFragments[styleContent] = fragment;
	  }

	  return fragment.cloneNode(true).firstChild;
	}

	const globalStyleParent = document.head || document.body || document;
	const InsertedGlobalStyleContent = create(null);

	function insertGlobalStyle(styleContent) {
	  // inserts the global style when needed, otherwise does nothing
	  if (isUndefined(InsertedGlobalStyleContent[styleContent])) {
	    InsertedGlobalStyleContent[styleContent] = true;
	    const elm = createStyleElement(styleContent);
	    appendChild.call(globalStyleParent, elm);
	  }
	}

	function noop$1() {
	  /** do nothing */
	}

	function createStyleVNode(elm) {
	  const vnode = h('style', {
	    key: 'style',
	    create: noop$1,
	    update: noop$1
	  }, EmptyArray); // Force the diffing algo to use the cloned style.

	  vnode.elm = elm;
	  return vnode;
	}
	/**
	 * Reset the styling token applied to the host element.
	 */


	function resetStyleAttributes(vm) {
	  const {
	    context,
	    elm
	  } = vm; // Remove the style attribute currently applied to the host element.

	  const oldHostAttribute = context.hostAttribute;

	  if (!isUndefined(oldHostAttribute)) {
	    removeAttribute.call(elm, oldHostAttribute);
	  } // Reset the scoping attributes associated to the context.


	  context.hostAttribute = context.shadowAttribute = undefined;
	}
	/**
	 * Apply/Update the styling token applied to the host element.
	 */


	function applyStyleAttributes(vm, hostAttribute, shadowAttribute) {
	  const {
	    context,
	    elm
	  } = vm; // Remove the style attribute currently applied to the host element.

	  setAttribute.call(elm, hostAttribute, '');
	  context.hostAttribute = hostAttribute;
	  context.shadowAttribute = shadowAttribute;
	}

	function evaluateCSS(vm, stylesheets, hostAttribute, shadowAttribute) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    assert.isTrue(isArray(stylesheets), `Invalid stylesheets.`);
	  }

	  const {
	    fallback
	  } = vm;

	  if (fallback) {
	    const hostSelector = `[${hostAttribute}]`;
	    const shadowSelector = `[${shadowAttribute}]`;
	    return forEach.call(stylesheets, stylesheet => {
	      const textContent = stylesheet(hostSelector, shadowSelector, false);
	      insertGlobalStyle(textContent);
	    });
	  } else {
	    // Native shadow in place, we need to act accordingly by using the `:host` selector, and an
	    // empty shadow selector since it is not really needed.
	    const textContent = ArrayReduce.call(stylesheets, (buffer, stylesheet) => {
	      return buffer + stylesheet(emptyString, emptyString, true);
	    }, '');
	    return createStyleVNode(getCachedStyleElement(textContent));
	  }
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const EmptySlots = create(null);

	function validateSlots(vm, html) {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  }

	  const {
	    cmpSlots = EmptySlots
	  } = vm;
	  const {
	    slots = EmptyArray
	  } = html;

	  for (const slotName in cmpSlots) {
	    // tslint:disable-next-line no-production-assert
	    assert.isTrue(isArray(cmpSlots[slotName]), `Slots can only be set to an array, instead received ${toString(cmpSlots[slotName])} for slot "${slotName}" in ${vm}.`);

	    if (ArrayIndexOf.call(slots, slotName) === -1) {
	      // TODO: this should never really happen because the compiler should always validate
	      // tslint:disable-next-line no-production-assert
	      assert.logWarning(`Ignoring unknown provided slot name "${slotName}" in ${vm}. This is probably a typo on the slot attribute.`, vm.elm);
	    }
	  }
	}

	function validateFields(vm, html) {
	  if (process.env.NODE_ENV === 'production') {
	    // this method should never leak to prod
	    throw new ReferenceError();
	  }

	  const component = vm.component; // validating identifiers used by template that should be provided by the component

	  const {
	    ids = []
	  } = html;
	  forEach.call(ids, propName => {
	    if (!(propName in component)) {
	      // tslint:disable-next-line no-production-assert
	      assert.logWarning(`The template rendered by ${vm} references \`this.${propName}\`, which is not declared. This is likely a typo in the template.`, vm.elm);
	    } else if (hasOwnProperty.call(component, propName)) {
	      // tslint:disable-next-line no-production-assert
	      assert.fail(`${component}'s template is accessing \`this.${toString(propName)}\`, which is considered a non-reactive private field. Instead access it via a getter or make it reactive by decorating it with \`@track ${toString(propName)}\`.`);
	    }
	  });
	}

	function evaluateTemplate(vm, html) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    assert.isTrue(isFunction(html), `evaluateTemplate() second argument must be an imported template instead of ${toString(html)}`);
	  } // TODO: add identity to the html functions


	  const {
	    component,
	    context,
	    cmpSlots,
	    cmpTemplate
	  } = vm; // reset the cache memoizer for template when needed

	  if (html !== cmpTemplate) {
	    // It is important to reset the content to avoid reusing similar elements generated from a different
	    // template, because they could have similar IDs, and snabbdom just rely on the IDs.
	    resetShadowRoot(vm); // Check that the template was built by the compiler

	    if (!isTemplateRegistered(html)) {
	      throw new ReferenceError(`Invalid template returned by the render() method on ${vm}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString(html)}.`);
	    }

	    vm.cmpTemplate = html; // Populate context with template information

	    context.tplCache = create(null);
	    resetStyleAttributes(vm);
	    const {
	      stylesheets,
	      stylesheetTokens
	    } = html;

	    if (isUndefined(stylesheets) || stylesheets.length === 0) {
	      context.styleVNode = undefined;
	    } else if (!isUndefined(stylesheetTokens)) {
	      const {
	        hostAttribute,
	        shadowAttribute
	      } = stylesheetTokens;
	      applyStyleAttributes(vm, hostAttribute, shadowAttribute); // Caching style vnode so it can be reused on every render

	      context.styleVNode = evaluateCSS(vm, stylesheets, hostAttribute, shadowAttribute);
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // one time operation for any new template returned by render()
	      // so we can warn if the template is attempting to use a binding
	      // that is not provided by the component instance.
	      validateFields(vm, html);
	    }
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(isObject(context.tplCache), `vm.context.tplCache must be an object associated to ${cmpTemplate}.`); // validating slots in every rendering since the allocated content might change over time

	    validateSlots(vm, html);
	  }

	  const vnodes = html.call(undefined, api$1, component, cmpSlots, context.tplCache);
	  const {
	    styleVNode
	  } = context;

	  if (!isUndefined(context.styleVNode)) {
	    ArrayUnshift.call(vnodes, styleVNode);
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(isArray(vnodes), `Compiler should produce html functions that always return an array.`);
	  }

	  return vnodes;
	}

	var GlobalMeasurementPhase;

	(function (GlobalMeasurementPhase) {
	  GlobalMeasurementPhase["REHYDRATE"] = "lwc-rehydrate";
	  GlobalMeasurementPhase["INIT"] = "lwc-init";
	  GlobalMeasurementPhase["HYDRATE"] = "lwc-hydrate";
	})(GlobalMeasurementPhase || (GlobalMeasurementPhase = {})); // Even if all the browser the engine supports implements the UserTiming API, we need to guard the measure APIs.
	// JSDom (used in Jest) for example doesn't implement the UserTiming APIs


	const isUserTimingSupported = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

	function getMarkName(vm, phase) {
	  return `<${vm.def.name} (${vm.uid})> - ${phase}`;
	}

	function startMeasure(vm, phase) {
	  if (!isUserTimingSupported) {
	    return;
	  }

	  const name = getMarkName(vm, phase);
	  performance.mark(name);
	}

	function endMeasure(vm, phase) {
	  if (!isUserTimingSupported) {
	    return;
	  }

	  const name = getMarkName(vm, phase);
	  performance.measure(name, name); // Clear the created marks and measure to avoid filling the performance entries buffer.
	  // Note: Even if the entries get deleted, existing PerformanceObservers preserve a copy of those entries.

	  performance.clearMarks(name);
	  performance.clearMeasures(name);
	} // tslint:disable-next-line:no-empty


	const noop$2 = function () {};

	function _startGlobalMeasure(phase) {
	  performance.mark(phase);
	}

	function _endGlobalMeasure(phase) {
	  performance.measure(phase, phase);
	  performance.clearMarks(phase);
	  performance.clearMeasures(phase);
	}

	function _startHydrateMeasure(vm) {
	  performance.mark(getMarkName(vm, GlobalMeasurementPhase.HYDRATE));
	}

	function _endHydrateMeasure(vm) {
	  const phase = GlobalMeasurementPhase.HYDRATE;
	  const name = getMarkName(vm, phase);
	  performance.measure(phase, name);
	  performance.clearMarks(name);
	  performance.clearMeasures(phase);
	}

	const startGlobalMeasure = isUserTimingSupported ? _startGlobalMeasure : noop$2;
	const endGlobalMeasure = isUserTimingSupported ? _endGlobalMeasure : noop$2;
	const startHydrateMeasure = isUserTimingSupported ? _startHydrateMeasure : noop$2;
	const endHydrateMeasure = isUserTimingSupported ? _endHydrateMeasure : noop$2;
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	let isRendering = false;
	let vmBeingRendered = null;
	let vmBeingConstructed = null;

	function isBeingConstructed(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  return vmBeingConstructed === vm;
	}

	function invokeComponentCallback(vm, fn, args) {
	  const {
	    context,
	    component,
	    callHook
	  } = vm;
	  let result;
	  let error;

	  try {
	    result = callHook(component, fn, args);
	  } catch (e) {
	    error = Object(e);
	  } finally {
	    if (error) {
	      error.wcStack = getErrorComponentStack(vm.elm); // rethrowing the original error annotated after restoring the context

	      throw error; // tslint:disable-line
	    }
	  }

	  return result;
	}

	function invokeComponentConstructor(vm, Ctor) {
	  const vmBeingConstructedInception = vmBeingConstructed;
	  vmBeingConstructed = vm;

	  if (process.env.NODE_ENV !== 'production') {
	    startMeasure(vm, 'constructor');
	  }

	  let error;

	  try {
	    new Ctor(); // tslint:disable-line
	  } catch (e) {
	    error = Object(e);
	  } finally {
	    if (process.env.NODE_ENV !== 'production') {
	      endMeasure(vm, 'constructor');
	    }

	    vmBeingConstructed = vmBeingConstructedInception;

	    if (error) {
	      error.wcStack = getErrorComponentStack(vm.elm); // rethrowing the original error annotated after restoring the context

	      throw error; // tslint:disable-line
	    }
	  }
	}

	function invokeComponentRenderMethod(vm) {
	  const {
	    def: {
	      render
	    },
	    callHook
	  } = vm;
	  const {
	    component,
	    context
	  } = vm;
	  const isRenderingInception = isRendering;
	  const vmBeingRenderedInception = vmBeingRendered;
	  isRendering = true;
	  vmBeingRendered = vm;
	  let result;
	  let error;

	  if (process.env.NODE_ENV !== 'production') {
	    startMeasure(vm, 'render');
	  }

	  try {
	    const html = callHook(component, render);
	    result = evaluateTemplate(vm, html);
	  } catch (e) {
	    error = Object(e);
	  } finally {
	    if (process.env.NODE_ENV !== 'production') {
	      endMeasure(vm, 'render');
	    }

	    isRendering = isRenderingInception;
	    vmBeingRendered = vmBeingRenderedInception;

	    if (error) {
	      error.wcStack = getErrorComponentStack(vm.elm); // rethrowing the original error annotated after restoring the context

	      throw error; // tslint:disable-line
	    }
	  }

	  return result || [];
	}

	function invokeEventListener(vm, fn, thisValue, event) {
	  const {
	    context,
	    callHook
	  } = vm;
	  let error;

	  try {
	    if (process.env.NODE_ENV !== 'production') {
	      assert.isTrue(isFunction(fn), `Invalid event handler for event '${event.type}' on ${vm}.`);
	    }

	    callHook(thisValue, fn, [event]);
	  } catch (e) {
	    error = Object(e);
	  } finally {
	    if (error) {
	      error.wcStack = getErrorComponentStack(vm.elm); // rethrowing the original error annotated after restoring the context

	      throw error; // tslint:disable-line
	    }
	  }
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const signedComponentToMetaMap = new Map(); // chaining this method as a way to wrap existing
	// assignment of component constructor easily, without too much transformation

	function registerComponent(Ctor, {
	  name,
	  tmpl: template
	}) {
	  signedComponentToMetaMap.set(Ctor, {
	    name,
	    template
	  });
	  return Ctor;
	}

	function getComponentRegisteredMeta(Ctor) {
	  return signedComponentToMetaMap.get(Ctor);
	}

	function createComponent(vm, Ctor) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  } // create the component instance


	  invokeComponentConstructor(vm, Ctor);

	  if (isUndefined(vm.component)) {
	    throw new ReferenceError(`Invalid construction for ${Ctor}, you must extend LightningElement.`);
	  }
	}

	function linkComponent(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  } // wiring service


	  const {
	    def: {
	      wire
	    }
	  } = vm;

	  if (wire) {
	    const {
	      wiring
	    } = Services;

	    if (wiring) {
	      invokeServiceHook(vm, wiring);
	    }
	  }
	}

	function clearReactiveListeners(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  const {
	    deps
	  } = vm;
	  const len = deps.length;

	  if (len) {
	    for (let i = 0; i < len; i += 1) {
	      const set = deps[i];
	      const pos = ArrayIndexOf.call(deps[i], vm);

	      if (process.env.NODE_ENV !== 'production') {
	        assert.invariant(pos > -1, `when clearing up deps, the vm must be part of the collection.`);
	      }

	      ArraySplice.call(set, pos, 1);
	    }

	    deps.length = 0;
	  }
	}

	function renderComponent(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    assert.invariant(vm.isDirty, `${vm} is not dirty.`);
	  }

	  clearReactiveListeners(vm);
	  const vnodes = invokeComponentRenderMethod(vm);
	  vm.isDirty = false;

	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(isArray(vnodes), `${vm}.render() should always return an array of vnodes instead of ${vnodes}`);
	  }

	  return vnodes;
	}

	function markComponentAsDirty(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    assert.isFalse(vm.isDirty, `markComponentAsDirty() for ${vm} should not be called when the component is already dirty.`);
	    assert.isFalse(isRendering, `markComponentAsDirty() for ${vm} cannot be called during rendering of ${vmBeingRendered}.`);
	  }

	  vm.isDirty = true;
	}

	const cmpEventListenerMap = new WeakMap();

	function getWrappedComponentsListener(vm, listener) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  if (!isFunction(listener)) {
	    throw new TypeError(); // avoiding problems with non-valid listeners
	  }

	  let wrappedListener = cmpEventListenerMap.get(listener);

	  if (isUndefined(wrappedListener)) {
	    wrappedListener = function (event) {
	      invokeEventListener(vm, listener, undefined, event);
	    };

	    cmpEventListenerMap.set(listener, wrappedListener);
	  }

	  return wrappedListener;
	}

	function getComponentAsString(component) {
	  if (process.env.NODE_ENV === 'production') {
	    throw new ReferenceError();
	  }

	  const vm = getComponentVM(component);
	  return `<${StringToLowerCase.call(tagNameGetter.call(vm.elm))}>`;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function apply() {
	  function elemFromPoint(left, top) {
	    const element = elementFromPoint.call(document, left, top);

	    if (isNull(element)) {
	      return element;
	    }

	    return retarget(document, pathComposer(element, true));
	  } // https://github.com/Microsoft/TypeScript/issues/14139


	  document.elementFromPoint = elemFromPoint; // Go until we reach to top of the LWC tree

	  defineProperty(document, 'activeElement', {
	    get() {
	      let node = DocumentPrototypeActiveElement.call(this);

	      if (isNull(node)) {
	        return node;
	      }

	      while (!isUndefined(getNodeOwnerKey$1(node))) {
	        node = parentElementGetter.call(node);
	      }

	      if (node.tagName === 'HTML') {
	        // IE 11. Active element should never be html element
	        node = document.body;
	      }

	      return node;
	    },

	    enumerable: true,
	    configurable: true
	  });
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	{
	  apply();
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	function detect$2() {
	  return typeof window.ShadowRoot === 'undefined';
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function apply$1() {
	  window.ShadowRoot = SyntheticShadowRoot;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	if (detect$2()) {
	  apply$1();
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function detect$3() {
	  // Don't apply polyfill when ProxyCompat is enabled.
	  if ('getKey' in Proxy) {
	    return false;
	  }

	  const proxy = new Proxy([3, 4], {});
	  const res = [1, 2].concat(proxy);
	  return res.length !== 4;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const {
	  isConcatSpreadable
	} = Symbol;
	const {
	  isArray: isArray$2
	} = Array;
	const {
	  slice: ArraySlice$1,
	  unshift: ArrayUnshift$1,
	  shift: ArrayShift
	} = Array.prototype;

	function isObject$2(O) {
	  return typeof O === 'object' ? O !== null : typeof O === 'function';
	} // https://www.ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable


	function isSpreadable(O) {
	  if (!isObject$2(O)) {
	    return false;
	  }

	  const spreadable = O[isConcatSpreadable];
	  return spreadable !== undefined ? Boolean(spreadable) : isArray$2(O);
	} // https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat


	function ArrayConcatPolyfill(...args) {
	  const O = Object(this);
	  const A = [];
	  let N = 0;
	  const items = ArraySlice$1.call(arguments);
	  ArrayUnshift$1.call(items, O);

	  while (items.length) {
	    const E = ArrayShift.call(items);

	    if (isSpreadable(E)) {
	      let k = 0;
	      const length = E.length;

	      for (k; k < length; k += 1, N += 1) {
	        if (k in E) {
	          const subElement = E[k];
	          A[N] = subElement;
	        }
	      }
	    } else {
	      A[N] = E;
	      N += 1;
	    }
	  }

	  return A;
	}

	function apply$2() {
	  Array.prototype.concat = ArrayConcatPolyfill;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	if (detect$3()) {
	  apply$2();
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const composedDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, 'composed');

	function detect$4() {
	  if (!composedDescriptor) {
	    // No need to apply this polyfill if this client completely lacks
	    // support for the composed property.
	    return false;
	  } // Assigning a throwaway click event here to suppress a ts error when we
	  // pass clickEvent into the composed getter below. The error is:
	  // [ts] Variable 'clickEvent' is used before being assigned.


	  let clickEvent = new Event('click');
	  const button = document.createElement('button');
	  button.addEventListener('click', event => clickEvent = event);
	  button.click();
	  return !composedDescriptor.get.call(clickEvent);
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const originalClickDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'click');

	function handleClick(event) {
	  Object.defineProperty(event, 'composed', {
	    configurable: true,
	    enumerable: true,

	    get() {
	      return true;
	    }

	  });
	}

	function apply$3() {
	  HTMLElement.prototype.click = function () {
	    addEventListener.call(this, 'click', handleClick);

	    try {
	      originalClickDescriptor.value.call(this);
	    } catch (ex) {
	      throw ex;
	    } finally {
	      removeEventListener.call(this, 'click', handleClick);
	    }
	  };
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	if (detect$4()) {
	  apply$3();
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function detect$5() {
	  return Object.getOwnPropertyDescriptor(Event.prototype, 'composed') === undefined;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function apply$4() {
	  // https://github.com/w3c/webcomponents/issues/513#issuecomment-224183937
	  const composedEvents = assign(create(null), {
	    blur: 1,
	    focus: 1,
	    focusin: 1,
	    focusout: 1,
	    click: 1,
	    dblclick: 1,
	    mousedown: 1,
	    mouseenter: 1,
	    mouseleave: 1,
	    mousemove: 1,
	    mouseout: 1,
	    mouseover: 1,
	    mouseup: 1,
	    wheel: 1,
	    beforeinput: 1,
	    input: 1,
	    keydown: 1,
	    keyup: 1,
	    compositionstart: 1,
	    compositionupdate: 1,
	    compositionend: 1,
	    touchstart: 1,
	    touchend: 1,
	    touchmove: 1,
	    touchcancel: 1,
	    pointerover: 1,
	    pointerenter: 1,
	    pointerdown: 1,
	    pointermove: 1,
	    pointerup: 1,
	    pointercancel: 1,
	    pointerout: 1,
	    pointerleave: 1,
	    gotpointercapture: 1,
	    lostpointercapture: 1,
	    dragstart: 1,
	    drag: 1,
	    dragenter: 1,
	    dragleave: 1,
	    dragover: 1,
	    drop: 1,
	    dragend: 1,
	    DOMActivate: 1,
	    DOMFocusIn: 1,
	    DOMFocusOut: 1,
	    keypress: 1
	  }); // Composed for Native events

	  Object.defineProperties(Event.prototype, {
	    composed: {
	      get() {
	        const {
	          type
	        } = this;
	        return composedEvents[type] === 1;
	      },

	      configurable: true,
	      enumerable: true
	    }
	  });
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	if (detect$5()) {
	  apply$4();
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const {
	  CustomEvent: OriginalCustomEvent
	} = window;

	function PatchedCustomEvent(type, eventInitDict) {
	  const event = new OriginalCustomEvent(type, eventInitDict); // support for composed on custom events

	  Object.defineProperties(event, {
	    composed: {
	      // We can't use "value" here, because IE11 doesn't like mixing and matching
	      // value with get() from Event.prototype.
	      get() {
	        return !!(eventInitDict && eventInitDict.composed);
	      },

	      configurable: true,
	      enumerable: true
	    }
	  });
	  return event;
	}

	function apply$5() {
	  window.CustomEvent = PatchedCustomEvent;
	  window.CustomEvent.prototype = OriginalCustomEvent.prototype;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function detect$6() {
	  // We need to check if CustomEvent is our PatchedCustomEvent because jest
	  // will reset the window object but not constructos and prototypes (e.g.,
	  // Event.prototype).
	  // https://github.com/jsdom/jsdom#shared-constructors-and-prototypes
	  return window.CustomEvent !== PatchedCustomEvent;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	if (detect$6()) {
	  apply$5();
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function apply$6() {
	  const originalComposedGetter = Object.getOwnPropertyDescriptor(Event.prototype, 'composed').get;
	  Object.defineProperties(FocusEvent.prototype, {
	    composed: {
	      get() {
	        const {
	          isTrusted
	        } = this;
	        const composed = originalComposedGetter.call(this);

	        if (isTrusted && composed === false) {
	          return true;
	        }

	        return composed;
	      },

	      enumerable: true,
	      configurable: true
	    }
	  });
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	{
	  apply$6();
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	/**
	 * This is a descriptor map that contains
	 * all standard properties that a Custom Element can support (including AOM properties), which
	 * determines what kind of capabilities the Base HTML Element and
	 * Base Lightning Element should support.
	 */

	const HTMLElementOriginalDescriptors = create(null);
	forEach.call(ElementPrototypeAriaPropertyNames, propName => {
	  // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
	  // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
	  const descriptor = getPropertyDescriptor(HTMLElement.prototype, propName);

	  if (!isUndefined(descriptor)) {
	    HTMLElementOriginalDescriptors[propName] = descriptor;
	  }
	});
	forEach.call(defaultDefHTMLPropertyNames, propName => {
	  // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
	  // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
	  // this category, so, better to be sure.
	  const descriptor = getPropertyDescriptor(HTMLElement.prototype, propName);

	  if (!isUndefined(descriptor)) {
	    HTMLElementOriginalDescriptors[propName] = descriptor;
	  }
	});
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	const GlobalEvent = Event; // caching global reference to avoid poisoning

	/**
	 * This operation is called with a descriptor of an standard html property
	 * that a Custom Element can support (including AOM properties), which
	 * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
	 * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
	 */

	function createBridgeToElementDescriptor(propName, descriptor) {
	  const {
	    get,
	    set,
	    enumerable,
	    configurable
	  } = descriptor;

	  if (!isFunction(get)) {
	    if (process.env.NODE_ENV !== 'production') {
	      assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard getter.`);
	    }

	    throw new TypeError();
	  }

	  if (!isFunction(set)) {
	    if (process.env.NODE_ENV !== 'production') {
	      assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard setter.`);
	    }

	    throw new TypeError();
	  }

	  return {
	    enumerable,
	    configurable,

	    get() {
	      const vm = getComponentVM(this);

	      if (process.env.NODE_ENV !== 'production') {
	        assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	      }

	      if (isBeingConstructed(vm)) {
	        if (process.env.NODE_ENV !== 'production') {
	          assert.logError(`${vm} constructor should not read the value of property "${propName}". The owner component has not yet set the value. Instead use the constructor to set default values for properties.`, vm.elm);
	        }

	        return;
	      }

	      observeMutation(this, propName);
	      return get.call(vm.elm);
	    },

	    set(newValue) {
	      const vm = getComponentVM(this);

	      if (process.env.NODE_ENV !== 'production') {
	        assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	        assert.invariant(!isRendering, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${propName}`);
	        assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentAsString(this)}': The result must not have attributes.`);
	        assert.invariant(!isObject(newValue) || isNull(newValue), `Invalid value "${newValue}" for "${propName}" of ${vm}. Value cannot be an object, must be a primitive value.`);
	      }

	      if (newValue !== vm.cmpProps[propName]) {
	        vm.cmpProps[propName] = newValue;

	        if (vm.idx > 0) {
	          // perf optimization to skip this step if not in the DOM
	          notifyMutation(this, propName);
	        }
	      }

	      return set.call(vm.elm, newValue);
	    }

	  };
	}

	function getLinkedElement(cmp) {
	  return getComponentVM(cmp).elm;
	}

	function BaseLightningElement() {
	  // This should be as performant as possible, while any initialization should be done lazily
	  if (isNull(vmBeingConstructed)) {
	    throw new ReferenceError();
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vmBeingConstructed && "cmpRoot" in vmBeingConstructed, `${vmBeingConstructed} is not a vm.`);
	    assert.invariant(vmBeingConstructed.elm instanceof HTMLElement, `Component creation requires a DOM element to be associated to ${vmBeingConstructed}.`);
	  }

	  const vm = vmBeingConstructed;
	  const {
	    elm,
	    cmpRoot,
	    uid
	  } = vm;
	  const component = this;
	  vm.component = component; // interaction hooks
	  // We are intentionally hiding this argument from the formal API of LWCElement because
	  // we don't want folks to know about it just yet.

	  if (arguments.length === 1) {
	    const {
	      callHook,
	      setHook,
	      getHook
	    } = arguments[0];
	    vm.callHook = callHook;
	    vm.setHook = setHook;
	    vm.getHook = getHook;
	  } // linking elm, shadow root and component with the VM


	  setHiddenField(component, ViewModelReflection, vm);
	  setInternalField(elm, ViewModelReflection, vm);
	  setInternalField(cmpRoot, ViewModelReflection, vm);
	  setNodeKey(elm, uid);

	  if (process.env.NODE_ENV !== 'production') {
	    patchComponentWithRestrictions(component, EmptyObject);
	    patchShadowRootWithRestrictions(cmpRoot, EmptyObject);
	  }
	} // HTML Element - The Good Parts


	BaseLightningElement.prototype = {
	  constructor: BaseLightningElement,

	  dispatchEvent(event) {
	    const elm = getLinkedElement(this);
	    const vm = getComponentVM(this);

	    if (process.env.NODE_ENV !== 'production') {
	      if (arguments.length === 0) {
	        throw new Error(`Failed to execute 'dispatchEvent' on ${getComponentAsString(this)}: 1 argument required, but only 0 present.`);
	      }

	      if (!(event instanceof GlobalEvent)) {
	        throw new Error(`Failed to execute 'dispatchEvent' on ${getComponentAsString(this)}: parameter 1 is not of type 'Event'.`);
	      }

	      const {
	        type: evtName
	      } = event;
	      assert.isFalse(isBeingConstructed(vm), `this.dispatchEvent() should not be called during the construction of the custom element for ${getComponentAsString(this)} because no one is listening for the event "${evtName}" just yet.`);

	      if (vm.idx === 0) {
	        assert.logWarning(`Unreachable event "${evtName}" dispatched from disconnected element ${getComponentAsString(this)}. Events can only reach the parent element after the element is connected (via connectedCallback) and before the element is disconnected(via disconnectedCallback).`, elm);
	      }

	      if (!evtName.match(/^[a-z]+([a-z0-9]+)?$/)) {
	        assert.logWarning(`Invalid event type "${evtName}" dispatched in element ${getComponentAsString(this)}. Event name should only contain lowercase alphanumeric characters.`, elm);
	      }
	    }

	    return dispatchEvent.call(elm, event);
	  },

	  addEventListener(type, listener, options) {
	    const vm = getComponentVM(this);

	    if (process.env.NODE_ENV !== 'production') {
	      assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	      assert.invariant(!isRendering, `${vmBeingRendered}.render() method has side effects on the state of ${vm} by adding an event listener for "${type}".`);
	      assert.invariant(isFunction(listener), `Invalid second argument for this.template.addEventListener() in ${vm} for event "${type}". Expected an EventListener but received ${listener}.`);
	    }

	    const wrappedListener = getWrappedComponentsListener(vm, listener);
	    vm.elm.addEventListener(type, wrappedListener, options);
	  },

	  removeEventListener(type, listener, options) {
	    const vm = getComponentVM(this);

	    if (process.env.NODE_ENV !== 'production') {
	      assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    }

	    const wrappedListener = getWrappedComponentsListener(vm, listener);
	    vm.elm.removeEventListener(type, wrappedListener, options);
	  },

	  setAttributeNS(ns, attrName, value) {
	    const elm = getLinkedElement(this);

	    if (process.env.NODE_ENV !== 'production') {
	      assert.isFalse(isBeingConstructed(getComponentVM(this)), `Failed to construct '${getComponentAsString(this)}': The result must not have attributes.`);
	    }

	    unlockAttribute(elm, attrName);
	    elm.setAttributeNS.apply(elm, arguments);
	    lockAttribute(elm, attrName);
	  },

	  removeAttributeNS(ns, attrName) {
	    const elm = getLinkedElement(this);
	    unlockAttribute(elm, attrName);
	    elm.removeAttributeNS.apply(elm, arguments);
	    lockAttribute(elm, attrName);
	  },

	  removeAttribute(attrName) {
	    const elm = getLinkedElement(this);
	    unlockAttribute(elm, attrName);
	    elm.removeAttribute.apply(elm, arguments);
	    lockAttribute(elm, attrName);
	  },

	  setAttribute(attrName, value) {
	    const elm = getLinkedElement(this);

	    if (process.env.NODE_ENV !== 'production') {
	      assert.isFalse(isBeingConstructed(getComponentVM(this)), `Failed to construct '${getComponentAsString(this)}': The result must not have attributes.`);
	    }

	    unlockAttribute(elm, attrName);
	    elm.setAttribute.apply(elm, arguments);
	    lockAttribute(elm, attrName);
	  },

	  getAttribute(attrName) {
	    const elm = getLinkedElement(this);
	    unlockAttribute(elm, attrName);
	    const value = elm.getAttribute.apply(elm, arguments);
	    lockAttribute(elm, attrName);
	    return value;
	  },

	  getAttributeNS(ns, attrName) {
	    const elm = getLinkedElement(this);
	    unlockAttribute(elm, attrName);
	    const value = elm.getAttributeNS.apply(elm, arguments);
	    lockAttribute(elm, attrName);
	    return value;
	  },

	  getBoundingClientRect() {
	    const elm = getLinkedElement(this);

	    if (process.env.NODE_ENV !== 'production') {
	      const vm = getComponentVM(this);
	      assert.isFalse(isBeingConstructed(vm), `this.getBoundingClientRect() should not be called during the construction of the custom element for ${getComponentAsString(this)} because the element is not yet in the DOM, instead, you can use it in one of the available life-cycle hooks.`);
	    }

	    return elm.getBoundingClientRect();
	  },

	  /**
	   * Returns the first element that is a descendant of node that
	   * matches selectors.
	   */
	  // querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
	  // querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
	  querySelector(selectors) {
	    const vm = getComponentVM(this);

	    if (process.env.NODE_ENV !== 'production') {
	      assert.isFalse(isBeingConstructed(vm), `this.querySelector() cannot be called during the construction of the custom element for ${getComponentAsString(this)} because no children has been added to this element yet.`);
	    }

	    const {
	      elm
	    } = vm;
	    return elm.querySelector(selectors);
	  },

	  /**
	   * Returns all element descendants of node that
	   * match selectors.
	   */
	  // querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>,
	  // querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>,
	  querySelectorAll(selectors) {
	    const vm = getComponentVM(this);

	    if (process.env.NODE_ENV !== 'production') {
	      assert.isFalse(isBeingConstructed(vm), `this.querySelectorAll() cannot be called during the construction of the custom element for ${getComponentAsString(this)} because no children has been added to this element yet.`);
	    }

	    const {
	      elm
	    } = vm;
	    return elm.querySelectorAll(selectors);
	  },

	  /**
	   * Returns all element descendants of node that
	   * match the provided tagName.
	   */
	  getElementsByTagName(tagNameOrWildCard) {
	    const vm = getComponentVM(this);

	    if (process.env.NODE_ENV !== 'production') {
	      assert.isFalse(isBeingConstructed(vm), `this.getElementsByTagName() cannot be called during the construction of the custom element for ${getComponentAsString(this)} because no children has been added to this element yet.`);
	    }

	    const {
	      elm
	    } = vm;
	    return elm.getElementsByTagName(tagNameOrWildCard);
	  },

	  /**
	   * Returns all element descendants of node that
	   * match the provide classnames.
	   */
	  getElementsByClassName(names) {
	    const vm = getComponentVM(this);

	    if (process.env.NODE_ENV !== 'production') {
	      assert.isFalse(isBeingConstructed(vm), `this.getElementsByClassName() cannot be called during the construction of the custom element for ${getComponentAsString(this)} because no children has been added to this element yet.`);
	    }

	    const {
	      elm
	    } = vm;
	    return elm.getElementsByClassName(names);
	  },

	  get classList() {
	    if (process.env.NODE_ENV !== 'production') {
	      const vm = getComponentVM(this); // TODO: this still fails in dev but works in production, eventually, we should just throw in all modes

	      assert.isFalse(isBeingConstructed(vm), `Failed to construct ${vm}: The result must not have attributes. Adding or tampering with classname in constructor is not allowed in a web component, use connectedCallback() instead.`);
	    }

	    return getLinkedElement(this).classList;
	  },

	  get template() {
	    const vm = getComponentVM(this);

	    if (process.env.NODE_ENV !== 'production') {
	      assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    }

	    return vm.cmpRoot;
	  },

	  get shadowRoot() {
	    // From within the component instance, the shadowRoot is always
	    // reported as "closed". Authors should rely on this.template instead.
	    return null;
	  },

	  render() {
	    const vm = getComponentVM(this);
	    const {
	      template
	    } = vm.def;
	    return isUndefined(template) ? defaultEmptyTemplate : template;
	  },

	  toString() {
	    const vm = getComponentVM(this);

	    if (process.env.NODE_ENV !== 'production') {
	      assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    }

	    return `[object ${vm.def.name}]`;
	  }

	};
	const baseDescriptors = ArrayReduce.call(getOwnPropertyNames(HTMLElementOriginalDescriptors), (descriptors, propName) => {
	  descriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
	  return descriptors;
	}, create(null));
	defineProperties(BaseLightningElement.prototype, baseDescriptors);

	if (process.env.NODE_ENV !== 'production') {
	  patchLightningElementPrototypeWithRestrictions(BaseLightningElement.prototype, EmptyObject);
	}

	freeze(BaseLightningElement);
	seal(BaseLightningElement.prototype);
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// A bridge descriptor is a descriptor whose job is just to get the component instance
	// from the element instance, and get the value or set a new value on the component.
	// This means that across different elements, similar names can get the exact same
	// descriptor, so we can cache them:

	const cachedGetterByKey = create(null);
	const cachedSetterByKey = create(null);

	function createGetter(key) {
	  let fn = cachedGetterByKey[key];

	  if (isUndefined(fn)) {
	    fn = cachedGetterByKey[key] = function () {
	      const vm = getCustomElementVM(this);
	      const {
	        getHook
	      } = vm;
	      return getHook(vm.component, key);
	    };
	  }

	  return fn;
	}

	function createSetter(key) {
	  let fn = cachedSetterByKey[key];

	  if (isUndefined(fn)) {
	    fn = cachedSetterByKey[key] = function (newValue) {
	      const vm = getCustomElementVM(this);
	      const {
	        setHook
	      } = vm;
	      setHook(vm.component, key, newValue);
	    };
	  }

	  return fn;
	}

	function createMethodCaller(methodName) {
	  return function () {
	    const vm = getCustomElementVM(this);
	    const {
	      callHook,
	      component
	    } = vm;
	    const fn = component[methodName];
	    return callHook(vm.component, fn, ArraySlice.call(arguments));
	  };
	}

	function HTMLBridgeElementFactory(SuperClass, props, methods) {
	  let HTMLBridgeElement;
	  /**
	   * Modern browsers will have all Native Constructors as regular Classes
	   * and must be instantiated with the new keyword. In older browsers,
	   * specifically IE11, those are objects with a prototype property defined,
	   * since they are not supposed to be extended or instantiated with the
	   * new keyword. This forking logic supports both cases, specifically because
	   * wc.ts relies on the construction path of the bridges to create new
	   * fully qualifying web components.
	   */

	  if (isFunction(SuperClass)) {
	    HTMLBridgeElement = class extends SuperClass {};
	  } else {
	    HTMLBridgeElement = function () {
	      // Bridge classes are not supposed to be instantiated directly in
	      // browsers that do not support web components.
	      throw new TypeError('Illegal constructor');
	    }; // prototype inheritance dance


	    setPrototypeOf(HTMLBridgeElement, SuperClass);
	    setPrototypeOf(HTMLBridgeElement.prototype, SuperClass.prototype);
	    defineProperty(HTMLBridgeElement.prototype, 'constructor', {
	      writable: true,
	      configurable: true,
	      value: HTMLBridgeElement
	    });
	  }

	  const descriptors = create(null); // expose getters and setters for each public props on the new Element Bridge

	  for (let i = 0, len = props.length; i < len; i += 1) {
	    const propName = props[i];
	    descriptors[propName] = {
	      get: createGetter(propName),
	      set: createSetter(propName),
	      enumerable: true,
	      configurable: true
	    };
	  } // expose public methods as props on the new Element Bridge


	  for (let i = 0, len = methods.length; i < len; i += 1) {
	    const methodName = methods[i];
	    descriptors[methodName] = {
	      value: createMethodCaller(methodName),
	      writable: true,
	      configurable: true
	    };
	  }

	  defineProperties(HTMLBridgeElement.prototype, descriptors);
	  return HTMLBridgeElement;
	}

	const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElement, getOwnPropertyNames(HTMLElementOriginalDescriptors), []);
	freeze(BaseBridgeElement);
	seal(BaseBridgeElement.prototype);
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	const CtorToDefMap = new WeakMap();

	function getCtorProto(Ctor, subclassComponentName) {
	  let proto = getPrototypeOf(Ctor);

	  if (isNull(proto)) {
	    throw new ReferenceError(`Invalid prototype chain for ${subclassComponentName}, you must extend LightningElement.`);
	  } // covering the cases where the ref is circular in AMD


	  if (isCircularModuleDependency(proto)) {
	    const p = resolveCircularModuleDependency(proto);

	    if (process.env.NODE_ENV !== 'production') {
	      if (isNull(p)) {
	        throw new ReferenceError(`Circular module dependency for ${subclassComponentName}, must resolve to a constructor that extends LightningElement.`);
	      }
	    } // escape hatch for Locker and other abstractions to provide their own base class instead
	    // of our Base class without having to leak it to user-land. If the circular function returns
	    // itself, that's the signal that we have hit the end of the proto chain, which must always
	    // be base.


	    proto = p === proto ? BaseLightningElement : p;
	  }

	  return proto;
	}

	function isElementComponent(Ctor, subclassComponentName, protoSet) {
	  protoSet = protoSet || [];

	  if (!Ctor || ArrayIndexOf.call(protoSet, Ctor) >= 0) {
	    return false; // null, undefined, or circular prototype definition
	  }

	  const proto = getCtorProto(Ctor, subclassComponentName);

	  if (proto === BaseLightningElement) {
	    return true;
	  }

	  getComponentDef(proto, subclassComponentName); // ensuring that the prototype chain is already expanded

	  ArrayPush.call(protoSet, Ctor);
	  return isElementComponent(proto, subclassComponentName, protoSet);
	}

	function createComponentDef(Ctor, meta, subclassComponentName) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(isElementComponent(Ctor, subclassComponentName), `${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`); // local to dev block

	    const ctorName = Ctor.name; // Removing the following assert until https://bugs.webkit.org/show_bug.cgi?id=190140 is fixed.
	    // assert.isTrue(ctorName && isString(ctorName), `${toString(Ctor)} should have a "name" property with string value, but found ${ctorName}.`);

	    assert.isTrue(Ctor.constructor, `Missing ${ctorName}.constructor, ${ctorName} should have a "constructor" property.`);
	  }

	  const {
	    name,
	    template
	  } = meta;
	  let decoratorsMeta = getDecoratorsRegisteredMeta(Ctor); // TODO: eventually, the compiler should do this call directly, but we will also
	  // have to fix all our tests, which are using this declaration manually.

	  if (isUndefined(decoratorsMeta)) {
	    registerDecorators(Ctor, {
	      publicMethods: getOwnValue(Ctor, 'publicMethods'),
	      publicProps: getOwnValue(Ctor, 'publicProps'),
	      track: getOwnValue(Ctor, 'track'),
	      wire: getOwnValue(Ctor, 'wire')
	    });
	    decoratorsMeta = getDecoratorsRegisteredMeta(Ctor);
	  }

	  let {
	    props,
	    methods,
	    wire,
	    track
	  } = decoratorsMeta || EmptyObject;
	  const proto = Ctor.prototype;
	  let {
	    connectedCallback,
	    disconnectedCallback,
	    renderedCallback,
	    errorCallback,
	    render
	  } = proto;
	  const superProto = getCtorProto(Ctor, subclassComponentName);
	  const superDef = superProto !== BaseLightningElement ? getComponentDef(superProto, subclassComponentName) : null;
	  const SuperBridge = isNull(superDef) ? BaseBridgeElement : superDef.bridge;
	  const bridge = HTMLBridgeElementFactory(SuperBridge, getOwnPropertyNames(props), getOwnPropertyNames(methods));

	  if (!isNull(superDef)) {
	    props = assign(create(null), superDef.props, props);
	    methods = assign(create(null), superDef.methods, methods);
	    wire = superDef.wire || wire ? assign(create(null), superDef.wire, wire) : undefined;
	    track = assign(create(null), superDef.track, track);
	    connectedCallback = connectedCallback || superDef.connectedCallback;
	    disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
	    renderedCallback = renderedCallback || superDef.renderedCallback;
	    errorCallback = errorCallback || superDef.errorCallback;
	    render = render || superDef.render;
	  }

	  props = assign(create(null), HTML_PROPS, props);
	  const def = {
	    ctor: Ctor,
	    name,
	    wire,
	    track,
	    props,
	    methods,
	    bridge,
	    template,
	    connectedCallback,
	    disconnectedCallback,
	    renderedCallback,
	    errorCallback,
	    render
	  };

	  if (process.env.NODE_ENV !== 'production') {
	    freeze(Ctor.prototype);
	  }

	  return def;
	}

	function isComponentConstructor(Ctor) {
	  return isElementComponent(Ctor, Ctor.name);
	}

	function getOwnValue(o, key) {
	  const d = getOwnPropertyDescriptor(o, key);
	  return d && d.value;
	}

	function getComponentDef(Ctor, subclassComponentName) {
	  let def = CtorToDefMap.get(Ctor);

	  if (def) {
	    return def;
	  }

	  let meta = getComponentRegisteredMeta(Ctor);

	  if (isUndefined(meta)) {
	    // TODO: remove this workaround:
	    // this is temporary until
	    // all tests are updated to call registerComponent:
	    meta = {
	      template: undefined,
	      name: Ctor.name
	    };
	  }

	  def = createComponentDef(Ctor, meta, subclassComponentName || Ctor.name);
	  CtorToDefMap.set(Ctor, def);
	  return def;
	}
	/**
	 * Returns the component constructor for a given HTMLElement if it can be found
	 * @param {HTMLElement} element
	 * @return {ComponentConstructor | null}
	 */


	function getComponentConstructor(elm) {
	  let ctor = null;

	  if (elm instanceof HTMLElement) {
	    const vm = getInternalField(elm, ViewModelReflection);

	    if (!isUndefined(vm)) {
	      ctor = vm.def.ctor;
	    }
	  }

	  return ctor;
	} // Only set prototype for public methods and properties
	// No DOM Patching occurs here


	function setElementProto(elm, def) {
	  setPrototypeOf(elm, def.bridge.prototype);
	}

	const HTML_PROPS = ArrayReduce.call(getOwnPropertyNames(HTMLElementOriginalDescriptors), (props, propName) => {
	  const attrName = getAttrNameFromPropName(propName);
	  props[propName] = {
	    config: 3,
	    type: 'any',
	    attr: attrName
	  };
	  return props;
	}, create(null));
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// Object of type ShadowRoot for instance checks

	const NativeShadowRoot = window.ShadowRoot;
	const isNativeShadowRootAvailable$1 = typeof NativeShadowRoot !== "undefined";
	let idx = 0;
	let uid = 0;

	function callHook(cmp, fn, args) {
	  return fn.apply(cmp, args);
	}

	function setHook(cmp, prop, newValue) {
	  cmp[prop] = newValue;
	}

	function getHook(cmp, prop) {
	  return cmp[prop];
	} // DO NOT CHANGE this:
	// these two values are used by the faux-shadow implementation to traverse the DOM


	const OwnerKey$1 = '$$OwnerKey$$';
	const OwnKey$1 = '$$OwnKey$$';

	function addInsertionIndex(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    assert.invariant(vm.idx === 0, `${vm} is already locked to a previously generated idx.`);
	  }

	  vm.idx = ++idx;
	  const {
	    connected
	  } = Services;

	  if (connected) {
	    invokeServiceHook(vm, connected);
	  }

	  const {
	    connectedCallback
	  } = vm.def;

	  if (!isUndefined(connectedCallback)) {
	    if (process.env.NODE_ENV !== 'production') {
	      startMeasure(vm, 'connectedCallback');
	    }

	    invokeComponentCallback(vm, connectedCallback);

	    if (process.env.NODE_ENV !== 'production') {
	      endMeasure(vm, 'connectedCallback');
	    }
	  }
	}

	function removeInsertionIndex(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    assert.invariant(vm.idx > 0, `${vm} is not locked to a previously generated idx.`);
	  }

	  vm.idx = 0;
	  const {
	    disconnected
	  } = Services;

	  if (disconnected) {
	    invokeServiceHook(vm, disconnected);
	  }

	  const {
	    disconnectedCallback
	  } = vm.def;

	  if (!isUndefined(disconnectedCallback)) {
	    if (process.env.NODE_ENV !== 'production') {
	      startMeasure(vm, 'disconnectedCallback');
	    }

	    invokeComponentCallback(vm, disconnectedCallback);

	    if (process.env.NODE_ENV !== 'production') {
	      endMeasure(vm, 'disconnectedCallback');
	    }
	  }
	}

	function renderVM(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  if (vm.isDirty) {
	    rehydrate(vm);
	  }
	}

	function appendVM(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  if (vm.idx !== 0) {
	    return; // already appended
	  }

	  addInsertionIndex(vm);
	}

	function removeVM(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  if (vm.idx === 0) {
	    return; // already removed
	  }

	  removeInsertionIndex(vm); // just in case it comes back, with this we guarantee re-rendering it

	  vm.isDirty = true;
	  clearReactiveListeners(vm); // At this point we need to force the removal of all children because
	  // we don't have a way to know that children custom element were removed
	  // from the DOM. Once we move to use Custom Element APIs, we can remove this
	  // because the disconnectedCallback will be triggered automatically when
	  // removed from the DOM.

	  resetShadowRoot(vm);
	}

	function createVM(tagName, elm, Ctor, options) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(elm instanceof HTMLElement, `VM creation requires a DOM element instead of ${elm}.`);
	  }

	  const def = getComponentDef(Ctor);
	  const {
	    isRoot,
	    mode,
	    fallback
	  } = options;
	  const shadowRootOptions = {
	    mode,
	    delegatesFocus: !!Ctor.delegatesFocus
	  };
	  uid += 1;
	  const vm = {
	    uid,
	    idx: 0,
	    isScheduled: false,
	    isDirty: true,
	    isRoot: isTrue(isRoot),
	    fallback,
	    mode,
	    def,
	    elm: elm,
	    data: EmptyObject,
	    context: create(null),
	    cmpProps: create(null),
	    cmpTrack: create(null),
	    cmpState: undefined,
	    cmpSlots: fallback ? create(null) : undefined,
	    cmpTemplate: undefined,
	    cmpRoot: elm.attachShadow(shadowRootOptions),
	    callHook,
	    setHook,
	    getHook,
	    component: undefined,
	    children: EmptyArray,
	    // used to track down all object-key pairs that makes this vm reactive
	    deps: []
	  };

	  if (process.env.NODE_ENV !== 'production') {
	    vm.toString = () => {
	      return `[object:vm ${def.name} (${vm.idx})]`;
	    };
	  } // create component instance associated to the vm and the element


	  createComponent(vm, Ctor); // link component to the wire service

	  linkComponent(vm);
	}

	function rehydrate(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    assert.isTrue(vm.elm instanceof HTMLElement, `rehydration can only happen after ${vm} was patched the first time.`);
	  }

	  if (vm.idx > 0 && vm.isDirty) {
	    const children = renderComponent(vm);
	    vm.isScheduled = false;
	    patchShadowRoot(vm, children);
	    processPostPatchCallbacks(vm);
	  }
	}

	function patchErrorBoundaryVm(errorBoundaryVm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(errorBoundaryVm && "component" in errorBoundaryVm, `${errorBoundaryVm} is not a vm.`);
	    assert.isTrue(errorBoundaryVm.elm instanceof HTMLElement, `rehydration can only happen after ${errorBoundaryVm} was patched the first time.`);
	    assert.isTrue(errorBoundaryVm.isDirty, "rehydration recovery should only happen if vm has updated");
	  }

	  const children = renderComponent(errorBoundaryVm);
	  const {
	    elm,
	    cmpRoot,
	    fallback,
	    children: oldCh
	  } = errorBoundaryVm;
	  errorBoundaryVm.isScheduled = false;
	  errorBoundaryVm.children = children; // caching the new children collection
	  // patch function mutates vnodes by adding the element reference,
	  // however, if patching fails it contains partial changes.
	  // patch failures are caught in flushRehydrationQueue

	  patchChildren(elm, cmpRoot, oldCh, children, fallback);
	  processPostPatchCallbacks(errorBoundaryVm);
	}

	function patchShadowRoot(vm, children) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  const {
	    elm,
	    cmpRoot,
	    fallback,
	    children: oldCh
	  } = vm;
	  vm.children = children; // caching the new children collection

	  if (children.length === 0 && oldCh.length === 0) {
	    return; // nothing to do here
	  }

	  let error;

	  if (process.env.NODE_ENV !== 'production') {
	    startMeasure(vm, 'patch');
	  }

	  try {
	    // patch function mutates vnodes by adding the element reference,
	    // however, if patching fails it contains partial changes.
	    patchChildren(elm, cmpRoot, oldCh, children, fallback);
	  } catch (e) {
	    error = Object(e);
	  } finally {
	    if (process.env.NODE_ENV !== 'production') {
	      endMeasure(vm, 'patch');
	    }

	    if (!isUndefined(error)) {
	      const errorBoundaryVm = getErrorBoundaryVMFromOwnElement(vm);

	      if (isUndefined(errorBoundaryVm)) {
	        throw error; // tslint:disable-line
	      }

	      recoverFromLifeCycleError(vm, errorBoundaryVm, error); // synchronously render error boundary's alternative view
	      // to recover in the same tick

	      if (errorBoundaryVm.isDirty) {
	        patchErrorBoundaryVm(errorBoundaryVm);
	      }
	    }
	  }
	}

	function processPostPatchCallbacks(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  const {
	    rendered
	  } = Services;

	  if (rendered) {
	    invokeServiceHook(vm, rendered);
	  }

	  const {
	    renderedCallback
	  } = vm.def;

	  if (!isUndefined(renderedCallback)) {
	    if (process.env.NODE_ENV !== 'production') {
	      startMeasure(vm, 'renderedCallback');
	    }

	    invokeComponentCallback(vm, renderedCallback);

	    if (process.env.NODE_ENV !== 'production') {
	      endMeasure(vm, 'renderedCallback');
	    }
	  }
	}

	let rehydrateQueue = [];

	function flushRehydrationQueue() {
	  startGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);

	  if (process.env.NODE_ENV !== 'production') {
	    assert.invariant(rehydrateQueue.length, `If rehydrateQueue was scheduled, it is because there must be at least one VM on this pending queue instead of ${rehydrateQueue}.`);
	  }

	  const vms = rehydrateQueue.sort((a, b) => a.idx - b.idx);
	  rehydrateQueue = []; // reset to a new queue

	  for (let i = 0, len = vms.length; i < len; i += 1) {
	    const vm = vms[i];

	    try {
	      rehydrate(vm);
	    } catch (error) {
	      const errorBoundaryVm = getErrorBoundaryVMFromParentElement(vm);

	      if (isUndefined(errorBoundaryVm)) {
	        if (i + 1 < len) {
	          // pieces of the queue are still pending to be rehydrated, those should have priority
	          if (rehydrateQueue.length === 0) {
	            addCallbackToNextTick(flushRehydrationQueue);
	          }

	          ArrayUnshift.apply(rehydrateQueue, ArraySlice.call(vms, i + 1));
	        } // we need to end the measure before throwing.


	        endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE); // rethrowing the original error will break the current tick, but since the next tick is
	        // already scheduled, it should continue patching the rest.

	        throw error; // tslint:disable-line
	      } // we only recover if error boundary is present in the hierarchy


	      recoverFromLifeCycleError(vm, errorBoundaryVm, error);

	      if (errorBoundaryVm.isDirty) {
	        patchErrorBoundaryVm(errorBoundaryVm);
	      }
	    }
	  }

	  endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);
	}

	function recoverFromLifeCycleError(failedVm, errorBoundaryVm, error) {
	  if (isUndefined(error.wcStack)) {
	    error.wcStack = getErrorComponentStack(failedVm.elm);
	  }

	  resetShadowRoot(failedVm); // remove offenders

	  const {
	    errorCallback
	  } = errorBoundaryVm.def;

	  if (process.env.NODE_ENV !== 'production') {
	    startMeasure(errorBoundaryVm, 'errorCallback');
	  } // error boundaries must have an ErrorCallback


	  invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);

	  if (process.env.NODE_ENV !== 'production') {
	    endMeasure(errorBoundaryVm, 'errorCallback');
	  }
	}

	function destroyChildren(children) {
	  for (let i = 0, len = children.length; i < len; i += 1) {
	    const vnode = children[i];

	    if (isNull(vnode)) {
	      continue;
	    }

	    const {
	      elm
	    } = vnode;

	    if (isUndefined(elm)) {
	      continue;
	    }

	    try {
	      // if destroy fails, it really means that the service hook or disconnect hook failed,
	      // we should just log the issue and continue our destroying procedure
	      vnode.hook.destroy(vnode);
	    } catch (e) {
	      if (process.env.NODE_ENV !== 'production') {
	        const vm = getCustomElementVM(elm);
	        assert.logError(`Internal Error: Failed to disconnect component ${vm}. ${e}`, elm);
	      }
	    }
	  }
	} // This is a super optimized mechanism to remove the content of the shadowRoot
	// without having to go into snabbdom. Especially useful when the reset is a consequence
	// of an error, in which case the children VNodes might not be representing the current
	// state of the DOM


	function resetShadowRoot(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  const {
	    children: oldCh,
	    fallback
	  } = vm;
	  vm.children = EmptyArray;

	  if (isTrue(fallback)) {
	    // faux-shadow does not have a real cmpRoot instance, instead
	    // we need to remove the content of the host entirely
	    innerHTMLSetter.call(vm.elm, '');
	  } else {
	    ShadowRootInnerHTMLSetter.call(vm.cmpRoot, '');
	  } // proper destroying mechanism for those vnodes that requires it


	  destroyChildren(oldCh);
	}

	function scheduleRehydration(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  if (!vm.isScheduled) {
	    vm.isScheduled = true;

	    if (rehydrateQueue.length === 0) {
	      addCallbackToNextTick(flushRehydrationQueue);
	    }

	    ArrayPush.call(rehydrateQueue, vm);
	  }
	}

	function getErrorBoundaryVMFromParentElement(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  const {
	    elm
	  } = vm;
	  const parentElm = elm && getParentOrHostElement(elm);
	  return getErrorBoundaryVM(parentElm);
	}

	function getErrorBoundaryVMFromOwnElement(vm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  const {
	    elm
	  } = vm;
	  return getErrorBoundaryVM(elm);
	}

	function getErrorBoundaryVM(startingElement) {
	  let elm = startingElement;
	  let vm;

	  while (!isNull(elm)) {
	    vm = getInternalField(elm, ViewModelReflection);

	    if (!isUndefined(vm) && !isUndefined(vm.def.errorCallback)) {
	      return vm;
	    }

	    elm = getParentOrHostElement(elm);
	  }
	}
	/**
	 * Returns the component stack. Used for errors messages only.
	 *
	 * @param {Element} startingElement
	 *
	 * @return {string} The component stack for errors.
	 */


	function getErrorComponentStack(startingElement) {
	  const wcStack = [];
	  let elm = startingElement;

	  do {
	    const currentVm = getInternalField(elm, ViewModelReflection);

	    if (!isUndefined(currentVm)) {
	      const tagName = tagNameGetter.call(elm);
	      const is = elm.getAttribute('is');
	      ArrayPush.call(wcStack, `<${StringToLowerCase.call(tagName)}${is ? ' is="${is}' : ''}>`);
	    }

	    elm = getParentOrHostElement(elm);
	  } while (!isNull(elm));

	  return wcStack.reverse().join('\n\t');
	}
	/**
	 * Finds the parent of the specified element. If shadow DOM is enabled, finds
	 * the host of the shadow root to escape the shadow boundary.
	 * @param {HTMLElement} elm
	 * @return {HTMLElement | null} the parent element, escaping any shadow root boundaries, if it exists
	 */


	function getParentOrHostElement(elm) {
	  const parentElement = parentElementGetter.call(elm); // If this is a shadow root, find the host instead

	  return isNull(parentElement) && isNativeShadowRootAvailable$1 ? getHostElement(elm) : parentElement;
	}
	/**
	 * Finds the host element, if it exists.
	 * @param {HTMLElement} elm
	 * @return {HTMLElement | null} the host element if it exists
	 */


	function getHostElement(elm) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(isNativeShadowRootAvailable$1, 'getHostElement should only be called if native shadow root is available');
	    assert.isTrue(isNull(parentElementGetter.call(elm)), `getHostElement should only be called if the parent element of ${elm} is null`);
	  }

	  const parentNode = parentNodeGetter.call(elm);
	  return parentNode instanceof NativeShadowRoot ? ShadowRootHostGetter.call(parentNode) : null;
	}

	function isNodeFromTemplate(node) {
	  if (isFalse(node instanceof Node)) {
	    return false;
	  }

	  return !isUndefined(getNodeOwnerKey$1(node));
	}

	function getNodeOwnerKey$1(node) {
	  return node[OwnerKey$1];
	}

	function setNodeOwnerKey$1(node, value) {
	  if (process.env.NODE_ENV !== 'production') {
	    // in dev-mode, we are more restrictive about what you can do with the owner key
	    defineProperty(node, OwnerKey$1, {
	      value,
	      enumerable: true
	    });
	  } else {
	    // in prod, for better perf, we just let it roll
	    node[OwnerKey$1] = value;
	  }
	}

	function getNodeKey$1(node) {
	  return node[OwnKey$1];
	}

	function setNodeKey(node, value) {
	  if (process.env.NODE_ENV !== 'production') {
	    // in dev-mode, we are more restrictive about what you can do with the own key
	    defineProperty(node, OwnKey$1, {
	      value,
	      enumerable: true
	    });
	  } else {
	    // in prod, for better perf, we just let it roll
	    node[OwnKey$1] = value;
	  }
	}

	function getCustomElementVM(elm) {
	  if (process.env.NODE_ENV !== 'production') {
	    const vm = getInternalField(elm, ViewModelReflection);
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  return getInternalField(elm, ViewModelReflection);
	}

	function getComponentVM(component) {
	  if (process.env.NODE_ENV !== 'production') {
	    const vm = getHiddenField(component, ViewModelReflection);
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  return getHiddenField(component, ViewModelReflection);
	}

	function getShadowRootVM(root) {
	  // TODO: this eventually should not rely on the symbol, and should use a Weak Ref
	  if (process.env.NODE_ENV !== 'production') {
	    const vm = getInternalField(root, ViewModelReflection);
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	  }

	  return getInternalField(root, ViewModelReflection);
	} // slow path routine
	// NOTE: we should probably more this routine to the faux shadow folder
	// and get the allocation to be cached by in the elm instead of in the VM


	function allocateInSlot(vm, children) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(vm && "cmpRoot" in vm, `${vm} is not a vm.`);
	    assert.invariant(isObject(vm.cmpSlots), `When doing manual allocation, there must be a cmpSlots object available.`);
	  }

	  const {
	    cmpSlots: oldSlots
	  } = vm;
	  const cmpSlots = vm.cmpSlots = create(null);

	  for (let i = 0, len = children.length; i < len; i += 1) {
	    const vnode = children[i];

	    if (isNull(vnode)) {
	      continue;
	    }

	    const data = vnode.data;
	    const slotName = data.attrs && data.attrs.slot || '';
	    const vnodes = cmpSlots[slotName] = cmpSlots[slotName] || []; // re-keying the vnodes is necessary to avoid conflicts with default content for the slot
	    // which might have similar keys. Each vnode will always have a key that
	    // starts with a numeric character from compiler. In this case, we add a unique
	    // notation for slotted vnodes keys, e.g.: `@foo:1:1`

	    vnode.key = `@${slotName}:${vnode.key}`;
	    ArrayPush.call(vnodes, vnode);
	  }

	  if (!vm.isDirty) {
	    // We need to determine if the old allocation is really different from the new one
	    // and mark the vm as dirty
	    const oldKeys = keys(oldSlots);

	    if (oldKeys.length !== keys(cmpSlots).length) {
	      markComponentAsDirty(vm);
	      return;
	    }

	    for (let i = 0, len = oldKeys.length; i < len; i += 1) {
	      const key = oldKeys[i];

	      if (isUndefined(cmpSlots[key]) || oldSlots[key].length !== cmpSlots[key].length) {
	        markComponentAsDirty(vm);
	        return;
	      }

	      const oldVNodes = oldSlots[key];
	      const vnodes = cmpSlots[key];

	      for (let j = 0, a = cmpSlots[key].length; j < a; j += 1) {
	        if (oldVNodes[j] !== vnodes[j]) {
	          markComponentAsDirty(vm);
	          return;
	        }
	      }
	    }
	  }
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	const ConnectingSlot = createFieldName('connecting');
	const DisconnectingSlot = createFieldName('disconnecting');

	function callNodeSlot(node, slot) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(node, `callNodeSlot() should not be called for a non-object`);
	  }

	  const fn = getInternalField(node, slot);

	  if (!isUndefined(fn)) {
	    fn();
	  }

	  return node; // for convenience
	} // monkey patching Node methods to be able to detect the insertions and removal of
	// root elements created via createElement.


	assign(Node.prototype, {
	  appendChild(newChild) {
	    const appendedNode = appendChild.call(this, newChild);
	    return callNodeSlot(appendedNode, ConnectingSlot);
	  },

	  insertBefore(newChild, referenceNode) {
	    const insertedNode = insertBefore.call(this, newChild, referenceNode);
	    return callNodeSlot(insertedNode, ConnectingSlot);
	  },

	  removeChild(oldChild) {
	    const removedNode = removeChild.call(this, oldChild);
	    return callNodeSlot(removedNode, DisconnectingSlot);
	  },

	  replaceChild(newChild, oldChild) {
	    const replacedNode = replaceChild.call(this, newChild, oldChild);
	    callNodeSlot(replacedNode, DisconnectingSlot);
	    callNodeSlot(newChild, ConnectingSlot);
	    return replacedNode;
	  }

	});
	/**
	 * This method is almost identical to document.createElement
	 * (https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
	 * with the slightly difference that in the options, you can pass the `is`
	 * property set to a Constructor instead of just a string value. E.g.:
	 *
	 * const el = createElement('x-foo', { is: FooCtor });
	 *
	 * If the value of `is` attribute is not a constructor,
	 * then it throws a TypeError.
	 */

	function createElement$2(sel, options = {}) {
	  if (!isObject(options) || isNull(options)) {
	    throw new TypeError();
	  }

	  let Ctor = options.is;

	  if (isCircularModuleDependency(Ctor)) {
	    Ctor = resolveCircularModuleDependency(Ctor);
	  }

	  let {
	    mode,
	    fallback
	  } = options; // TODO: for now, we default to open, but eventually it should default to 'closed'

	  if (mode !== 'closed') {
	    mode = 'open';
	  } // TODO: for now, we default to true, but eventually it should default to false


	  fallback = isUndefined(fallback) || isTrue(fallback) || isFalse(isNativeShadowRootAvailable); // Create element with correct tagName

	  const element = document.createElement(sel);

	  if (!isUndefined(getNodeKey$1(element))) {
	    // There is a possibility that a custom element is registered under tagName,
	    // in which case, the initialization is already carry on, and there is nothing else
	    // to do here.
	    return element;
	  }

	  const def = getComponentDef(Ctor);
	  setElementProto(element, def);

	  if (isTrue(fallback)) {
	    patchCustomElementProto(element, {
	      def
	    });
	  }

	  if (process.env.NODE_ENV !== 'production') {
	    patchCustomElementWithRestrictions(element, EmptyObject);
	  } // In case the element is not initialized already, we need to carry on the manual creation


	  createVM(sel, element, Ctor, {
	    mode,
	    fallback,
	    isRoot: true
	  }); // Handle insertion and removal from the DOM manually

	  setInternalField(element, ConnectingSlot, () => {
	    const vm = getCustomElementVM(element);
	    startHydrateMeasure(vm);
	    removeVM(vm); // moving the element from one place to another is observable via life-cycle hooks

	    appendVM(vm);
	    renderVM(vm);
	    endHydrateMeasure(vm);
	  });
	  setInternalField(element, DisconnectingSlot, () => {
	    const vm = getCustomElementVM(element);
	    removeVM(vm);
	  });
	  return element;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// when used with exactly one argument, we assume it is a function invocation.


	function readonly(obj) {
	  if (process.env.NODE_ENV !== 'production') {
	    // TODO: enable the usage of this function as @readonly decorator
	    if (arguments.length !== 1) {
	      assert.fail("@readonly cannot be used as a decorator just yet, use it as a function with one argument to produce a readonly version of the provided value.");
	    }
	  }

	  return reactiveMembrane.getReadOnlyProxy(obj);
	}

	function buildCustomElementConstructor(Ctor, options) {
	  var _a;

	  if (isCircularModuleDependency(Ctor)) {
	    Ctor = resolveCircularModuleDependency(Ctor);
	  }

	  const {
	    props,
	    bridge: BaseElement
	  } = getComponentDef(Ctor);
	  const normalizedOptions = {
	    fallback: false,
	    mode: 'open',
	    isRoot: true
	  };

	  if (isObject(options) && !isNull(options)) {
	    const {
	      mode,
	      fallback
	    } = options; // TODO: for now, we default to open, but eventually it should default to 'closed'

	    if (mode === 'closed') {
	      normalizedOptions.mode = mode;
	    } // fallback defaults to false to favor shadowRoot


	    normalizedOptions.fallback = isTrue(fallback) || isFalse(isNativeShadowRootAvailable);
	  }

	  return _a = class extends BaseElement {
	    constructor() {
	      super();
	      const tagName = StringToLowerCase.call(tagNameGetter.call(this));

	      if (isTrue(normalizedOptions.fallback)) {
	        const def = getComponentDef(Ctor);
	        patchCustomElementProto(this, {
	          def
	        });
	      }

	      createVM(tagName, this, Ctor, normalizedOptions);

	      if (process.env.NODE_ENV !== 'production') {
	        patchCustomElementWithRestrictions(this, EmptyObject);
	      }
	    }

	    connectedCallback() {
	      const vm = getCustomElementVM(this);
	      appendVM(vm);
	      renderVM(vm);
	    }

	    disconnectedCallback() {
	      const vm = getCustomElementVM(this);
	      removeVM(vm);
	    }

	    attributeChangedCallback(attrName, oldValue, newValue) {
	      if (oldValue === newValue) {
	        // ignoring similar values for better perf
	        return;
	      }

	      const propName = getPropNameFromAttrName(attrName);

	      if (isUndefined(props[propName])) {
	        // ignoring unknown attributes
	        return;
	      }

	      if (!isAttributeLocked(this, attrName)) {
	        // ignoring changes triggered by the engine itself during:
	        // * diffing when public props are attempting to reflect to the DOM
	        // * component via `this.setAttribute()`, should never update the prop.
	        // Both cases, the the setAttribute call is always wrap by the unlocking
	        // of the attribute to be changed
	        return;
	      } // reflect attribute change to the corresponding props when changed
	      // from outside.


	      this[propName] = newValue;
	    }

	  }, // collecting all attribute names from all public props to apply
	  // the reflection from attributes to props via attributeChangedCallback.
	  _a.observedAttributes = ArrayMap.call(getOwnPropertyNames(props), propName => props[propName].attr), _a;
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	exports.createElement = createElement$2;
	exports.getComponentDef = getComponentDef;
	exports.isComponentConstructor = isComponentConstructor;
	exports.getComponentConstructor = getComponentConstructor;
	exports.LightningElement = BaseLightningElement;
	exports.register = register;
	exports.unwrap = unwrap$1;
	exports.registerTemplate = registerTemplate;
	exports.sanitizeAttribute = sanitizeAttribute;
	exports.registerComponent = registerComponent;
	exports.registerDecorators = registerDecorators;
	exports.isNodeFromTemplate = isNodeFromTemplate;
	exports.dangerousObjectMutation = dangerousObjectMutation;
	exports.api = api;
	exports.track = track;
	exports.readonly = readonly;
	exports.wire = wire;
	exports.decorate = decorate;
	exports.buildCustomElementConstructor = buildCustomElementConstructor;
	exports.Element = BaseLightningElement;
	/** version: 0.33.26 */
	});

	unwrapExports(engine);
	var engine_1 = engine.createElement;
	var engine_2 = engine.getComponentDef;
	var engine_3 = engine.isComponentConstructor;
	var engine_4 = engine.getComponentConstructor;
	var engine_5 = engine.LightningElement;
	var engine_6 = engine.register;
	var engine_7 = engine.unwrap;
	var engine_8 = engine.registerTemplate;
	var engine_9 = engine.sanitizeAttribute;
	var engine_10 = engine.registerComponent;
	var engine_11 = engine.registerDecorators;
	var engine_12 = engine.isNodeFromTemplate;
	var engine_13 = engine.dangerousObjectMutation;
	var engine_14 = engine.api;
	var engine_15 = engine.track;
	var engine_16 = engine.readonly;
	var engine_17 = engine.wire;
	var engine_18 = engine.decorate;
	var engine_19 = engine.buildCustomElementConstructor;
	var engine_20 = engine.Element;

	var wire = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	var assert = {
	  isTrue(value, msg) {
	    if (!value) {
	      throw new Error(`Assert Violation: ${msg}`);
	    }
	  },

	  isFalse(value, msg) {
	    if (value) {
	      throw new Error(`Assert Violation: ${msg}`);
	    }
	  }

	};
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// key in engine service context for wire service context

	const CONTEXT_ID = '@wire'; // key in wire service context for updated listener metadata

	const CONTEXT_UPDATED = 'updated'; // key in wire service context for connected listener metadata

	const CONTEXT_CONNECTED = 'connected'; // key in wire service context for disconnected listener metadata

	const CONTEXT_DISCONNECTED = 'disconnected'; // wire event target life cycle connectedCallback hook event type

	const CONNECT = 'connect'; // wire event target life cycle disconnectedCallback hook event type

	const DISCONNECT = 'disconnect'; // wire event target life cycle config changed hook event type

	const CONFIG = 'config';
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */

	/*
	 * Detects property changes by installing setter/getter overrides on the component
	 * instance.
	 *
	 * TODO - in 216 engine will expose an 'updated' callback for services that is invoked
	 * once after all property changes occur in the event loop.
	 */

	/**
	 * Invokes the provided change listeners with the resolved component properties.
	 * @param configListenerMetadatas List of config listener metadata (config listeners and their context)
	 * @param paramValues Values for all wire adapter config params
	 */

	function invokeConfigListeners(configListenerMetadatas, paramValues) {
	  configListenerMetadatas.forEach(metadata => {
	    const {
	      listener,
	      statics,
	      reactives
	    } = metadata;
	    const reactiveValues = Object.create(null);

	    if (reactives) {
	      const keys = Object.keys(reactives);

	      for (let j = 0, jlen = keys.length; j < jlen; j++) {
	        const key = keys[j];
	        const value = paramValues[reactives[key]];
	        reactiveValues[key] = value;
	      }
	    } // TODO - consider read-only membrane to enforce invariant of immutable config


	    const config = Object.assign({}, statics, reactiveValues);
	    listener.call(undefined, config);
	  });
	}
	/**
	 * Marks a reactive parameter as having changed.
	 * @param cmp The component
	 * @param reactiveParameter Reactive parameter that has changed
	 * @param configContext The service context
	 */


	function updated(cmp, reactiveParameter, configContext) {
	  if (!configContext.mutated) {
	    configContext.mutated = new Set(); // collect all prop changes via a microtask

	    Promise.resolve().then(updatedFuture.bind(undefined, cmp, configContext));
	  }

	  configContext.mutated.add(reactiveParameter);
	}

	function updatedFuture(cmp, configContext) {
	  const uniqueListeners = new Set(); // configContext.mutated must be set prior to invoking this function

	  const mutated = configContext.mutated;
	  delete configContext.mutated; // pull this variable out of scope to workaround babel minify issue - https://github.com/babel/minify/issues/877

	  let listeners;
	  mutated.forEach(reactiveParameter => {
	    const value = getReactiveParameterValue(cmp, reactiveParameter);

	    if (configContext.values[reactiveParameter.reference] === value) {
	      return;
	    }

	    configContext.values[reactiveParameter.reference] = value;
	    listeners = configContext.listeners[reactiveParameter.head];

	    for (let i = 0, len = listeners.length; i < len; i++) {
	      uniqueListeners.add(listeners[i]);
	    }
	  });
	  invokeConfigListeners(uniqueListeners, configContext.values);
	}
	/**
	 * Gets the value of an @wire reactive parameter.
	 * @param cmp The component
	 * @param reactiveParameter The parameter to get
	 */


	function getReactiveParameterValue(cmp, reactiveParameter) {
	  let value = cmp[reactiveParameter.head];

	  if (!reactiveParameter.tail) {
	    return value;
	  }

	  const segments = reactiveParameter.tail;

	  for (let i = 0, len = segments.length; i < len && value != null; i++) {
	    const segment = segments[i];

	    if (typeof value !== 'object' || !(segment in value)) {
	      return undefined;
	    }

	    value = value[segment];
	  }

	  return value;
	}
	/**
	 * Installs setter override to trap changes to a property, triggering the config listeners.
	 * @param cmp The component
	 * @param reactiveParameter Reactive parameter that defines the property to monitor
	 * @param configContext The service context
	 */


	function installTrap(cmp, reactiveParameter, configContext) {
	  const callback = updated.bind(undefined, cmp, reactiveParameter, configContext);
	  const newDescriptor = getOverrideDescriptor(cmp, reactiveParameter.head, callback);
	  Object.defineProperty(cmp, reactiveParameter.head, newDescriptor);
	}
	/**
	 * Finds the descriptor of the named property on the prototype chain
	 * @param target The target instance/constructor function
	 * @param propName Name of property to find
	 * @param protoSet Prototypes searched (to avoid circular prototype chains)
	 */


	function findDescriptor(target, propName, protoSet) {
	  protoSet = protoSet || [];

	  if (!target || protoSet.indexOf(target) > -1) {
	    return null; // null, undefined, or circular prototype definition
	  }

	  const descriptor = Object.getOwnPropertyDescriptor(target, propName);

	  if (descriptor) {
	    return descriptor;
	  }

	  const proto = Object.getPrototypeOf(target);

	  if (!proto) {
	    return null;
	  }

	  protoSet.push(target);
	  return findDescriptor(proto, propName, protoSet);
	}
	/**
	 * Gets a property descriptor that monitors the provided property for changes
	 * @param cmp The component
	 * @param prop The name of the property to be monitored
	 * @param callback A function to invoke when the prop's value changes
	 * @return A property descriptor
	 */


	function getOverrideDescriptor(cmp, prop, callback) {
	  const descriptor = findDescriptor(cmp, prop);
	  let enumerable;
	  let get;
	  let set; // TODO: this does not cover the override of existing descriptors at the instance level
	  // and that's ok because eventually we will not need to do any of these :)

	  if (descriptor === null || descriptor.get === undefined && descriptor.set === undefined) {
	    let value = cmp[prop];
	    enumerable = true;

	    get = function () {
	      return value;
	    };

	    set = function (newValue) {
	      value = newValue;
	      callback();
	    };
	  } else {
	    const {
	      set: originalSet,
	      get: originalGet
	    } = descriptor;
	    enumerable = descriptor.enumerable;

	    set = function (newValue) {
	      if (originalSet) {
	        originalSet.call(cmp, newValue);
	      }

	      callback();
	    };

	    get = function () {
	      return originalGet ? originalGet.call(cmp) : undefined;
	    };
	  }

	  return {
	    set,
	    get,
	    enumerable,
	    configurable: true
	  };
	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */


	function removeListener(listeners, toRemove) {
	  const idx = listeners.indexOf(toRemove);

	  if (idx > -1) {
	    listeners.splice(idx, 1);
	  }
	}

	function removeConfigListener(configListenerMetadatas, toRemove) {
	  for (let i = 0, len = configListenerMetadatas.length; i < len; i++) {
	    if (configListenerMetadatas[i].listener === toRemove) {
	      configListenerMetadatas.splice(i, 1);
	      return;
	    }
	  }
	}

	function buildReactiveParameter(reference) {
	  if (!reference.includes('.')) {
	    return {
	      reference,
	      head: reference
	    };
	  }

	  const segments = reference.split('.');
	  return {
	    reference,
	    head: segments.shift(),
	    tail: segments
	  };
	}

	class WireEventTarget {
	  constructor(cmp, def, context, wireDef, wireTarget) {
	    this._cmp = cmp;
	    this._def = def;
	    this._context = context;
	    this._wireDef = wireDef;
	    this._wireTarget = wireTarget;
	  }

	  addEventListener(type, listener) {
	    switch (type) {
	      case CONNECT:
	        const connectedListeners = this._context[CONTEXT_ID][CONTEXT_CONNECTED];

	        if (process.env.NODE_ENV !== 'production') {
	          assert.isFalse(connectedListeners.includes(listener), 'must not call addEventListener("connect") with the same listener');
	        }

	        connectedListeners.push(listener);
	        break;

	      case DISCONNECT:
	        const disconnectedListeners = this._context[CONTEXT_ID][CONTEXT_DISCONNECTED];

	        if (process.env.NODE_ENV !== 'production') {
	          assert.isFalse(disconnectedListeners.includes(listener), 'must not call addEventListener("disconnect") with the same listener');
	        }

	        disconnectedListeners.push(listener);
	        break;

	      case CONFIG:
	        const reactives = this._wireDef.params;
	        const statics = this._wireDef.static;
	        let reactiveKeys; // no reactive parameters. fire config once with static parameters (if present).

	        if (!reactives || (reactiveKeys = Object.keys(reactives)).length === 0) {
	          const config = statics || Object.create(null);
	          listener.call(undefined, config);
	          return;
	        }

	        const configListenerMetadata = {
	          listener,
	          statics,
	          reactives
	        }; // setup listeners for all reactive parameters

	        const configContext = this._context[CONTEXT_ID][CONTEXT_UPDATED];
	        reactiveKeys.forEach(key => {
	          const reactiveParameter = buildReactiveParameter(reactives[key]);
	          let configListenerMetadatas = configContext.listeners[reactiveParameter.head];

	          if (!configListenerMetadatas) {
	            configListenerMetadatas = [configListenerMetadata];
	            configContext.listeners[reactiveParameter.head] = configListenerMetadatas;
	            installTrap(this._cmp, reactiveParameter, configContext);
	          } else {
	            configListenerMetadatas.push(configListenerMetadata);
	          } // enqueue to pickup default values


	          updated(this._cmp, reactiveParameter, configContext);
	        });
	        break;

	      default:
	        throw new Error(`unsupported event type ${type}`);
	    }
	  }

	  removeEventListener(type, listener) {
	    switch (type) {
	      case CONNECT:
	        const connectedListeners = this._context[CONTEXT_ID][CONTEXT_CONNECTED];
	        removeListener(connectedListeners, listener);
	        break;

	      case DISCONNECT:
	        const disconnectedListeners = this._context[CONTEXT_ID][CONTEXT_DISCONNECTED];
	        removeListener(disconnectedListeners, listener);
	        break;

	      case CONFIG:
	        const paramToConfigListenerMetadata = this._context[CONTEXT_ID][CONTEXT_UPDATED].listeners;
	        const reactives = this._wireDef.params;

	        if (reactives) {
	          Object.keys(reactives).forEach(key => {
	            const reactiveParameter = buildReactiveParameter(reactives[key]);
	            const configListenerMetadatas = paramToConfigListenerMetadata[reactiveParameter.head];

	            if (configListenerMetadatas) {
	              removeConfigListener(configListenerMetadatas, listener);
	            }
	          });
	        }

	        break;

	      default:
	        throw new Error(`unsupported event type ${type}`);
	    }
	  }

	  dispatchEvent(evt) {
	    if (evt instanceof ValueChangedEvent) {
	      const value = evt.value;

	      if (this._wireDef.method) {
	        this._cmp[this._wireTarget](value);
	      } else {
	        this._cmp[this._wireTarget] = value;
	      }

	      return false; // canceling signal since we don't want this to propagate
	    } else if (evt.type === 'WireContextEvent') {
	      // NOTE: kill this hack
	      // we should only allow ValueChangedEvent
	      // however, doing so would require adapter to implement machinery
	      // that fire the intended event as DOM event and wrap inside ValueChangedEvent
	      return this._cmp.dispatchEvent(evt);
	    } else {
	      throw new Error(`Invalid event ${evt}.`);
	    }
	  }

	}
	/**
	 * Event fired by wire adapters to emit a new value.
	 */


	class ValueChangedEvent {
	  constructor(value) {
	    this.type = 'ValueChangedEvent';
	    this.value = value;
	  }

	}
	/*
	 * Copyright (c) 2018, salesforce.com, inc.
	 * All rights reserved.
	 * SPDX-License-Identifier: MIT
	 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
	 */
	// wire adapters: wire adapter id => adapter ctor


	const adapterFactories = new Map();
	/**
	 * Invokes the specified callbacks.
	 * @param listeners functions to call
	 */

	function invokeListener(listeners) {
	  for (let i = 0, len = listeners.length; i < len; ++i) {
	    listeners[i].call(undefined);
	  }
	}
	/**
	 * The wire service.
	 *
	 * This service is registered with the engine's service API. It connects service
	 * callbacks to wire adapter lifecycle events.
	 */


	const wireService = {
	  wiring: (cmp, data, def, context) => {
	    const wireContext = context[CONTEXT_ID] = Object.create(null);
	    wireContext[CONTEXT_CONNECTED] = [];
	    wireContext[CONTEXT_DISCONNECTED] = [];
	    wireContext[CONTEXT_UPDATED] = {
	      listeners: {},
	      values: {}
	    }; // engine guarantees invocation only if def.wire is defined

	    const wireStaticDef = def.wire;
	    const wireTargets = Object.keys(wireStaticDef);

	    for (let i = 0, len = wireTargets.length; i < len; i++) {
	      const wireTarget = wireTargets[i];
	      const wireDef = wireStaticDef[wireTarget];
	      const adapterFactory = adapterFactories.get(wireDef.adapter);

	      if (process.env.NODE_ENV !== 'production') {
	        assert.isTrue(wireDef.adapter, `@wire on "${wireTarget}": adapter id must be truthy`);
	        assert.isTrue(adapterFactory, `@wire on "${wireTarget}": unknown adapter id: ${String(wireDef.adapter)}`); // enforce restrictions of reactive parameters

	        if (wireDef.params) {
	          Object.keys(wireDef.params).forEach(param => {
	            const prop = wireDef.params[param];
	            const segments = prop.split('.');
	            segments.forEach(segment => {
	              assert.isTrue(segment.length > 0, `@wire on "${wireTarget}": reactive parameters must not be empty`);
	            });
	            assert.isTrue(segments[0] !== wireTarget, `@wire on "${wireTarget}": reactive parameter "${segments[0]}" must not refer to self`); // restriction for dot-notation reactive parameters

	            if (segments.length > 1) {
	              // @wire emits a stream of immutable values. an emit sets the target property; it does not mutate a previously emitted value.
	              // restricting dot-notation reactive parameters to reference other @wire targets makes trapping the 'head' of the parameter
	              // sufficient to observe the value change.
	              assert.isTrue(wireTargets.includes(segments[0]) && wireStaticDef[segments[0]].method !== 1, `@wire on "${wireTarget}": dot-notation reactive parameter "${prop}" must refer to a @wire property`);
	            }
	          });
	        }
	      }

	      if (adapterFactory) {
	        const wireEventTarget = new WireEventTarget(cmp, def, context, wireDef, wireTarget);
	        adapterFactory({
	          dispatchEvent: wireEventTarget.dispatchEvent.bind(wireEventTarget),
	          addEventListener: wireEventTarget.addEventListener.bind(wireEventTarget),
	          removeEventListener: wireEventTarget.removeEventListener.bind(wireEventTarget)
	        });
	      }
	    }
	  },
	  connected: (cmp, data, def, context) => {
	    let listeners;

	    if (!def.wire || !(listeners = context[CONTEXT_ID][CONTEXT_CONNECTED])) {
	      return;
	    }

	    invokeListener(listeners);
	  },
	  disconnected: (cmp, data, def, context) => {
	    let listeners;

	    if (!def.wire || !(listeners = context[CONTEXT_ID][CONTEXT_DISCONNECTED])) {
	      return;
	    }

	    invokeListener(listeners);
	  }
	};
	/**
	 * Registers the wire service.
	 */

	function registerWireService(registerService) {
	  registerService(wireService);
	}
	/**
	 * Registers a wire adapter.
	 */


	function register(adapterId, adapterFactory) {
	  if (process.env.NODE_ENV !== 'production') {
	    assert.isTrue(adapterId, 'adapter id must be truthy');
	    assert.isTrue(typeof adapterFactory === 'function', 'adapter factory must be a callable');
	  }

	  adapterFactories.set(adapterId, adapterFactory);
	}

	exports.registerWireService = registerWireService;
	exports.register = register;
	exports.ValueChangedEvent = ValueChangedEvent;
	/** version: 0.33.26 */
	});

	unwrapExports(wire);
	var wire_1 = wire.registerWireService;
	var wire_2 = wire.register;
	var wire_3 = wire.ValueChangedEvent;

	function stylesheet(hostSelector, shadowSelector, nativeShadow) {
	  return "\n" + (nativeShadow ? (":host {display: flex;flex-direction: column;font-family: Arial;height: 100vh;}") : (hostSelector + " {display: flex;flex-direction: column;font-family: Arial;height: 100vh;}")) + "\n\n" + (nativeShadow ? (":host(.editor--drag) main" + shadowSelector + " {cursor: -webkit-grabbing;}") : (hostSelector + ".editor--drag main" + shadowSelector + " {cursor: -webkit-grabbing;}")) + "\nmain" + shadowSelector + " {display: flex;cursor: pointer;flex: 1 0 auto;}\n.track" + shadowSelector + " {height: 60px;background: #f1f1f1;}\n.track--summary" + shadowSelector + " {padding: 1rem;box-sizing: border-box;border-right: 1px solid #d8d8d8;}\n.tracks-summary" + shadowSelector + " {margin-top: 4rem;flex: 0 0 200px;}\n.editor" + shadowSelector + " {position: relative;z-index: 1;}\n.editor-container" + shadowSelector + " {flex: 1 0 auto;}\n.waveforms-container" + shadowSelector + " {overflow: hidden;}\n";
	}
	var _implicitStylesheets = [stylesheet];

	function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
	  return "\n" + (nativeShadow ? (":host {display: block;height: 4rem;user-select: none;position: relative;z-index: 1;}") : (hostSelector + " {display: block;height: 4rem;user-select: none;position: relative;z-index: 1;}")) + "\n.tick" + shadowSelector + " {display: inline-flex;flex-direction: column;position: absolute;left: 0;top: 0;z-index: 2;font-size: 1rem;}\n.tick-indicator" + shadowSelector + " {width: 1px;height: 11px;background: #000;display: inline-block;margin-bottom: 0.5rem;}\n.tick-indicator--second" + shadowSelector + " {height: 20px;}\n.tick-label" + shadowSelector + " {transform: translateX(-50%);margin-bottom: 0.5rem;}\n";
	}
	var _implicitStylesheets$1 = [stylesheet$1];

	function tmpl($api, $cmp, $slotset, $ctx) {
	  const {
	    d: api_dynamic
	  } = $api;
	  return [api_dynamic($cmp.formatted)];
	}

	var _tmpl = engine_8(tmpl);
	tmpl.stylesheets = [];
	tmpl.stylesheetTokens = {
	  hostAttribute: "ffmpeg-timelabel_timelabel-host",
	  shadowAttribute: "ffmpeg-timelabel_timelabel"
	};

	var parseMs = ms => {
	  if (typeof ms !== 'number') {
	    throw new TypeError('Expected a number');
	  }

	  const roundTowardsZero = ms > 0 ? Math.floor : Math.ceil;
	  return {
	    days: roundTowardsZero(ms / 86400000),
	    hours: roundTowardsZero(ms / 3600000) % 24,
	    minutes: roundTowardsZero(ms / 60000) % 60,
	    seconds: roundTowardsZero(ms / 1000) % 60,
	    milliseconds: roundTowardsZero(ms) % 1000,
	    microseconds: roundTowardsZero(ms * 1000) % 1000,
	    nanoseconds: roundTowardsZero(ms * 1e6) % 1000
	  };
	};

	class TimeLabel extends engine_5 {
	  constructor(...args) {
	    super(...args);
	    this.time = void 0;
	  }

	  get formatted() {
	    const {
	      milliseconds: timeMilliseconds
	    } = this.time;
	    const {
	      hours,
	      minutes,
	      seconds,
	      milliseconds
	    } = parseMs(timeMilliseconds);
	    const str = `${minutes}:${seconds}:${milliseconds / 1000}`;

	    if (hours > 0) {
	      return `${hours}:${str}`;
	    }

	    return str;
	  }

	}

	engine_11(TimeLabel, {
	  publicProps: {
	    time: {
	      config: 0
	    }
	  }
	});

	var _ffmpegTimelabel = engine_10(TimeLabel, {
	  tmpl: _tmpl
	});

	function tmpl$1($api, $cmp, $slotset, $ctx) {
	  const {
	    c: api_custom_element,
	    h: api_element,
	    k: api_key,
	    i: api_iterator
	  } = $api;
	  return api_iterator($cmp.ticks, function (tick) {
	    return api_element("span", {
	      classMap: {
	        "tick": true
	      },
	      style: tick.style,
	      key: api_key(3, tick.time.milliseconds)
	    }, [tick.renderLabel ? api_custom_element("ffmpeg-timelabel", _ffmpegTimelabel, {
	      classMap: {
	        "tick-label": true
	      },
	      props: {
	        "time": tick.time
	      },
	      key: 5
	    }, []) : null, api_element("span", {
	      className: tick.indicatorClassName,
	      key: 6
	    }, [])]);
	  });
	}

	var _tmpl$1 = engine_8(tmpl$1);
	tmpl$1.stylesheets = [];

	if (_implicitStylesheets$1) {
	  tmpl$1.stylesheets.push.apply(tmpl$1.stylesheets, _implicitStylesheets$1);
	}
	tmpl$1.stylesheetTokens = {
	  hostAttribute: "ffmpeg-timeline_timeline-host",
	  shadowAttribute: "ffmpeg-timeline_timeline"
	};

	class AudioRange {
	  constructor(start, duration) {
	    this.start = start;
	    this.duration = duration;
	  }

	}

	class Time {
	  constructor(milliseconds) {
	    this.milliseconds = milliseconds;
	  }

	  get seconds() {
	    return this.milliseconds / 1000;
	  }

	  static fromSeconds(seconds) {
	    return new Time(seconds * 1000);
	  }

	}

	function wireObservable(observable) {
	  return function (eventTarget) {
	    observable.subscribe(data => {
	      eventTarget.dispatchEvent(new wire_3({
	        data
	      }));
	    }, error => {
	      eventTarget.dispatchEvent(new wire_3({
	        error
	      }));
	    });
	  };
	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */

	/* global Reflect, Promise */
	var extendStatics = function (d, b) {
	  extendStatics = Object.setPrototypeOf || {
	    __proto__: []
	  } instanceof Array && function (d, b) {
	    d.__proto__ = b;
	  } || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	  };

	  return extendStatics(d, b);
	};

	function __extends(d, b) {
	  extendStatics(d, b);

	  function __() {
	    this.constructor = d;
	  }

	  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	function isFunction(x) {
	  return typeof x === 'function';
	}

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	var _enable_super_gross_mode_that_will_cause_bad_things = false;
	var config = {
	  Promise: undefined,

	  set useDeprecatedSynchronousErrorHandling(value) {
	    if (value) {
	      var error =
	      /*@__PURE__*/
	      new Error();
	      /*@__PURE__*/

	      console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
	    } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
	      /*@__PURE__*/
	      console.log('RxJS: Back to a better error behavior. Thank you. <3');
	    }

	    _enable_super_gross_mode_that_will_cause_bad_things = value;
	  },

	  get useDeprecatedSynchronousErrorHandling() {
	    return _enable_super_gross_mode_that_will_cause_bad_things;
	  }

	};

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	function hostReportError(err) {
	  setTimeout(function () {
	    throw err;
	  });
	}

	/** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
	var empty = {
	  closed: true,
	  next: function (value) {},
	  error: function (err) {
	    if (config.useDeprecatedSynchronousErrorHandling) {
	      throw err;
	    } else {
	      hostReportError(err);
	    }
	  },
	  complete: function () {}
	};

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	var isArray = Array.isArray || function (x) {
	  return x && typeof x.length === 'number';
	};

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	function isObject(x) {
	  return x != null && typeof x === 'object';
	}

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	var errorObject = {
	  e: {}
	};

	/** PURE_IMPORTS_START _errorObject PURE_IMPORTS_END */
	var tryCatchTarget;

	function tryCatcher() {
	  try {
	    return tryCatchTarget.apply(this, arguments);
	  } catch (e) {
	    errorObject.e = e;
	    return errorObject;
	  }
	}

	function tryCatch(fn) {
	  tryCatchTarget = fn;
	  return tryCatcher;
	}

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	function UnsubscriptionErrorImpl(errors) {
	  Error.call(this);
	  this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
	    return i + 1 + ") " + err.toString();
	  }).join('\n  ') : '';
	  this.name = 'UnsubscriptionError';
	  this.errors = errors;
	  return this;
	}

	UnsubscriptionErrorImpl.prototype =
	/*@__PURE__*/
	Object.create(Error.prototype);
	var UnsubscriptionError = UnsubscriptionErrorImpl;

	/** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_tryCatch,_util_errorObject,_util_UnsubscriptionError PURE_IMPORTS_END */

	var Subscription =
	/*@__PURE__*/
	function () {
	  function Subscription(unsubscribe) {
	    this.closed = false;
	    this._parent = null;
	    this._parents = null;
	    this._subscriptions = null;

	    if (unsubscribe) {
	      this._unsubscribe = unsubscribe;
	    }
	  }

	  Subscription.prototype.unsubscribe = function () {
	    var hasErrors = false;
	    var errors;

	    if (this.closed) {
	      return;
	    }

	    var _a = this,
	        _parent = _a._parent,
	        _parents = _a._parents,
	        _unsubscribe = _a._unsubscribe,
	        _subscriptions = _a._subscriptions;

	    this.closed = true;
	    this._parent = null;
	    this._parents = null;
	    this._subscriptions = null;
	    var index = -1;
	    var len = _parents ? _parents.length : 0;

	    while (_parent) {
	      _parent.remove(this);

	      _parent = ++index < len && _parents[index] || null;
	    }

	    if (isFunction(_unsubscribe)) {
	      var trial = tryCatch(_unsubscribe).call(this);

	      if (trial === errorObject) {
	        hasErrors = true;
	        errors = errors || (errorObject.e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(errorObject.e.errors) : [errorObject.e]);
	      }
	    }

	    if (isArray(_subscriptions)) {
	      index = -1;
	      len = _subscriptions.length;

	      while (++index < len) {
	        var sub = _subscriptions[index];

	        if (isObject(sub)) {
	          var trial = tryCatch(sub.unsubscribe).call(sub);

	          if (trial === errorObject) {
	            hasErrors = true;
	            errors = errors || [];
	            var err = errorObject.e;

	            if (err instanceof UnsubscriptionError) {
	              errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
	            } else {
	              errors.push(err);
	            }
	          }
	        }
	      }
	    }

	    if (hasErrors) {
	      throw new UnsubscriptionError(errors);
	    }
	  };

	  Subscription.prototype.add = function (teardown) {
	    if (!teardown || teardown === Subscription.EMPTY) {
	      return Subscription.EMPTY;
	    }

	    if (teardown === this) {
	      return this;
	    }

	    var subscription = teardown;

	    switch (typeof teardown) {
	      case 'function':
	        subscription = new Subscription(teardown);

	      case 'object':
	        if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
	          return subscription;
	        } else if (this.closed) {
	          subscription.unsubscribe();
	          return subscription;
	        } else if (typeof subscription._addParent !== 'function') {
	          var tmp = subscription;
	          subscription = new Subscription();
	          subscription._subscriptions = [tmp];
	        }

	        break;

	      default:
	        throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
	    }

	    var subscriptions = this._subscriptions || (this._subscriptions = []);
	    subscriptions.push(subscription);

	    subscription._addParent(this);

	    return subscription;
	  };

	  Subscription.prototype.remove = function (subscription) {
	    var subscriptions = this._subscriptions;

	    if (subscriptions) {
	      var subscriptionIndex = subscriptions.indexOf(subscription);

	      if (subscriptionIndex !== -1) {
	        subscriptions.splice(subscriptionIndex, 1);
	      }
	    }
	  };

	  Subscription.prototype._addParent = function (parent) {
	    var _a = this,
	        _parent = _a._parent,
	        _parents = _a._parents;

	    if (!_parent || _parent === parent) {
	      this._parent = parent;
	    } else if (!_parents) {
	      this._parents = [parent];
	    } else if (_parents.indexOf(parent) === -1) {
	      _parents.push(parent);
	    }
	  };

	  Subscription.EMPTY = function (empty) {
	    empty.closed = true;
	    return empty;
	  }(new Subscription());

	  return Subscription;
	}();

	function flattenUnsubscriptionErrors(errors) {
	  return errors.reduce(function (errs, err) {
	    return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
	  }, []);
	}

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	var rxSubscriber = typeof Symbol === 'function' ?
	/*@__PURE__*/
	Symbol('rxSubscriber') : '@@rxSubscriber_' +
	/*@__PURE__*/
	Math.random();

	/** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */

	var Subscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(Subscriber, _super);

	  function Subscriber(destinationOrNext, error, complete) {
	    var _this = _super.call(this) || this;

	    _this.syncErrorValue = null;
	    _this.syncErrorThrown = false;
	    _this.syncErrorThrowable = false;
	    _this.isStopped = false;
	    _this._parentSubscription = null;

	    switch (arguments.length) {
	      case 0:
	        _this.destination = empty;
	        break;

	      case 1:
	        if (!destinationOrNext) {
	          _this.destination = empty;
	          break;
	        }

	        if (typeof destinationOrNext === 'object') {
	          if (destinationOrNext instanceof Subscriber) {
	            _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
	            _this.destination = destinationOrNext;
	            destinationOrNext.add(_this);
	          } else {
	            _this.syncErrorThrowable = true;
	            _this.destination = new SafeSubscriber(_this, destinationOrNext);
	          }

	          break;
	        }

	      default:
	        _this.syncErrorThrowable = true;
	        _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
	        break;
	    }

	    return _this;
	  }

	  Subscriber.prototype[rxSubscriber] = function () {
	    return this;
	  };

	  Subscriber.create = function (next, error, complete) {
	    var subscriber = new Subscriber(next, error, complete);
	    subscriber.syncErrorThrowable = false;
	    return subscriber;
	  };

	  Subscriber.prototype.next = function (value) {
	    if (!this.isStopped) {
	      this._next(value);
	    }
	  };

	  Subscriber.prototype.error = function (err) {
	    if (!this.isStopped) {
	      this.isStopped = true;

	      this._error(err);
	    }
	  };

	  Subscriber.prototype.complete = function () {
	    if (!this.isStopped) {
	      this.isStopped = true;

	      this._complete();
	    }
	  };

	  Subscriber.prototype.unsubscribe = function () {
	    if (this.closed) {
	      return;
	    }

	    this.isStopped = true;

	    _super.prototype.unsubscribe.call(this);
	  };

	  Subscriber.prototype._next = function (value) {
	    this.destination.next(value);
	  };

	  Subscriber.prototype._error = function (err) {
	    this.destination.error(err);
	    this.unsubscribe();
	  };

	  Subscriber.prototype._complete = function () {
	    this.destination.complete();
	    this.unsubscribe();
	  };

	  Subscriber.prototype._unsubscribeAndRecycle = function () {
	    var _a = this,
	        _parent = _a._parent,
	        _parents = _a._parents;

	    this._parent = null;
	    this._parents = null;
	    this.unsubscribe();
	    this.closed = false;
	    this.isStopped = false;
	    this._parent = _parent;
	    this._parents = _parents;
	    this._parentSubscription = null;
	    return this;
	  };

	  return Subscriber;
	}(Subscription);

	var SafeSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(SafeSubscriber, _super);

	  function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
	    var _this = _super.call(this) || this;

	    _this._parentSubscriber = _parentSubscriber;
	    var next;
	    var context = _this;

	    if (isFunction(observerOrNext)) {
	      next = observerOrNext;
	    } else if (observerOrNext) {
	      next = observerOrNext.next;
	      error = observerOrNext.error;
	      complete = observerOrNext.complete;

	      if (observerOrNext !== empty) {
	        context = Object.create(observerOrNext);

	        if (isFunction(context.unsubscribe)) {
	          _this.add(context.unsubscribe.bind(context));
	        }

	        context.unsubscribe = _this.unsubscribe.bind(_this);
	      }
	    }

	    _this._context = context;
	    _this._next = next;
	    _this._error = error;
	    _this._complete = complete;
	    return _this;
	  }

	  SafeSubscriber.prototype.next = function (value) {
	    if (!this.isStopped && this._next) {
	      var _parentSubscriber = this._parentSubscriber;

	      if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
	        this.__tryOrUnsub(this._next, value);
	      } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
	        this.unsubscribe();
	      }
	    }
	  };

	  SafeSubscriber.prototype.error = function (err) {
	    if (!this.isStopped) {
	      var _parentSubscriber = this._parentSubscriber;
	      var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;

	      if (this._error) {
	        if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
	          this.__tryOrUnsub(this._error, err);

	          this.unsubscribe();
	        } else {
	          this.__tryOrSetError(_parentSubscriber, this._error, err);

	          this.unsubscribe();
	        }
	      } else if (!_parentSubscriber.syncErrorThrowable) {
	        this.unsubscribe();

	        if (useDeprecatedSynchronousErrorHandling) {
	          throw err;
	        }

	        hostReportError(err);
	      } else {
	        if (useDeprecatedSynchronousErrorHandling) {
	          _parentSubscriber.syncErrorValue = err;
	          _parentSubscriber.syncErrorThrown = true;
	        } else {
	          hostReportError(err);
	        }

	        this.unsubscribe();
	      }
	    }
	  };

	  SafeSubscriber.prototype.complete = function () {
	    var _this = this;

	    if (!this.isStopped) {
	      var _parentSubscriber = this._parentSubscriber;

	      if (this._complete) {
	        var wrappedComplete = function () {
	          return _this._complete.call(_this._context);
	        };

	        if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
	          this.__tryOrUnsub(wrappedComplete);

	          this.unsubscribe();
	        } else {
	          this.__tryOrSetError(_parentSubscriber, wrappedComplete);

	          this.unsubscribe();
	        }
	      } else {
	        this.unsubscribe();
	      }
	    }
	  };

	  SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	    try {
	      fn.call(this._context, value);
	    } catch (err) {
	      this.unsubscribe();

	      if (config.useDeprecatedSynchronousErrorHandling) {
	        throw err;
	      } else {
	        hostReportError(err);
	      }
	    }
	  };

	  SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	    if (!config.useDeprecatedSynchronousErrorHandling) {
	      throw new Error('bad call');
	    }

	    try {
	      fn.call(this._context, value);
	    } catch (err) {
	      if (config.useDeprecatedSynchronousErrorHandling) {
	        parent.syncErrorValue = err;
	        parent.syncErrorThrown = true;
	        return true;
	      } else {
	        hostReportError(err);
	        return true;
	      }
	    }

	    return false;
	  };

	  SafeSubscriber.prototype._unsubscribe = function () {
	    var _parentSubscriber = this._parentSubscriber;
	    this._context = null;
	    this._parentSubscriber = null;

	    _parentSubscriber.unsubscribe();
	  };

	  return SafeSubscriber;
	}(Subscriber);

	/** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
	function canReportError(observer) {
	  while (observer) {
	    var _a = observer,
	        closed_1 = _a.closed,
	        destination = _a.destination,
	        isStopped = _a.isStopped;

	    if (closed_1 || isStopped) {
	      return false;
	    } else if (destination && destination instanceof Subscriber) {
	      observer = destination;
	    } else {
	      observer = null;
	    }
	  }

	  return true;
	}

	/** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
	function toSubscriber(nextOrObserver, error, complete) {
	  if (nextOrObserver) {
	    if (nextOrObserver instanceof Subscriber) {
	      return nextOrObserver;
	    }

	    if (nextOrObserver[rxSubscriber]) {
	      return nextOrObserver[rxSubscriber]();
	    }
	  }

	  if (!nextOrObserver && !error && !complete) {
	    return new Subscriber(empty);
	  }

	  return new Subscriber(nextOrObserver, error, complete);
	}

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	var observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	function noop() {}

	/** PURE_IMPORTS_START _noop PURE_IMPORTS_END */
	function pipeFromArray(fns) {
	  if (!fns) {
	    return noop;
	  }

	  if (fns.length === 1) {
	    return fns[0];
	  }

	  return function piped(input) {
	    return fns.reduce(function (prev, fn) {
	      return fn(prev);
	    }, input);
	  };
	}

	/** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_internal_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */

	var Observable =
	/*@__PURE__*/
	function () {
	  function Observable(subscribe) {
	    this._isScalar = false;

	    if (subscribe) {
	      this._subscribe = subscribe;
	    }
	  }

	  Observable.prototype.lift = function (operator) {
	    var observable$$1 = new Observable();
	    observable$$1.source = this;
	    observable$$1.operator = operator;
	    return observable$$1;
	  };

	  Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	    var operator = this.operator;
	    var sink = toSubscriber(observerOrNext, error, complete);

	    if (operator) {
	      operator.call(sink, this.source);
	    } else {
	      sink.add(this.source || config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
	    }

	    if (config.useDeprecatedSynchronousErrorHandling) {
	      if (sink.syncErrorThrowable) {
	        sink.syncErrorThrowable = false;

	        if (sink.syncErrorThrown) {
	          throw sink.syncErrorValue;
	        }
	      }
	    }

	    return sink;
	  };

	  Observable.prototype._trySubscribe = function (sink) {
	    try {
	      return this._subscribe(sink);
	    } catch (err) {
	      if (config.useDeprecatedSynchronousErrorHandling) {
	        sink.syncErrorThrown = true;
	        sink.syncErrorValue = err;
	      }

	      if (canReportError(sink)) {
	        sink.error(err);
	      } else {
	        console.warn(err);
	      }
	    }
	  };

	  Observable.prototype.forEach = function (next, promiseCtor) {
	    var _this = this;

	    promiseCtor = getPromiseCtor(promiseCtor);
	    return new promiseCtor(function (resolve, reject) {
	      var subscription;
	      subscription = _this.subscribe(function (value) {
	        try {
	          next(value);
	        } catch (err) {
	          reject(err);

	          if (subscription) {
	            subscription.unsubscribe();
	          }
	        }
	      }, reject, resolve);
	    });
	  };

	  Observable.prototype._subscribe = function (subscriber) {
	    var source = this.source;
	    return source && source.subscribe(subscriber);
	  };

	  Observable.prototype[observable] = function () {
	    return this;
	  };

	  Observable.prototype.pipe = function () {
	    var operations = [];

	    for (var _i = 0; _i < arguments.length; _i++) {
	      operations[_i] = arguments[_i];
	    }

	    if (operations.length === 0) {
	      return this;
	    }

	    return pipeFromArray(operations)(this);
	  };

	  Observable.prototype.toPromise = function (promiseCtor) {
	    var _this = this;

	    promiseCtor = getPromiseCtor(promiseCtor);
	    return new promiseCtor(function (resolve, reject) {
	      var value;

	      _this.subscribe(function (x) {
	        return value = x;
	      }, function (err) {
	        return reject(err);
	      }, function () {
	        return resolve(value);
	      });
	    });
	  };

	  Observable.create = function (subscribe) {
	    return new Observable(subscribe);
	  };

	  return Observable;
	}();

	function getPromiseCtor(promiseCtor) {
	  if (!promiseCtor) {
	    promiseCtor = config.Promise || Promise;
	  }

	  if (!promiseCtor) {
	    throw new Error('no Promise impl found');
	  }

	  return promiseCtor;
	}

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	function ObjectUnsubscribedErrorImpl() {
	  Error.call(this);
	  this.message = 'object unsubscribed';
	  this.name = 'ObjectUnsubscribedError';
	  return this;
	}

	ObjectUnsubscribedErrorImpl.prototype =
	/*@__PURE__*/
	Object.create(Error.prototype);
	var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

	/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */

	var SubjectSubscription =
	/*@__PURE__*/
	function (_super) {
	  __extends(SubjectSubscription, _super);

	  function SubjectSubscription(subject, subscriber) {
	    var _this = _super.call(this) || this;

	    _this.subject = subject;
	    _this.subscriber = subscriber;
	    _this.closed = false;
	    return _this;
	  }

	  SubjectSubscription.prototype.unsubscribe = function () {
	    if (this.closed) {
	      return;
	    }

	    this.closed = true;
	    var subject = this.subject;
	    var observers = subject.observers;
	    this.subject = null;

	    if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
	      return;
	    }

	    var subscriberIndex = observers.indexOf(this.subscriber);

	    if (subscriberIndex !== -1) {
	      observers.splice(subscriberIndex, 1);
	    }
	  };

	  return SubjectSubscription;
	}(Subscription);

	/** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */

	var SubjectSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(SubjectSubscriber, _super);

	  function SubjectSubscriber(destination) {
	    var _this = _super.call(this, destination) || this;

	    _this.destination = destination;
	    return _this;
	  }

	  return SubjectSubscriber;
	}(Subscriber);

	var Subject =
	/*@__PURE__*/
	function (_super) {
	  __extends(Subject, _super);

	  function Subject() {
	    var _this = _super.call(this) || this;

	    _this.observers = [];
	    _this.closed = false;
	    _this.isStopped = false;
	    _this.hasError = false;
	    _this.thrownError = null;
	    return _this;
	  }

	  Subject.prototype[rxSubscriber] = function () {
	    return new SubjectSubscriber(this);
	  };

	  Subject.prototype.lift = function (operator) {
	    var subject = new AnonymousSubject(this, this);
	    subject.operator = operator;
	    return subject;
	  };

	  Subject.prototype.next = function (value) {
	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    }

	    if (!this.isStopped) {
	      var observers = this.observers;
	      var len = observers.length;
	      var copy = observers.slice();

	      for (var i = 0; i < len; i++) {
	        copy[i].next(value);
	      }
	    }
	  };

	  Subject.prototype.error = function (err) {
	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    }

	    this.hasError = true;
	    this.thrownError = err;
	    this.isStopped = true;
	    var observers = this.observers;
	    var len = observers.length;
	    var copy = observers.slice();

	    for (var i = 0; i < len; i++) {
	      copy[i].error(err);
	    }

	    this.observers.length = 0;
	  };

	  Subject.prototype.complete = function () {
	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    }

	    this.isStopped = true;
	    var observers = this.observers;
	    var len = observers.length;
	    var copy = observers.slice();

	    for (var i = 0; i < len; i++) {
	      copy[i].complete();
	    }

	    this.observers.length = 0;
	  };

	  Subject.prototype.unsubscribe = function () {
	    this.isStopped = true;
	    this.closed = true;
	    this.observers = null;
	  };

	  Subject.prototype._trySubscribe = function (subscriber) {
	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    } else {
	      return _super.prototype._trySubscribe.call(this, subscriber);
	    }
	  };

	  Subject.prototype._subscribe = function (subscriber) {
	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    } else if (this.hasError) {
	      subscriber.error(this.thrownError);
	      return Subscription.EMPTY;
	    } else if (this.isStopped) {
	      subscriber.complete();
	      return Subscription.EMPTY;
	    } else {
	      this.observers.push(subscriber);
	      return new SubjectSubscription(this, subscriber);
	    }
	  };

	  Subject.prototype.asObservable = function () {
	    var observable = new Observable();
	    observable.source = this;
	    return observable;
	  };

	  Subject.create = function (destination, source) {
	    return new AnonymousSubject(destination, source);
	  };

	  return Subject;
	}(Observable);

	var AnonymousSubject =
	/*@__PURE__*/
	function (_super) {
	  __extends(AnonymousSubject, _super);

	  function AnonymousSubject(destination, source) {
	    var _this = _super.call(this) || this;

	    _this.destination = destination;
	    _this.source = source;
	    return _this;
	  }

	  AnonymousSubject.prototype.next = function (value) {
	    var destination = this.destination;

	    if (destination && destination.next) {
	      destination.next(value);
	    }
	  };

	  AnonymousSubject.prototype.error = function (err) {
	    var destination = this.destination;

	    if (destination && destination.error) {
	      this.destination.error(err);
	    }
	  };

	  AnonymousSubject.prototype.complete = function () {
	    var destination = this.destination;

	    if (destination && destination.complete) {
	      this.destination.complete();
	    }
	  };

	  AnonymousSubject.prototype._subscribe = function (subscriber) {
	    var source = this.source;

	    if (source) {
	      return this.source.subscribe(subscriber);
	    } else {
	      return Subscription.EMPTY;
	    }
	  };

	  return AnonymousSubject;
	}(Subject);

	/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
	function refCount() {
	  return function refCountOperatorFunction(source) {
	    return source.lift(new RefCountOperator(source));
	  };
	}

	var RefCountOperator =
	/*@__PURE__*/
	function () {
	  function RefCountOperator(connectable) {
	    this.connectable = connectable;
	  }

	  RefCountOperator.prototype.call = function (subscriber, source) {
	    var connectable = this.connectable;
	    connectable._refCount++;
	    var refCounter = new RefCountSubscriber(subscriber, connectable);
	    var subscription = source.subscribe(refCounter);

	    if (!refCounter.closed) {
	      refCounter.connection = connectable.connect();
	    }

	    return subscription;
	  };

	  return RefCountOperator;
	}();

	var RefCountSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(RefCountSubscriber, _super);

	  function RefCountSubscriber(destination, connectable) {
	    var _this = _super.call(this, destination) || this;

	    _this.connectable = connectable;
	    return _this;
	  }

	  RefCountSubscriber.prototype._unsubscribe = function () {
	    var connectable = this.connectable;

	    if (!connectable) {
	      this.connection = null;
	      return;
	    }

	    this.connectable = null;
	    var refCount = connectable._refCount;

	    if (refCount <= 0) {
	      this.connection = null;
	      return;
	    }

	    connectable._refCount = refCount - 1;

	    if (refCount > 1) {
	      this.connection = null;
	      return;
	    }

	    var connection = this.connection;
	    var sharedConnection = connectable._connection;
	    this.connection = null;

	    if (sharedConnection && (!connection || sharedConnection === connection)) {
	      sharedConnection.unsubscribe();
	    }
	  };

	  return RefCountSubscriber;
	}(Subscriber);

	/** PURE_IMPORTS_START tslib,_Subject,_Observable,_Subscriber,_Subscription,_operators_refCount PURE_IMPORTS_END */

	var ConnectableObservable =
	/*@__PURE__*/
	function (_super) {
	  __extends(ConnectableObservable, _super);

	  function ConnectableObservable(source, subjectFactory) {
	    var _this = _super.call(this) || this;

	    _this.source = source;
	    _this.subjectFactory = subjectFactory;
	    _this._refCount = 0;
	    _this._isComplete = false;
	    return _this;
	  }

	  ConnectableObservable.prototype._subscribe = function (subscriber) {
	    return this.getSubject().subscribe(subscriber);
	  };

	  ConnectableObservable.prototype.getSubject = function () {
	    var subject = this._subject;

	    if (!subject || subject.isStopped) {
	      this._subject = this.subjectFactory();
	    }

	    return this._subject;
	  };

	  ConnectableObservable.prototype.connect = function () {
	    var connection = this._connection;

	    if (!connection) {
	      this._isComplete = false;
	      connection = this._connection = new Subscription();
	      connection.add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));

	      if (connection.closed) {
	        this._connection = null;
	        connection = Subscription.EMPTY;
	      } else {
	        this._connection = connection;
	      }
	    }

	    return connection;
	  };

	  ConnectableObservable.prototype.refCount = function () {
	    return refCount()(this);
	  };

	  return ConnectableObservable;
	}(Observable);
	var connectableProto = ConnectableObservable.prototype;
	var connectableObservableDescriptor = {
	  operator: {
	    value: null
	  },
	  _refCount: {
	    value: 0,
	    writable: true
	  },
	  _subject: {
	    value: null,
	    writable: true
	  },
	  _connection: {
	    value: null,
	    writable: true
	  },
	  _subscribe: {
	    value: connectableProto._subscribe
	  },
	  _isComplete: {
	    value: connectableProto._isComplete,
	    writable: true
	  },
	  getSubject: {
	    value: connectableProto.getSubject
	  },
	  connect: {
	    value: connectableProto.connect
	  },
	  refCount: {
	    value: connectableProto.refCount
	  }
	};

	var ConnectableSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(ConnectableSubscriber, _super);

	  function ConnectableSubscriber(destination, connectable) {
	    var _this = _super.call(this, destination) || this;

	    _this.connectable = connectable;
	    return _this;
	  }

	  ConnectableSubscriber.prototype._error = function (err) {
	    this._unsubscribe();

	    _super.prototype._error.call(this, err);
	  };

	  ConnectableSubscriber.prototype._complete = function () {
	    this.connectable._isComplete = true;

	    this._unsubscribe();

	    _super.prototype._complete.call(this);
	  };

	  ConnectableSubscriber.prototype._unsubscribe = function () {
	    var connectable = this.connectable;

	    if (connectable) {
	      this.connectable = null;
	      var connection = connectable._connection;
	      connectable._refCount = 0;
	      connectable._subject = null;
	      connectable._connection = null;

	      if (connection) {
	        connection.unsubscribe();
	      }
	    }
	  };

	  return ConnectableSubscriber;
	}(SubjectSubscriber);

	var RefCountSubscriber$1 =
	/*@__PURE__*/
	function (_super) {
	  __extends(RefCountSubscriber, _super);

	  function RefCountSubscriber(destination, connectable) {
	    var _this = _super.call(this, destination) || this;

	    _this.connectable = connectable;
	    return _this;
	  }

	  RefCountSubscriber.prototype._unsubscribe = function () {
	    var connectable = this.connectable;

	    if (!connectable) {
	      this.connection = null;
	      return;
	    }

	    this.connectable = null;
	    var refCount$$1 = connectable._refCount;

	    if (refCount$$1 <= 0) {
	      this.connection = null;
	      return;
	    }

	    connectable._refCount = refCount$$1 - 1;

	    if (refCount$$1 > 1) {
	      this.connection = null;
	      return;
	    }

	    var connection = this.connection;
	    var sharedConnection = connectable._connection;
	    this.connection = null;

	    if (sharedConnection && (!connection || sharedConnection === connection)) {
	      sharedConnection.unsubscribe();
	    }
	  };

	  return RefCountSubscriber;
	}(Subscriber);

	/** PURE_IMPORTS_START tslib,_Subscriber,_Subscription,_Observable,_Subject PURE_IMPORTS_END */

	var GroupBySubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(GroupBySubscriber, _super);

	  function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.keySelector = keySelector;
	    _this.elementSelector = elementSelector;
	    _this.durationSelector = durationSelector;
	    _this.subjectSelector = subjectSelector;
	    _this.groups = null;
	    _this.attemptedToUnsubscribe = false;
	    _this.count = 0;
	    return _this;
	  }

	  GroupBySubscriber.prototype._next = function (value) {
	    var key;

	    try {
	      key = this.keySelector(value);
	    } catch (err) {
	      this.error(err);
	      return;
	    }

	    this._group(value, key);
	  };

	  GroupBySubscriber.prototype._group = function (value, key) {
	    var groups = this.groups;

	    if (!groups) {
	      groups = this.groups = new Map();
	    }

	    var group = groups.get(key);
	    var element;

	    if (this.elementSelector) {
	      try {
	        element = this.elementSelector(value);
	      } catch (err) {
	        this.error(err);
	      }
	    } else {
	      element = value;
	    }

	    if (!group) {
	      group = this.subjectSelector ? this.subjectSelector() : new Subject();
	      groups.set(key, group);
	      var groupedObservable = new GroupedObservable(key, group, this);
	      this.destination.next(groupedObservable);

	      if (this.durationSelector) {
	        var duration = void 0;

	        try {
	          duration = this.durationSelector(new GroupedObservable(key, group));
	        } catch (err) {
	          this.error(err);
	          return;
	        }

	        this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
	      }
	    }

	    if (!group.closed) {
	      group.next(element);
	    }
	  };

	  GroupBySubscriber.prototype._error = function (err) {
	    var groups = this.groups;

	    if (groups) {
	      groups.forEach(function (group, key) {
	        group.error(err);
	      });
	      groups.clear();
	    }

	    this.destination.error(err);
	  };

	  GroupBySubscriber.prototype._complete = function () {
	    var groups = this.groups;

	    if (groups) {
	      groups.forEach(function (group, key) {
	        group.complete();
	      });
	      groups.clear();
	    }

	    this.destination.complete();
	  };

	  GroupBySubscriber.prototype.removeGroup = function (key) {
	    this.groups.delete(key);
	  };

	  GroupBySubscriber.prototype.unsubscribe = function () {
	    if (!this.closed) {
	      this.attemptedToUnsubscribe = true;

	      if (this.count === 0) {
	        _super.prototype.unsubscribe.call(this);
	      }
	    }
	  };

	  return GroupBySubscriber;
	}(Subscriber);

	var GroupDurationSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(GroupDurationSubscriber, _super);

	  function GroupDurationSubscriber(key, group, parent) {
	    var _this = _super.call(this, group) || this;

	    _this.key = key;
	    _this.group = group;
	    _this.parent = parent;
	    return _this;
	  }

	  GroupDurationSubscriber.prototype._next = function (value) {
	    this.complete();
	  };

	  GroupDurationSubscriber.prototype._unsubscribe = function () {
	    var _a = this,
	        parent = _a.parent,
	        key = _a.key;

	    this.key = this.parent = null;

	    if (parent) {
	      parent.removeGroup(key);
	    }
	  };

	  return GroupDurationSubscriber;
	}(Subscriber);

	var GroupedObservable =
	/*@__PURE__*/
	function (_super) {
	  __extends(GroupedObservable, _super);

	  function GroupedObservable(key, groupSubject, refCountSubscription) {
	    var _this = _super.call(this) || this;

	    _this.key = key;
	    _this.groupSubject = groupSubject;
	    _this.refCountSubscription = refCountSubscription;
	    return _this;
	  }

	  GroupedObservable.prototype._subscribe = function (subscriber) {
	    var subscription = new Subscription();

	    var _a = this,
	        refCountSubscription = _a.refCountSubscription,
	        groupSubject = _a.groupSubject;

	    if (refCountSubscription && !refCountSubscription.closed) {
	      subscription.add(new InnerRefCountSubscription(refCountSubscription));
	    }

	    subscription.add(groupSubject.subscribe(subscriber));
	    return subscription;
	  };

	  return GroupedObservable;
	}(Observable);

	var InnerRefCountSubscription =
	/*@__PURE__*/
	function (_super) {
	  __extends(InnerRefCountSubscription, _super);

	  function InnerRefCountSubscription(parent) {
	    var _this = _super.call(this) || this;

	    _this.parent = parent;
	    parent.count++;
	    return _this;
	  }

	  InnerRefCountSubscription.prototype.unsubscribe = function () {
	    var parent = this.parent;

	    if (!parent.closed && !this.closed) {
	      _super.prototype.unsubscribe.call(this);

	      parent.count -= 1;

	      if (parent.count === 0 && parent.attemptedToUnsubscribe) {
	        parent.unsubscribe();
	      }
	    }
	  };

	  return InnerRefCountSubscription;
	}(Subscription);

	/** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */

	var BehaviorSubject =
	/*@__PURE__*/
	function (_super) {
	  __extends(BehaviorSubject, _super);

	  function BehaviorSubject(_value) {
	    var _this = _super.call(this) || this;

	    _this._value = _value;
	    return _this;
	  }

	  Object.defineProperty(BehaviorSubject.prototype, "value", {
	    get: function () {
	      return this.getValue();
	    },
	    enumerable: true,
	    configurable: true
	  });

	  BehaviorSubject.prototype._subscribe = function (subscriber) {
	    var subscription = _super.prototype._subscribe.call(this, subscriber);

	    if (subscription && !subscription.closed) {
	      subscriber.next(this._value);
	    }

	    return subscription;
	  };

	  BehaviorSubject.prototype.getValue = function () {
	    if (this.hasError) {
	      throw this.thrownError;
	    } else if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    } else {
	      return this._value;
	    }
	  };

	  BehaviorSubject.prototype.next = function (value) {
	    _super.prototype.next.call(this, this._value = value);
	  };

	  return BehaviorSubject;
	}(Subject);

	/** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */

	var Action =
	/*@__PURE__*/
	function (_super) {
	  __extends(Action, _super);

	  function Action(scheduler, work) {
	    return _super.call(this) || this;
	  }

	  Action.prototype.schedule = function (state, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    return this;
	  };

	  return Action;
	}(Subscription);

	/** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */

	var AsyncAction =
	/*@__PURE__*/
	function (_super) {
	  __extends(AsyncAction, _super);

	  function AsyncAction(scheduler, work) {
	    var _this = _super.call(this, scheduler, work) || this;

	    _this.scheduler = scheduler;
	    _this.work = work;
	    _this.pending = false;
	    return _this;
	  }

	  AsyncAction.prototype.schedule = function (state, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (this.closed) {
	      return this;
	    }

	    this.state = state;
	    var id = this.id;
	    var scheduler = this.scheduler;

	    if (id != null) {
	      this.id = this.recycleAsyncId(scheduler, id, delay);
	    }

	    this.pending = true;
	    this.delay = delay;
	    this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
	    return this;
	  };

	  AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    return setInterval(scheduler.flush.bind(scheduler, this), delay);
	  };

	  AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && this.delay === delay && this.pending === false) {
	      return id;
	    }

	    clearInterval(id);
	  };

	  AsyncAction.prototype.execute = function (state, delay) {
	    if (this.closed) {
	      return new Error('executing a cancelled action');
	    }

	    this.pending = false;

	    var error = this._execute(state, delay);

	    if (error) {
	      return error;
	    } else if (this.pending === false && this.id != null) {
	      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
	    }
	  };

	  AsyncAction.prototype._execute = function (state, delay) {
	    var errored = false;
	    var errorValue = undefined;

	    try {
	      this.work(state);
	    } catch (e) {
	      errored = true;
	      errorValue = !!e && e || new Error(e);
	    }

	    if (errored) {
	      this.unsubscribe();
	      return errorValue;
	    }
	  };

	  AsyncAction.prototype._unsubscribe = function () {
	    var id = this.id;
	    var scheduler = this.scheduler;
	    var actions = scheduler.actions;
	    var index = actions.indexOf(this);
	    this.work = null;
	    this.state = null;
	    this.pending = false;
	    this.scheduler = null;

	    if (index !== -1) {
	      actions.splice(index, 1);
	    }

	    if (id != null) {
	      this.id = this.recycleAsyncId(scheduler, id, null);
	    }

	    this.delay = null;
	  };

	  return AsyncAction;
	}(Action);

	/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */

	var QueueAction =
	/*@__PURE__*/
	function (_super) {
	  __extends(QueueAction, _super);

	  function QueueAction(scheduler, work) {
	    var _this = _super.call(this, scheduler, work) || this;

	    _this.scheduler = scheduler;
	    _this.work = work;
	    return _this;
	  }

	  QueueAction.prototype.schedule = function (state, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay > 0) {
	      return _super.prototype.schedule.call(this, state, delay);
	    }

	    this.delay = delay;
	    this.state = state;
	    this.scheduler.flush(this);
	    return this;
	  };

	  QueueAction.prototype.execute = function (state, delay) {
	    return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
	  };

	  QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
	      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	    }

	    return scheduler.flush(this);
	  };

	  return QueueAction;
	}(AsyncAction);

	var Scheduler =
	/*@__PURE__*/
	function () {
	  function Scheduler(SchedulerAction, now) {
	    if (now === void 0) {
	      now = Scheduler.now;
	    }

	    this.SchedulerAction = SchedulerAction;
	    this.now = now;
	  }

	  Scheduler.prototype.schedule = function (work, delay, state) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    return new this.SchedulerAction(this, work).schedule(state, delay);
	  };

	  Scheduler.now = function () {
	    return Date.now();
	  };

	  return Scheduler;
	}();

	/** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */

	var AsyncScheduler =
	/*@__PURE__*/
	function (_super) {
	  __extends(AsyncScheduler, _super);

	  function AsyncScheduler(SchedulerAction, now) {
	    if (now === void 0) {
	      now = Scheduler.now;
	    }

	    var _this = _super.call(this, SchedulerAction, function () {
	      if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
	        return AsyncScheduler.delegate.now();
	      } else {
	        return now();
	      }
	    }) || this;

	    _this.actions = [];
	    _this.active = false;
	    _this.scheduled = undefined;
	    return _this;
	  }

	  AsyncScheduler.prototype.schedule = function (work, delay, state) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
	      return AsyncScheduler.delegate.schedule(work, delay, state);
	    } else {
	      return _super.prototype.schedule.call(this, work, delay, state);
	    }
	  };

	  AsyncScheduler.prototype.flush = function (action) {
	    var actions = this.actions;

	    if (this.active) {
	      actions.push(action);
	      return;
	    }

	    var error;
	    this.active = true;

	    do {
	      if (error = action.execute(action.state, action.delay)) {
	        break;
	      }
	    } while (action = actions.shift());

	    this.active = false;

	    if (error) {
	      while (action = actions.shift()) {
	        action.unsubscribe();
	      }

	      throw error;
	    }
	  };

	  return AsyncScheduler;
	}(Scheduler);

	/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */

	var QueueScheduler =
	/*@__PURE__*/
	function (_super) {
	  __extends(QueueScheduler, _super);

	  function QueueScheduler() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  return QueueScheduler;
	}(AsyncScheduler);

	/** PURE_IMPORTS_START _QueueAction,_QueueScheduler PURE_IMPORTS_END */
	var queue =
	/*@__PURE__*/
	new QueueScheduler(QueueAction);

	/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
	var EMPTY =
	/*@__PURE__*/
	new Observable(function (subscriber) {
	  return subscriber.complete();
	});
	function empty$1(scheduler) {
	  return scheduler ? emptyScheduled(scheduler) : EMPTY;
	}
	function emptyScheduled(scheduler) {
	  return new Observable(function (subscriber) {
	    return scheduler.schedule(function () {
	      return subscriber.complete();
	    });
	  });
	}

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	function isScheduler(value) {
	  return value && typeof value.schedule === 'function';
	}

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	var subscribeToArray = function (array) {
	  return function (subscriber) {
	    for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
	      subscriber.next(array[i]);
	    }

	    if (!subscriber.closed) {
	      subscriber.complete();
	    }
	  };
	};

	/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToArray PURE_IMPORTS_END */
	function fromArray(input, scheduler) {
	  if (!scheduler) {
	    return new Observable(subscribeToArray(input));
	  } else {
	    return new Observable(function (subscriber) {
	      var sub = new Subscription();
	      var i = 0;
	      sub.add(scheduler.schedule(function () {
	        if (i === input.length) {
	          subscriber.complete();
	          return;
	        }

	        subscriber.next(input[i++]);

	        if (!subscriber.closed) {
	          sub.add(this.schedule());
	        }
	      }));
	      return sub;
	    });
	  }
	}

	/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
	function scalar(value) {
	  var result = new Observable(function (subscriber) {
	    subscriber.next(value);
	    subscriber.complete();
	  });
	  result._isScalar = true;
	  result.value = value;
	  return result;
	}

	/** PURE_IMPORTS_START _util_isScheduler,_fromArray,_empty,_scalar PURE_IMPORTS_END */
	function of() {
	  var args = [];

	  for (var _i = 0; _i < arguments.length; _i++) {
	    args[_i] = arguments[_i];
	  }

	  var scheduler = args[args.length - 1];

	  if (isScheduler(scheduler)) {
	    args.pop();
	  } else {
	    scheduler = undefined;
	  }

	  switch (args.length) {
	    case 0:
	      return empty$1(scheduler);

	    case 1:
	      return scheduler ? fromArray(args, scheduler) : scalar(args[0]);

	    default:
	      return fromArray(args, scheduler);
	  }
	}

	/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
	function throwError(error, scheduler) {
	  if (!scheduler) {
	    return new Observable(function (subscriber) {
	      return subscriber.error(error);
	    });
	  } else {
	    return new Observable(function (subscriber) {
	      return scheduler.schedule(dispatch, 0, {
	        error: error,
	        subscriber: subscriber
	      });
	    });
	  }
	}

	function dispatch(_a) {
	  var error = _a.error,
	      subscriber = _a.subscriber;
	  subscriber.error(error);
	}

	/** PURE_IMPORTS_START _observable_empty,_observable_of,_observable_throwError PURE_IMPORTS_END */

	var Notification =
	/*@__PURE__*/
	function () {
	  function Notification(kind, value, error) {
	    this.kind = kind;
	    this.value = value;
	    this.error = error;
	    this.hasValue = kind === 'N';
	  }

	  Notification.prototype.observe = function (observer) {
	    switch (this.kind) {
	      case 'N':
	        return observer.next && observer.next(this.value);

	      case 'E':
	        return observer.error && observer.error(this.error);

	      case 'C':
	        return observer.complete && observer.complete();
	    }
	  };

	  Notification.prototype.do = function (next, error, complete) {
	    var kind = this.kind;

	    switch (kind) {
	      case 'N':
	        return next && next(this.value);

	      case 'E':
	        return error && error(this.error);

	      case 'C':
	        return complete && complete();
	    }
	  };

	  Notification.prototype.accept = function (nextOrObserver, error, complete) {
	    if (nextOrObserver && typeof nextOrObserver.next === 'function') {
	      return this.observe(nextOrObserver);
	    } else {
	      return this.do(nextOrObserver, error, complete);
	    }
	  };

	  Notification.prototype.toObservable = function () {
	    var kind = this.kind;

	    switch (kind) {
	      case 'N':
	        return of(this.value);

	      case 'E':
	        return throwError(this.error);

	      case 'C':
	        return empty$1();
	    }

	    throw new Error('unexpected notification kind value');
	  };

	  Notification.createNext = function (value) {
	    if (typeof value !== 'undefined') {
	      return new Notification('N', value);
	    }

	    return Notification.undefinedValueNotification;
	  };

	  Notification.createError = function (err) {
	    return new Notification('E', undefined, err);
	  };

	  Notification.createComplete = function () {
	    return Notification.completeNotification;
	  };

	  Notification.completeNotification = new Notification('C');
	  Notification.undefinedValueNotification = new Notification('N', undefined);
	  return Notification;
	}();

	/** PURE_IMPORTS_START tslib,_Subscriber,_Notification PURE_IMPORTS_END */

	var ObserveOnSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(ObserveOnSubscriber, _super);

	  function ObserveOnSubscriber(destination, scheduler, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    var _this = _super.call(this, destination) || this;

	    _this.scheduler = scheduler;
	    _this.delay = delay;
	    return _this;
	  }

	  ObserveOnSubscriber.dispatch = function (arg) {
	    var notification = arg.notification,
	        destination = arg.destination;
	    notification.observe(destination);
	    this.unsubscribe();
	  };

	  ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
	    var destination = this.destination;
	    destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
	  };

	  ObserveOnSubscriber.prototype._next = function (value) {
	    this.scheduleMessage(Notification.createNext(value));
	  };

	  ObserveOnSubscriber.prototype._error = function (err) {
	    this.scheduleMessage(Notification.createError(err));
	    this.unsubscribe();
	  };

	  ObserveOnSubscriber.prototype._complete = function () {
	    this.scheduleMessage(Notification.createComplete());
	    this.unsubscribe();
	  };

	  return ObserveOnSubscriber;
	}(Subscriber);

	var ObserveOnMessage =
	/*@__PURE__*/
	function () {
	  function ObserveOnMessage(notification, destination) {
	    this.notification = notification;
	    this.destination = destination;
	  }

	  return ObserveOnMessage;
	}();

	/** PURE_IMPORTS_START tslib,_Subject,_scheduler_queue,_Subscription,_operators_observeOn,_util_ObjectUnsubscribedError,_SubjectSubscription PURE_IMPORTS_END */

	var ReplaySubject =
	/*@__PURE__*/
	function (_super) {
	  __extends(ReplaySubject, _super);

	  function ReplaySubject(bufferSize, windowTime, scheduler) {
	    if (bufferSize === void 0) {
	      bufferSize = Number.POSITIVE_INFINITY;
	    }

	    if (windowTime === void 0) {
	      windowTime = Number.POSITIVE_INFINITY;
	    }

	    var _this = _super.call(this) || this;

	    _this.scheduler = scheduler;
	    _this._events = [];
	    _this._infiniteTimeWindow = false;
	    _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
	    _this._windowTime = windowTime < 1 ? 1 : windowTime;

	    if (windowTime === Number.POSITIVE_INFINITY) {
	      _this._infiniteTimeWindow = true;
	      _this.next = _this.nextInfiniteTimeWindow;
	    } else {
	      _this.next = _this.nextTimeWindow;
	    }

	    return _this;
	  }

	  ReplaySubject.prototype.nextInfiniteTimeWindow = function (value) {
	    var _events = this._events;

	    _events.push(value);

	    if (_events.length > this._bufferSize) {
	      _events.shift();
	    }

	    _super.prototype.next.call(this, value);
	  };

	  ReplaySubject.prototype.nextTimeWindow = function (value) {
	    this._events.push(new ReplayEvent(this._getNow(), value));

	    this._trimBufferThenGetEvents();

	    _super.prototype.next.call(this, value);
	  };

	  ReplaySubject.prototype._subscribe = function (subscriber) {
	    var _infiniteTimeWindow = this._infiniteTimeWindow;

	    var _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();

	    var scheduler = this.scheduler;
	    var len = _events.length;
	    var subscription;

	    if (this.closed) {
	      throw new ObjectUnsubscribedError();
	    } else if (this.isStopped || this.hasError) {
	      subscription = Subscription.EMPTY;
	    } else {
	      this.observers.push(subscriber);
	      subscription = new SubjectSubscription(this, subscriber);
	    }

	    if (scheduler) {
	      subscriber.add(subscriber = new ObserveOnSubscriber(subscriber, scheduler));
	    }

	    if (_infiniteTimeWindow) {
	      for (var i = 0; i < len && !subscriber.closed; i++) {
	        subscriber.next(_events[i]);
	      }
	    } else {
	      for (var i = 0; i < len && !subscriber.closed; i++) {
	        subscriber.next(_events[i].value);
	      }
	    }

	    if (this.hasError) {
	      subscriber.error(this.thrownError);
	    } else if (this.isStopped) {
	      subscriber.complete();
	    }

	    return subscription;
	  };

	  ReplaySubject.prototype._getNow = function () {
	    return (this.scheduler || queue).now();
	  };

	  ReplaySubject.prototype._trimBufferThenGetEvents = function () {
	    var now = this._getNow();

	    var _bufferSize = this._bufferSize;
	    var _windowTime = this._windowTime;
	    var _events = this._events;
	    var eventsCount = _events.length;
	    var spliceCount = 0;

	    while (spliceCount < eventsCount) {
	      if (now - _events[spliceCount].time < _windowTime) {
	        break;
	      }

	      spliceCount++;
	    }

	    if (eventsCount > _bufferSize) {
	      spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
	    }

	    if (spliceCount > 0) {
	      _events.splice(0, spliceCount);
	    }

	    return _events;
	  };

	  return ReplaySubject;
	}(Subject);

	var ReplayEvent =
	/*@__PURE__*/
	function () {
	  function ReplayEvent(time, value) {
	    this.time = time;
	    this.value = value;
	  }

	  return ReplayEvent;
	}();

	/** PURE_IMPORTS_START tslib,_Subject,_Subscription PURE_IMPORTS_END */

	var AsyncSubject =
	/*@__PURE__*/
	function (_super) {
	  __extends(AsyncSubject, _super);

	  function AsyncSubject() {
	    var _this = _super !== null && _super.apply(this, arguments) || this;

	    _this.value = null;
	    _this.hasNext = false;
	    _this.hasCompleted = false;
	    return _this;
	  }

	  AsyncSubject.prototype._subscribe = function (subscriber) {
	    if (this.hasError) {
	      subscriber.error(this.thrownError);
	      return Subscription.EMPTY;
	    } else if (this.hasCompleted && this.hasNext) {
	      subscriber.next(this.value);
	      subscriber.complete();
	      return Subscription.EMPTY;
	    }

	    return _super.prototype._subscribe.call(this, subscriber);
	  };

	  AsyncSubject.prototype.next = function (value) {
	    if (!this.hasCompleted) {
	      this.value = value;
	      this.hasNext = true;
	    }
	  };

	  AsyncSubject.prototype.error = function (error) {
	    if (!this.hasCompleted) {
	      _super.prototype.error.call(this, error);
	    }
	  };

	  AsyncSubject.prototype.complete = function () {
	    this.hasCompleted = true;

	    if (this.hasNext) {
	      _super.prototype.next.call(this, this.value);
	    }

	    _super.prototype.complete.call(this);
	  };

	  return AsyncSubject;
	}(Subject);

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	var nextHandle = 1;
	var tasksByHandle = {};

	function runIfPresent(handle) {
	  var cb = tasksByHandle[handle];

	  if (cb) {
	    cb();
	  }
	}

	var Immediate = {
	  setImmediate: function (cb) {
	    var handle = nextHandle++;
	    tasksByHandle[handle] = cb;
	    Promise.resolve().then(function () {
	      return runIfPresent(handle);
	    });
	    return handle;
	  },
	  clearImmediate: function (handle) {
	    delete tasksByHandle[handle];
	  }
	};

	/** PURE_IMPORTS_START tslib,_util_Immediate,_AsyncAction PURE_IMPORTS_END */

	var AsapAction =
	/*@__PURE__*/
	function (_super) {
	  __extends(AsapAction, _super);

	  function AsapAction(scheduler, work) {
	    var _this = _super.call(this, scheduler, work) || this;

	    _this.scheduler = scheduler;
	    _this.work = work;
	    return _this;
	  }

	  AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && delay > 0) {
	      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	    }

	    scheduler.actions.push(this);
	    return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
	  };

	  AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
	      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
	    }

	    if (scheduler.actions.length === 0) {
	      Immediate.clearImmediate(id);
	      scheduler.scheduled = undefined;
	    }

	    return undefined;
	  };

	  return AsapAction;
	}(AsyncAction);

	/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */

	var AsapScheduler =
	/*@__PURE__*/
	function (_super) {
	  __extends(AsapScheduler, _super);

	  function AsapScheduler() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  AsapScheduler.prototype.flush = function (action) {
	    this.active = true;
	    this.scheduled = undefined;
	    var actions = this.actions;
	    var error;
	    var index = -1;
	    var count = actions.length;
	    action = action || actions.shift();

	    do {
	      if (error = action.execute(action.state, action.delay)) {
	        break;
	      }
	    } while (++index < count && (action = actions.shift()));

	    this.active = false;

	    if (error) {
	      while (++index < count && (action = actions.shift())) {
	        action.unsubscribe();
	      }

	      throw error;
	    }
	  };

	  return AsapScheduler;
	}(AsyncScheduler);

	/** PURE_IMPORTS_START _AsapAction,_AsapScheduler PURE_IMPORTS_END */
	var asap =
	/*@__PURE__*/
	new AsapScheduler(AsapAction);

	/** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
	var async =
	/*@__PURE__*/
	new AsyncScheduler(AsyncAction);

	/** PURE_IMPORTS_START tslib,_AsyncAction PURE_IMPORTS_END */

	var AnimationFrameAction =
	/*@__PURE__*/
	function (_super) {
	  __extends(AnimationFrameAction, _super);

	  function AnimationFrameAction(scheduler, work) {
	    var _this = _super.call(this, scheduler, work) || this;

	    _this.scheduler = scheduler;
	    _this.work = work;
	    return _this;
	  }

	  AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && delay > 0) {
	      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	    }

	    scheduler.actions.push(this);
	    return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function () {
	      return scheduler.flush(null);
	    }));
	  };

	  AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (delay !== null && delay > 0 || delay === null && this.delay > 0) {
	      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
	    }

	    if (scheduler.actions.length === 0) {
	      cancelAnimationFrame(id);
	      scheduler.scheduled = undefined;
	    }

	    return undefined;
	  };

	  return AnimationFrameAction;
	}(AsyncAction);

	/** PURE_IMPORTS_START tslib,_AsyncScheduler PURE_IMPORTS_END */

	var AnimationFrameScheduler =
	/*@__PURE__*/
	function (_super) {
	  __extends(AnimationFrameScheduler, _super);

	  function AnimationFrameScheduler() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  AnimationFrameScheduler.prototype.flush = function (action) {
	    this.active = true;
	    this.scheduled = undefined;
	    var actions = this.actions;
	    var error;
	    var index = -1;
	    var count = actions.length;
	    action = action || actions.shift();

	    do {
	      if (error = action.execute(action.state, action.delay)) {
	        break;
	      }
	    } while (++index < count && (action = actions.shift()));

	    this.active = false;

	    if (error) {
	      while (++index < count && (action = actions.shift())) {
	        action.unsubscribe();
	      }

	      throw error;
	    }
	  };

	  return AnimationFrameScheduler;
	}(AsyncScheduler);

	/** PURE_IMPORTS_START _AnimationFrameAction,_AnimationFrameScheduler PURE_IMPORTS_END */
	var animationFrame =
	/*@__PURE__*/
	new AnimationFrameScheduler(AnimationFrameAction);

	/** PURE_IMPORTS_START tslib,_AsyncAction,_AsyncScheduler PURE_IMPORTS_END */

	var VirtualTimeScheduler =
	/*@__PURE__*/
	function (_super) {
	  __extends(VirtualTimeScheduler, _super);

	  function VirtualTimeScheduler(SchedulerAction, maxFrames) {
	    if (SchedulerAction === void 0) {
	      SchedulerAction = VirtualAction;
	    }

	    if (maxFrames === void 0) {
	      maxFrames = Number.POSITIVE_INFINITY;
	    }

	    var _this = _super.call(this, SchedulerAction, function () {
	      return _this.frame;
	    }) || this;

	    _this.maxFrames = maxFrames;
	    _this.frame = 0;
	    _this.index = -1;
	    return _this;
	  }

	  VirtualTimeScheduler.prototype.flush = function () {
	    var _a = this,
	        actions = _a.actions,
	        maxFrames = _a.maxFrames;

	    var error, action;

	    while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
	      if (error = action.execute(action.state, action.delay)) {
	        break;
	      }
	    }

	    if (error) {
	      while (action = actions.shift()) {
	        action.unsubscribe();
	      }

	      throw error;
	    }
	  };

	  VirtualTimeScheduler.frameTimeFactor = 10;
	  return VirtualTimeScheduler;
	}(AsyncScheduler);

	var VirtualAction =
	/*@__PURE__*/
	function (_super) {
	  __extends(VirtualAction, _super);

	  function VirtualAction(scheduler, work, index) {
	    if (index === void 0) {
	      index = scheduler.index += 1;
	    }

	    var _this = _super.call(this, scheduler, work) || this;

	    _this.scheduler = scheduler;
	    _this.work = work;
	    _this.index = index;
	    _this.active = true;
	    _this.index = scheduler.index = index;
	    return _this;
	  }

	  VirtualAction.prototype.schedule = function (state, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    if (!this.id) {
	      return _super.prototype.schedule.call(this, state, delay);
	    }

	    this.active = false;
	    var action = new VirtualAction(this.scheduler, this.work);
	    this.add(action);
	    return action.schedule(state, delay);
	  };

	  VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    this.delay = scheduler.frame + delay;
	    var actions = scheduler.actions;
	    actions.push(this);
	    actions.sort(VirtualAction.sortActions);
	    return true;
	  };

	  VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	    if (delay === void 0) {
	      delay = 0;
	    }

	    return undefined;
	  };

	  VirtualAction.prototype._execute = function (state, delay) {
	    if (this.active === true) {
	      return _super.prototype._execute.call(this, state, delay);
	    }
	  };

	  VirtualAction.sortActions = function (a, b) {
	    if (a.delay === b.delay) {
	      if (a.index === b.index) {
	        return 0;
	      } else if (a.index > b.index) {
	        return 1;
	      } else {
	        return -1;
	      }
	    } else if (a.delay > b.delay) {
	      return 1;
	    } else {
	      return -1;
	    }
	  };

	  return VirtualAction;
	}(AsyncAction);

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */

	/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

	var MapSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(MapSubscriber, _super);

	  function MapSubscriber(destination, project, thisArg) {
	    var _this = _super.call(this, destination) || this;

	    _this.project = project;
	    _this.count = 0;
	    _this.thisArg = thisArg || _this;
	    return _this;
	  }

	  MapSubscriber.prototype._next = function (value) {
	    var result;

	    try {
	      result = this.project.call(this.thisArg, value, this.count++);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.destination.next(result);
	  };

	  return MapSubscriber;
	}(Subscriber);

	/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isArray,_util_isScheduler PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_AsyncSubject,_operators_map,_util_canReportError,_util_isScheduler,_util_isArray PURE_IMPORTS_END */

	/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

	var OuterSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(OuterSubscriber, _super);

	  function OuterSubscriber() {
	    return _super !== null && _super.apply(this, arguments) || this;
	  }

	  OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.destination.next(innerValue);
	  };

	  OuterSubscriber.prototype.notifyError = function (error, innerSub) {
	    this.destination.error(error);
	  };

	  OuterSubscriber.prototype.notifyComplete = function (innerSub) {
	    this.destination.complete();
	  };

	  return OuterSubscriber;
	}(Subscriber);

	/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */

	var InnerSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(InnerSubscriber, _super);

	  function InnerSubscriber(parent, outerValue, outerIndex) {
	    var _this = _super.call(this) || this;

	    _this.parent = parent;
	    _this.outerValue = outerValue;
	    _this.outerIndex = outerIndex;
	    _this.index = 0;
	    return _this;
	  }

	  InnerSubscriber.prototype._next = function (value) {
	    this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
	  };

	  InnerSubscriber.prototype._error = function (error) {
	    this.parent.notifyError(error, this);
	    this.unsubscribe();
	  };

	  InnerSubscriber.prototype._complete = function () {
	    this.parent.notifyComplete(this);
	    this.unsubscribe();
	  };

	  return InnerSubscriber;
	}(Subscriber);

	/** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */
	var subscribeToPromise = function (promise) {
	  return function (subscriber) {
	    promise.then(function (value) {
	      if (!subscriber.closed) {
	        subscriber.next(value);
	        subscriber.complete();
	      }
	    }, function (err) {
	      return subscriber.error(err);
	    }).then(null, hostReportError);
	    return subscriber;
	  };
	};

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	function getSymbolIterator() {
	  if (typeof Symbol !== 'function' || !Symbol.iterator) {
	    return '@@iterator';
	  }

	  return Symbol.iterator;
	}
	var iterator =
	/*@__PURE__*/
	getSymbolIterator();

	/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
	var subscribeToIterable = function (iterable) {
	  return function (subscriber) {
	    var iterator$$1 = iterable[iterator]();

	    do {
	      var item = iterator$$1.next();

	      if (item.done) {
	        subscriber.complete();
	        break;
	      }

	      subscriber.next(item.value);

	      if (subscriber.closed) {
	        break;
	      }
	    } while (true);

	    if (typeof iterator$$1.return === 'function') {
	      subscriber.add(function () {
	        if (iterator$$1.return) {
	          iterator$$1.return();
	        }
	      });
	    }

	    return subscriber;
	  };
	};

	/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
	var subscribeToObservable = function (obj) {
	  return function (subscriber) {
	    var obs = obj[observable]();

	    if (typeof obs.subscribe !== 'function') {
	      throw new TypeError('Provided object does not correctly implement Symbol.observable');
	    } else {
	      return obs.subscribe(subscriber);
	    }
	  };
	};

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	var isArrayLike = function (x) {
	  return x && typeof x.length === 'number' && typeof x !== 'function';
	};

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */
	function isPromise(value) {
	  return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}

	/** PURE_IMPORTS_START _Observable,_subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */
	var subscribeTo = function (result) {
	  if (result instanceof Observable) {
	    return function (subscriber) {
	      if (result._isScalar) {
	        subscriber.next(result.value);
	        subscriber.complete();
	        return undefined;
	      } else {
	        return result.subscribe(subscriber);
	      }
	    };
	  } else if (result && typeof result[observable] === 'function') {
	    return subscribeToObservable(result);
	  } else if (isArrayLike(result)) {
	    return subscribeToArray(result);
	  } else if (isPromise(result)) {
	    return subscribeToPromise(result);
	  } else if (result && typeof result[iterator] === 'function') {
	    return subscribeToIterable(result);
	  } else {
	    var value = isObject(result) ? 'an invalid object' : "'" + result + "'";
	    var msg = "You provided " + value + " where a stream was expected." + ' You can provide an Observable, Promise, Array, or Iterable.';
	    throw new TypeError(msg);
	  }
	};

	/** PURE_IMPORTS_START _InnerSubscriber,_subscribeTo PURE_IMPORTS_END */
	function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination) {
	  if (destination === void 0) {
	    destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	  }

	  if (destination.closed) {
	    return;
	  }

	  return subscribeTo(result)(destination);
	}

	/** PURE_IMPORTS_START tslib,_util_isScheduler,_util_isArray,_OuterSubscriber,_util_subscribeToResult,_fromArray PURE_IMPORTS_END */
	var NONE = {};

	var CombineLatestSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(CombineLatestSubscriber, _super);

	  function CombineLatestSubscriber(destination, resultSelector) {
	    var _this = _super.call(this, destination) || this;

	    _this.resultSelector = resultSelector;
	    _this.active = 0;
	    _this.values = [];
	    _this.observables = [];
	    return _this;
	  }

	  CombineLatestSubscriber.prototype._next = function (observable) {
	    this.values.push(NONE);
	    this.observables.push(observable);
	  };

	  CombineLatestSubscriber.prototype._complete = function () {
	    var observables = this.observables;
	    var len = observables.length;

	    if (len === 0) {
	      this.destination.complete();
	    } else {
	      this.active = len;
	      this.toRespond = len;

	      for (var i = 0; i < len; i++) {
	        var observable = observables[i];
	        this.add(subscribeToResult(this, observable, observable, i));
	      }
	    }
	  };

	  CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
	    if ((this.active -= 1) === 0) {
	      this.destination.complete();
	    }
	  };

	  CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    var values = this.values;
	    var oldVal = values[outerIndex];
	    var toRespond = !this.toRespond ? 0 : oldVal === NONE ? --this.toRespond : this.toRespond;
	    values[outerIndex] = innerValue;

	    if (toRespond === 0) {
	      if (this.resultSelector) {
	        this._tryResultSelector(values);
	      } else {
	        this.destination.next(values.slice());
	      }
	    }
	  };

	  CombineLatestSubscriber.prototype._tryResultSelector = function (values) {
	    var result;

	    try {
	      result = this.resultSelector.apply(this, values);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.destination.next(result);
	  };

	  return CombineLatestSubscriber;
	}(OuterSubscriber);

	/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_Subscription,_util_subscribeToPromise PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator,_util_subscribeToIterable PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable,_util_subscribeToObservable PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_util_isPromise,_util_isArrayLike,_util_isInteropObservable,_util_isIterable,_fromArray,_fromPromise,_fromIterable,_fromObservable,_util_subscribeTo PURE_IMPORTS_END */

	/** PURE_IMPORTS_START tslib,_util_subscribeToResult,_OuterSubscriber,_InnerSubscriber,_map,_observable_from PURE_IMPORTS_END */

	var MergeMapSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(MergeMapSubscriber, _super);

	  function MergeMapSubscriber(destination, project, concurrent) {
	    if (concurrent === void 0) {
	      concurrent = Number.POSITIVE_INFINITY;
	    }

	    var _this = _super.call(this, destination) || this;

	    _this.project = project;
	    _this.concurrent = concurrent;
	    _this.hasCompleted = false;
	    _this.buffer = [];
	    _this.active = 0;
	    _this.index = 0;
	    return _this;
	  }

	  MergeMapSubscriber.prototype._next = function (value) {
	    if (this.active < this.concurrent) {
	      this._tryNext(value);
	    } else {
	      this.buffer.push(value);
	    }
	  };

	  MergeMapSubscriber.prototype._tryNext = function (value) {
	    var result;
	    var index = this.index++;

	    try {
	      result = this.project(value, index);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.active++;

	    this._innerSub(result, value, index);
	  };

	  MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
	    var innerSubscriber = new InnerSubscriber(this, undefined, undefined);
	    var destination = this.destination;
	    destination.add(innerSubscriber);
	    subscribeToResult(this, ish, value, index, innerSubscriber);
	  };

	  MergeMapSubscriber.prototype._complete = function () {
	    this.hasCompleted = true;

	    if (this.active === 0 && this.buffer.length === 0) {
	      this.destination.complete();
	    }

	    this.unsubscribe();
	  };

	  MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.destination.next(innerValue);
	  };

	  MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
	    var buffer = this.buffer;
	    this.remove(innerSub);
	    this.active--;

	    if (buffer.length > 0) {
	      this._next(buffer.shift());
	    } else if (this.active === 0 && this.hasCompleted) {
	      this.destination.complete();
	    }
	  };

	  return MergeMapSubscriber;
	}(OuterSubscriber);

	/** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _util_isScheduler,_of,_from,_operators_concatAll PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

	/** PURE_IMPORTS_START tslib,_Observable,_util_isArray,_empty,_util_subscribeToResult,_OuterSubscriber,_operators_map PURE_IMPORTS_END */

	var ForkJoinSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(ForkJoinSubscriber, _super);

	  function ForkJoinSubscriber(destination, sources) {
	    var _this = _super.call(this, destination) || this;

	    _this.sources = sources;
	    _this.completed = 0;
	    _this.haveValues = 0;
	    var len = sources.length;
	    _this.values = new Array(len);

	    for (var i = 0; i < len; i++) {
	      var source = sources[i];
	      var innerSubscription = subscribeToResult(_this, source, null, i);

	      if (innerSubscription) {
	        _this.add(innerSubscription);
	      }
	    }

	    return _this;
	  }

	  ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.values[outerIndex] = innerValue;

	    if (!innerSub._hasValue) {
	      innerSub._hasValue = true;
	      this.haveValues++;
	    }
	  };

	  ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
	    var _a = this,
	        destination = _a.destination,
	        haveValues = _a.haveValues,
	        values = _a.values;

	    var len = values.length;

	    if (!innerSub._hasValue) {
	      destination.complete();
	      return;
	    }

	    this.completed++;

	    if (this.completed !== len) {
	      return;
	    }

	    if (haveValues === len) {
	      destination.next(values);
	    }

	    destination.complete();
	  };

	  return ForkJoinSubscriber;
	}(OuterSubscriber);

	/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_util_identity,_util_isScheduler PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _defer,_empty PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_util_isScheduler,_operators_mergeAll,_fromArray PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_util_noop PURE_IMPORTS_END */
	var NEVER =
	/*@__PURE__*/
	new Observable(noop);

	/** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */

	/** PURE_IMPORTS_START tslib,_util_isArray,_fromArray,_OuterSubscriber,_util_subscribeToResult PURE_IMPORTS_END */

	var RaceSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(RaceSubscriber, _super);

	  function RaceSubscriber(destination) {
	    var _this = _super.call(this, destination) || this;

	    _this.hasFirst = false;
	    _this.observables = [];
	    _this.subscriptions = [];
	    return _this;
	  }

	  RaceSubscriber.prototype._next = function (observable) {
	    this.observables.push(observable);
	  };

	  RaceSubscriber.prototype._complete = function () {
	    var observables = this.observables;
	    var len = observables.length;

	    if (len === 0) {
	      this.destination.complete();
	    } else {
	      for (var i = 0; i < len && !this.hasFirst; i++) {
	        var observable = observables[i];
	        var subscription = subscribeToResult(this, observable, observable, i);

	        if (this.subscriptions) {
	          this.subscriptions.push(subscription);
	        }

	        this.add(subscription);
	      }

	      this.observables = null;
	    }
	  };

	  RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    if (!this.hasFirst) {
	      this.hasFirst = true;

	      for (var i = 0; i < this.subscriptions.length; i++) {
	        if (i !== outerIndex) {
	          var subscription = this.subscriptions[i];
	          subscription.unsubscribe();
	          this.remove(subscription);
	        }
	      }

	      this.subscriptions = null;
	    }

	    this.destination.next(innerValue);
	  };

	  return RaceSubscriber;
	}(OuterSubscriber);

	/** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */

	/** PURE_IMPORTS_START _Observable,_from,_empty PURE_IMPORTS_END */

	/** PURE_IMPORTS_START tslib,_fromArray,_util_isArray,_Subscriber,_OuterSubscriber,_util_subscribeToResult,_.._internal_symbol_iterator PURE_IMPORTS_END */

	var ZipSubscriber =
	/*@__PURE__*/
	function (_super) {
	  __extends(ZipSubscriber, _super);

	  function ZipSubscriber(destination, resultSelector, values) {
	    if (values === void 0) {
	      values = Object.create(null);
	    }

	    var _this = _super.call(this, destination) || this;

	    _this.iterators = [];
	    _this.active = 0;
	    _this.resultSelector = typeof resultSelector === 'function' ? resultSelector : null;
	    _this.values = values;
	    return _this;
	  }

	  ZipSubscriber.prototype._next = function (value) {
	    var iterators = this.iterators;

	    if (isArray(value)) {
	      iterators.push(new StaticArrayIterator(value));
	    } else if (typeof value[iterator] === 'function') {
	      iterators.push(new StaticIterator(value[iterator]()));
	    } else {
	      iterators.push(new ZipBufferIterator(this.destination, this, value));
	    }
	  };

	  ZipSubscriber.prototype._complete = function () {
	    var iterators = this.iterators;
	    var len = iterators.length;
	    this.unsubscribe();

	    if (len === 0) {
	      this.destination.complete();
	      return;
	    }

	    this.active = len;

	    for (var i = 0; i < len; i++) {
	      var iterator$$1 = iterators[i];

	      if (iterator$$1.stillUnsubscribed) {
	        var destination = this.destination;
	        destination.add(iterator$$1.subscribe(iterator$$1, i));
	      } else {
	        this.active--;
	      }
	    }
	  };

	  ZipSubscriber.prototype.notifyInactive = function () {
	    this.active--;

	    if (this.active === 0) {
	      this.destination.complete();
	    }
	  };

	  ZipSubscriber.prototype.checkIterators = function () {
	    var iterators = this.iterators;
	    var len = iterators.length;
	    var destination = this.destination;

	    for (var i = 0; i < len; i++) {
	      var iterator$$1 = iterators[i];

	      if (typeof iterator$$1.hasValue === 'function' && !iterator$$1.hasValue()) {
	        return;
	      }
	    }

	    var shouldComplete = false;
	    var args = [];

	    for (var i = 0; i < len; i++) {
	      var iterator$$1 = iterators[i];
	      var result = iterator$$1.next();

	      if (iterator$$1.hasCompleted()) {
	        shouldComplete = true;
	      }

	      if (result.done) {
	        destination.complete();
	        return;
	      }

	      args.push(result.value);
	    }

	    if (this.resultSelector) {
	      this._tryresultSelector(args);
	    } else {
	      destination.next(args);
	    }

	    if (shouldComplete) {
	      destination.complete();
	    }
	  };

	  ZipSubscriber.prototype._tryresultSelector = function (args) {
	    var result;

	    try {
	      result = this.resultSelector.apply(this, args);
	    } catch (err) {
	      this.destination.error(err);
	      return;
	    }

	    this.destination.next(result);
	  };

	  return ZipSubscriber;
	}(Subscriber);

	var StaticIterator =
	/*@__PURE__*/
	function () {
	  function StaticIterator(iterator$$1) {
	    this.iterator = iterator$$1;
	    this.nextResult = iterator$$1.next();
	  }

	  StaticIterator.prototype.hasValue = function () {
	    return true;
	  };

	  StaticIterator.prototype.next = function () {
	    var result = this.nextResult;
	    this.nextResult = this.iterator.next();
	    return result;
	  };

	  StaticIterator.prototype.hasCompleted = function () {
	    var nextResult = this.nextResult;
	    return nextResult && nextResult.done;
	  };

	  return StaticIterator;
	}();

	var StaticArrayIterator =
	/*@__PURE__*/
	function () {
	  function StaticArrayIterator(array) {
	    this.array = array;
	    this.index = 0;
	    this.length = 0;
	    this.length = array.length;
	  }

	  StaticArrayIterator.prototype[iterator] = function () {
	    return this;
	  };

	  StaticArrayIterator.prototype.next = function (value) {
	    var i = this.index++;
	    var array = this.array;
	    return i < this.length ? {
	      value: array[i],
	      done: false
	    } : {
	      value: null,
	      done: true
	    };
	  };

	  StaticArrayIterator.prototype.hasValue = function () {
	    return this.array.length > this.index;
	  };

	  StaticArrayIterator.prototype.hasCompleted = function () {
	    return this.array.length === this.index;
	  };

	  return StaticArrayIterator;
	}();

	var ZipBufferIterator =
	/*@__PURE__*/
	function (_super) {
	  __extends(ZipBufferIterator, _super);

	  function ZipBufferIterator(destination, parent, observable) {
	    var _this = _super.call(this, destination) || this;

	    _this.parent = parent;
	    _this.observable = observable;
	    _this.stillUnsubscribed = true;
	    _this.buffer = [];
	    _this.isComplete = false;
	    return _this;
	  }

	  ZipBufferIterator.prototype[iterator] = function () {
	    return this;
	  };

	  ZipBufferIterator.prototype.next = function () {
	    var buffer = this.buffer;

	    if (buffer.length === 0 && this.isComplete) {
	      return {
	        value: null,
	        done: true
	      };
	    } else {
	      return {
	        value: buffer.shift(),
	        done: false
	      };
	    }
	  };

	  ZipBufferIterator.prototype.hasValue = function () {
	    return this.buffer.length > 0;
	  };

	  ZipBufferIterator.prototype.hasCompleted = function () {
	    return this.buffer.length === 0 && this.isComplete;
	  };

	  ZipBufferIterator.prototype.notifyComplete = function () {
	    if (this.buffer.length > 0) {
	      this.isComplete = true;
	      this.parent.notifyInactive();
	    } else {
	      this.destination.complete();
	    }
	  };

	  ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	    this.buffer.push(innerValue);
	    this.parent.checkIterators();
	  };

	  ZipBufferIterator.prototype.subscribe = function (value, index) {
	    return subscribeToResult(this, this.observable, this, index);
	  };

	  return ZipBufferIterator;
	}(OuterSubscriber);

	/** PURE_IMPORTS_START  PURE_IMPORTS_END */

	var _tmpl$2 = void 0;

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	// Used for setting prototype methods that IE8 chokes on.
	var DELETE = 'delete'; // Constants describing the size of trie nodes.

	var SHIFT = 5; // Resulted in best performance after ______?

	var SIZE = 1 << SHIFT;
	var MASK = SIZE - 1; // A consistent shared value representing "not set" which equals nothing other
	// than itself, and nothing that could be provided externally.

	var NOT_SET = {}; // Boolean references, Rough equivalent of `bool &`.

	function MakeRef() {
	  return {
	    value: false
	  };
	}

	function SetRef(ref) {
	  if (ref) {
	    ref.value = true;
	  }
	} // A function which returns a value representing an "owner" for transient writes
	// to tries. The return value will only ever equal itself, and will not equal
	// the return of any subsequent call of this function.


	function OwnerID() {}

	function ensureSize(iter) {
	  if (iter.size === undefined) {
	    iter.size = iter.__iterate(returnTrue);
	  }

	  return iter.size;
	}

	function wrapIndex(iter, index) {
	  // This implements "is array index" which the ECMAString spec defines as:
	  //
	  //     A String property name P is an array index if and only if
	  //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	  //     to 2^32−1.
	  //
	  // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	  if (typeof index !== 'number') {
	    var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32

	    if ('' + uint32Index !== index || uint32Index === 4294967295) {
	      return NaN;
	    }

	    index = uint32Index;
	  }

	  return index < 0 ? ensureSize(iter) + index : index;
	}

	function returnTrue() {
	  return true;
	}

	function wholeSlice(begin, end, size) {
	  return (begin === 0 && !isNeg(begin) || size !== undefined && begin <= -size) && (end === undefined || size !== undefined && end >= size);
	}

	function resolveBegin(begin, size) {
	  return resolveIndex(begin, size, 0);
	}

	function resolveEnd(end, size) {
	  return resolveIndex(end, size, size);
	}

	function resolveIndex(index, size, defaultIndex) {
	  // Sanitize indices using this shorthand for ToInt32(argument)
	  // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	  return index === undefined ? defaultIndex : isNeg(index) ? size === Infinity ? size : Math.max(0, size + index) | 0 : size === undefined || size === index ? index : Math.min(size, index) | 0;
	}

	function isNeg(value) {
	  // Account for -0 which is negative, but not less than 0.
	  return value < 0 || value === 0 && 1 / value === -Infinity;
	} // Note: value is unchanged to not break immutable-devtools.


	var IS_COLLECTION_SYMBOL = '@@__IMMUTABLE_ITERABLE__@@';

	function isCollection(maybeCollection) {
	  return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
	}

	var IS_KEYED_SYMBOL = '@@__IMMUTABLE_KEYED__@@';

	function isKeyed(maybeKeyed) {
	  return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
	}

	var IS_INDEXED_SYMBOL = '@@__IMMUTABLE_INDEXED__@@';

	function isIndexed(maybeIndexed) {
	  return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
	}

	function isAssociative(maybeAssociative) {
	  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	}

	var Collection = function Collection(value) {
	  return isCollection(value) ? value : Seq(value);
	};

	var KeyedCollection =
	/*@__PURE__*/
	function (Collection) {
	  function KeyedCollection(value) {
	    return isKeyed(value) ? value : KeyedSeq(value);
	  }

	  if (Collection) KeyedCollection.__proto__ = Collection;
	  KeyedCollection.prototype = Object.create(Collection && Collection.prototype);
	  KeyedCollection.prototype.constructor = KeyedCollection;
	  return KeyedCollection;
	}(Collection);

	var IndexedCollection =
	/*@__PURE__*/
	function (Collection) {
	  function IndexedCollection(value) {
	    return isIndexed(value) ? value : IndexedSeq(value);
	  }

	  if (Collection) IndexedCollection.__proto__ = Collection;
	  IndexedCollection.prototype = Object.create(Collection && Collection.prototype);
	  IndexedCollection.prototype.constructor = IndexedCollection;
	  return IndexedCollection;
	}(Collection);

	var SetCollection =
	/*@__PURE__*/
	function (Collection) {
	  function SetCollection(value) {
	    return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
	  }

	  if (Collection) SetCollection.__proto__ = Collection;
	  SetCollection.prototype = Object.create(Collection && Collection.prototype);
	  SetCollection.prototype.constructor = SetCollection;
	  return SetCollection;
	}(Collection);

	Collection.Keyed = KeyedCollection;
	Collection.Indexed = IndexedCollection;
	Collection.Set = SetCollection;
	var IS_SEQ_SYMBOL = '@@__IMMUTABLE_SEQ__@@';

	function isSeq(maybeSeq) {
	  return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
	}

	var IS_RECORD_SYMBOL = '@@__IMMUTABLE_RECORD__@@';

	function isRecord(maybeRecord) {
	  return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
	}

	function isImmutable(maybeImmutable) {
	  return isCollection(maybeImmutable) || isRecord(maybeImmutable);
	}

	var IS_ORDERED_SYMBOL = '@@__IMMUTABLE_ORDERED__@@';

	function isOrdered(maybeOrdered) {
	  return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
	}

	var ITERATE_KEYS = 0;
	var ITERATE_VALUES = 1;
	var ITERATE_ENTRIES = 2;
	var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

	var Iterator = function Iterator(next) {
	  this.next = next;
	};

	Iterator.prototype.toString = function toString() {
	  return '[Iterator]';
	};

	Iterator.KEYS = ITERATE_KEYS;
	Iterator.VALUES = ITERATE_VALUES;
	Iterator.ENTRIES = ITERATE_ENTRIES;

	Iterator.prototype.inspect = Iterator.prototype.toSource = function () {
	  return this.toString();
	};

	Iterator.prototype[ITERATOR_SYMBOL] = function () {
	  return this;
	};

	function iteratorValue(type, k, v, iteratorResult) {
	  var value = type === 0 ? k : type === 1 ? v : [k, v];
	  iteratorResult ? iteratorResult.value = value : iteratorResult = {
	    value: value,
	    done: false
	  };
	  return iteratorResult;
	}

	function iteratorDone() {
	  return {
	    value: undefined,
	    done: true
	  };
	}

	function hasIterator(maybeIterable) {
	  return !!getIteratorFn(maybeIterable);
	}

	function isIterator(maybeIterator) {
	  return maybeIterator && typeof maybeIterator.next === 'function';
	}

	function getIterator(iterable) {
	  var iteratorFn = getIteratorFn(iterable);
	  return iteratorFn && iteratorFn.call(iterable);
	}

	function getIteratorFn(iterable) {
	  var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);

	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function isArrayLike$1(value) {
	  if (Array.isArray(value) || typeof value === 'string') {
	    return true;
	  }

	  return value && typeof value === 'object' && Number.isInteger(value.length) && value.length >= 0 && (value.length === 0 ? // Only {length: 0} is considered Array-like.
	  Object.keys(value).length === 1 : // An object is only Array-like if it has a property where the last value
	  // in the array-like may be found (which could be undefined).
	  value.hasOwnProperty(value.length - 1));
	}

	var Seq =
	/*@__PURE__*/
	function (Collection$$1) {
	  function Seq(value) {
	    return value === null || value === undefined ? emptySequence() : isImmutable(value) ? value.toSeq() : seqFromValue(value);
	  }

	  if (Collection$$1) Seq.__proto__ = Collection$$1;
	  Seq.prototype = Object.create(Collection$$1 && Collection$$1.prototype);
	  Seq.prototype.constructor = Seq;

	  Seq.prototype.toSeq = function toSeq() {
	    return this;
	  };

	  Seq.prototype.toString = function toString() {
	    return this.__toString('Seq {', '}');
	  };

	  Seq.prototype.cacheResult = function cacheResult() {
	    if (!this._cache && this.__iterateUncached) {
	      this._cache = this.entrySeq().toArray();
	      this.size = this._cache.length;
	    }

	    return this;
	  }; // abstract __iterateUncached(fn, reverse)


	  Seq.prototype.__iterate = function __iterate(fn, reverse) {
	    var cache = this._cache;

	    if (cache) {
	      var size = cache.length;
	      var i = 0;

	      while (i !== size) {
	        var entry = cache[reverse ? size - ++i : i++];

	        if (fn(entry[1], entry[0], this) === false) {
	          break;
	        }
	      }

	      return i;
	    }

	    return this.__iterateUncached(fn, reverse);
	  }; // abstract __iteratorUncached(type, reverse)


	  Seq.prototype.__iterator = function __iterator(type, reverse) {
	    var cache = this._cache;

	    if (cache) {
	      var size = cache.length;
	      var i = 0;
	      return new Iterator(function () {
	        if (i === size) {
	          return iteratorDone();
	        }

	        var entry = cache[reverse ? size - ++i : i++];
	        return iteratorValue(type, entry[0], entry[1]);
	      });
	    }

	    return this.__iteratorUncached(type, reverse);
	  };

	  return Seq;
	}(Collection);

	var KeyedSeq =
	/*@__PURE__*/
	function (Seq) {
	  function KeyedSeq(value) {
	    return value === null || value === undefined ? emptySequence().toKeyedSeq() : isCollection(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
	  }

	  if (Seq) KeyedSeq.__proto__ = Seq;
	  KeyedSeq.prototype = Object.create(Seq && Seq.prototype);
	  KeyedSeq.prototype.constructor = KeyedSeq;

	  KeyedSeq.prototype.toKeyedSeq = function toKeyedSeq() {
	    return this;
	  };

	  return KeyedSeq;
	}(Seq);

	var IndexedSeq =
	/*@__PURE__*/
	function (Seq) {
	  function IndexedSeq(value) {
	    return value === null || value === undefined ? emptySequence() : isCollection(value) ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq() : isRecord(value) ? value.toSeq().entrySeq() : indexedSeqFromValue(value);
	  }

	  if (Seq) IndexedSeq.__proto__ = Seq;
	  IndexedSeq.prototype = Object.create(Seq && Seq.prototype);
	  IndexedSeq.prototype.constructor = IndexedSeq;

	  IndexedSeq.of = function of()
	  /*...values*/
	  {
	    return IndexedSeq(arguments);
	  };

	  IndexedSeq.prototype.toIndexedSeq = function toIndexedSeq() {
	    return this;
	  };

	  IndexedSeq.prototype.toString = function toString() {
	    return this.__toString('Seq [', ']');
	  };

	  return IndexedSeq;
	}(Seq);

	var SetSeq =
	/*@__PURE__*/
	function (Seq) {
	  function SetSeq(value) {
	    return (isCollection(value) && !isAssociative(value) ? value : IndexedSeq(value)).toSetSeq();
	  }

	  if (Seq) SetSeq.__proto__ = Seq;
	  SetSeq.prototype = Object.create(Seq && Seq.prototype);
	  SetSeq.prototype.constructor = SetSeq;

	  SetSeq.of = function of()
	  /*...values*/
	  {
	    return SetSeq(arguments);
	  };

	  SetSeq.prototype.toSetSeq = function toSetSeq() {
	    return this;
	  };

	  return SetSeq;
	}(Seq);

	Seq.isSeq = isSeq;
	Seq.Keyed = KeyedSeq;
	Seq.Set = SetSeq;
	Seq.Indexed = IndexedSeq;
	Seq.prototype[IS_SEQ_SYMBOL] = true; // #pragma Root Sequences

	var ArraySeq =
	/*@__PURE__*/
	function (IndexedSeq) {
	  function ArraySeq(array) {
	    this._array = array;
	    this.size = array.length;
	  }

	  if (IndexedSeq) ArraySeq.__proto__ = IndexedSeq;
	  ArraySeq.prototype = Object.create(IndexedSeq && IndexedSeq.prototype);
	  ArraySeq.prototype.constructor = ArraySeq;

	  ArraySeq.prototype.get = function get(index, notSetValue) {
	    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	  };

	  ArraySeq.prototype.__iterate = function __iterate(fn, reverse) {
	    var array = this._array;
	    var size = array.length;
	    var i = 0;

	    while (i !== size) {
	      var ii = reverse ? size - ++i : i++;

	      if (fn(array[ii], ii, this) === false) {
	        break;
	      }
	    }

	    return i;
	  };

	  ArraySeq.prototype.__iterator = function __iterator(type, reverse) {
	    var array = this._array;
	    var size = array.length;
	    var i = 0;
	    return new Iterator(function () {
	      if (i === size) {
	        return iteratorDone();
	      }

	      var ii = reverse ? size - ++i : i++;
	      return iteratorValue(type, ii, array[ii]);
	    });
	  };

	  return ArraySeq;
	}(IndexedSeq);

	var ObjectSeq =
	/*@__PURE__*/
	function (KeyedSeq) {
	  function ObjectSeq(object) {
	    var keys = Object.keys(object);
	    this._object = object;
	    this._keys = keys;
	    this.size = keys.length;
	  }

	  if (KeyedSeq) ObjectSeq.__proto__ = KeyedSeq;
	  ObjectSeq.prototype = Object.create(KeyedSeq && KeyedSeq.prototype);
	  ObjectSeq.prototype.constructor = ObjectSeq;

	  ObjectSeq.prototype.get = function get(key, notSetValue) {
	    if (notSetValue !== undefined && !this.has(key)) {
	      return notSetValue;
	    }

	    return this._object[key];
	  };

	  ObjectSeq.prototype.has = function has(key) {
	    return hasOwnProperty.call(this._object, key);
	  };

	  ObjectSeq.prototype.__iterate = function __iterate(fn, reverse) {
	    var object = this._object;
	    var keys = this._keys;
	    var size = keys.length;
	    var i = 0;

	    while (i !== size) {
	      var key = keys[reverse ? size - ++i : i++];

	      if (fn(object[key], key, this) === false) {
	        break;
	      }
	    }

	    return i;
	  };

	  ObjectSeq.prototype.__iterator = function __iterator(type, reverse) {
	    var object = this._object;
	    var keys = this._keys;
	    var size = keys.length;
	    var i = 0;
	    return new Iterator(function () {
	      if (i === size) {
	        return iteratorDone();
	      }

	      var key = keys[reverse ? size - ++i : i++];
	      return iteratorValue(type, key, object[key]);
	    });
	  };

	  return ObjectSeq;
	}(KeyedSeq);

	ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;

	var CollectionSeq =
	/*@__PURE__*/
	function (IndexedSeq) {
	  function CollectionSeq(collection) {
	    this._collection = collection;
	    this.size = collection.length || collection.size;
	  }

	  if (IndexedSeq) CollectionSeq.__proto__ = IndexedSeq;
	  CollectionSeq.prototype = Object.create(IndexedSeq && IndexedSeq.prototype);
	  CollectionSeq.prototype.constructor = CollectionSeq;

	  CollectionSeq.prototype.__iterateUncached = function __iterateUncached(fn, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }

	    var collection = this._collection;
	    var iterator = getIterator(collection);
	    var iterations = 0;

	    if (isIterator(iterator)) {
	      var step;

	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	    }

	    return iterations;
	  };

	  CollectionSeq.prototype.__iteratorUncached = function __iteratorUncached(type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }

	    var collection = this._collection;
	    var iterator = getIterator(collection);

	    if (!isIterator(iterator)) {
	      return new Iterator(iteratorDone);
	    }

	    var iterations = 0;
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, iterations++, step.value);
	    });
	  };

	  return CollectionSeq;
	}(IndexedSeq); // # pragma Helper functions


	var EMPTY_SEQ;

	function emptySequence() {
	  return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	}

	function keyedSeqFromValue(value) {
	  var seq = Array.isArray(value) ? new ArraySeq(value) : hasIterator(value) ? new CollectionSeq(value) : undefined;

	  if (seq) {
	    return seq.fromEntrySeq();
	  }

	  if (typeof value === 'object') {
	    return new ObjectSeq(value);
	  }

	  throw new TypeError('Expected Array or collection object of [k, v] entries, or keyed object: ' + value);
	}

	function indexedSeqFromValue(value) {
	  var seq = maybeIndexedSeqFromValue(value);

	  if (seq) {
	    return seq;
	  }

	  throw new TypeError('Expected Array or collection object of values: ' + value);
	}

	function seqFromValue(value) {
	  var seq = maybeIndexedSeqFromValue(value);

	  if (seq) {
	    return seq;
	  }

	  if (typeof value === 'object') {
	    return new ObjectSeq(value);
	  }

	  throw new TypeError('Expected Array or collection object of values, or keyed object: ' + value);
	}

	function maybeIndexedSeqFromValue(value) {
	  return isArrayLike$1(value) ? new ArraySeq(value) : hasIterator(value) ? new CollectionSeq(value) : undefined;
	}

	var IS_MAP_SYMBOL = '@@__IMMUTABLE_MAP__@@';

	function isMap(maybeMap) {
	  return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
	}

	function isOrderedMap(maybeOrderedMap) {
	  return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	}

	function isValueObject(maybeValue) {
	  return Boolean(maybeValue && typeof maybeValue.equals === 'function' && typeof maybeValue.hashCode === 'function');
	}
	/**
	 * An extension of the "same-value" algorithm as [described for use by ES6 Map
	 * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	 *
	 * NaN is considered the same as NaN, however -0 and 0 are considered the same
	 * value, which is different from the algorithm described by
	 * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	 *
	 * This is extended further to allow Objects to describe the values they
	 * represent, by way of `valueOf` or `equals` (and `hashCode`).
	 *
	 * Note: because of this extension, the key equality of Immutable.Map and the
	 * value equality of Immutable.Set will differ from ES6 Map and Set.
	 *
	 * ### Defining custom values
	 *
	 * The easiest way to describe the value an object represents is by implementing
	 * `valueOf`. For example, `Date` represents a value by returning a unix
	 * timestamp for `valueOf`:
	 *
	 *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	 *     var date2 = new Date(1234567890000);
	 *     date1.valueOf(); // 1234567890000
	 *     assert( date1 !== date2 );
	 *     assert( Immutable.is( date1, date2 ) );
	 *
	 * Note: overriding `valueOf` may have other implications if you use this object
	 * where JavaScript expects a primitive, such as implicit string coercion.
	 *
	 * For more complex types, especially collections, implementing `valueOf` may
	 * not be performant. An alternative is to implement `equals` and `hashCode`.
	 *
	 * `equals` takes another object, presumably of similar type, and returns true
	 * if it is equal. Equality is symmetrical, so the same result should be
	 * returned if this and the argument are flipped.
	 *
	 *     assert( a.equals(b) === b.equals(a) );
	 *
	 * `hashCode` returns a 32bit integer number representing the object which will
	 * be used to determine how to store the value object in a Map or Set. You must
	 * provide both or neither methods, one must not exist without the other.
	 *
	 * Also, an important relationship between these methods must be upheld: if two
	 * values are equal, they *must* return the same hashCode. If the values are not
	 * equal, they might have the same hashCode; this is called a hash collision,
	 * and while undesirable for performance reasons, it is acceptable.
	 *
	 *     if (a.equals(b)) {
	 *       assert( a.hashCode() === b.hashCode() );
	 *     }
	 *
	 * All Immutable collections are Value Objects: they implement `equals()`
	 * and `hashCode()`.
	 */


	function is(valueA, valueB) {
	  if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
	    return true;
	  }

	  if (!valueA || !valueB) {
	    return false;
	  }

	  if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function') {
	    valueA = valueA.valueOf();
	    valueB = valueB.valueOf();

	    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
	      return true;
	    }

	    if (!valueA || !valueB) {
	      return false;
	    }
	  }

	  return !!(isValueObject(valueA) && isValueObject(valueB) && valueA.equals(valueB));
	}

	var imul = typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ? Math.imul : function imul(a, b) {
	  a |= 0; // int

	  b |= 0; // int

	  var c = a & 0xffff;
	  var d = b & 0xffff; // Shift by 0 fixes the sign on the high part.

	  return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0; // int
	}; // v8 has an optimization for storing 31-bit signed numbers.
	// Values which have either 00 or 11 as the high order bits qualify.
	// This function drops the highest order bit in a signed number, maintaining
	// the sign bit.

	function smi(i32) {
	  return i32 >>> 1 & 0x40000000 | i32 & 0xbfffffff;
	}

	var defaultValueOf = Object.prototype.valueOf;

	function hash(o) {
	  switch (typeof o) {
	    case 'boolean':
	      // The hash values for built-in constants are a 1 value for each 5-byte
	      // shift region expect for the first, which encodes the value. This
	      // reduces the odds of a hash collision for these common values.
	      return o ? 0x42108421 : 0x42108420;

	    case 'number':
	      return hashNumber(o);

	    case 'string':
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);

	    case 'object':
	    case 'function':
	      if (o === null) {
	        return 0x42108422;
	      }

	      if (typeof o.hashCode === 'function') {
	        // Drop any high bits from accidentally long hash codes.
	        return smi(o.hashCode(o));
	      }

	      if (o.valueOf !== defaultValueOf && typeof o.valueOf === 'function') {
	        o = o.valueOf(o);
	      }

	      return hashJSObj(o);

	    case 'undefined':
	      return 0x42108423;

	    default:
	      if (typeof o.toString === 'function') {
	        return hashString(o.toString());
	      }

	      throw new Error('Value type ' + typeof o + ' cannot be hashed.');
	  }
	} // Compress arbitrarily large numbers into smi hashes.


	function hashNumber(n) {
	  if (n !== n || n === Infinity) {
	    return 0;
	  }

	  var hash = n | 0;

	  if (hash !== n) {
	    hash ^= n * 0xffffffff;
	  }

	  while (n > 0xffffffff) {
	    n /= 0xffffffff;
	    hash ^= n;
	  }

	  return smi(hash);
	}

	function cachedHashString(string) {
	  var hashed = stringHashCache[string];

	  if (hashed === undefined) {
	    hashed = hashString(string);

	    if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	      STRING_HASH_CACHE_SIZE = 0;
	      stringHashCache = {};
	    }

	    STRING_HASH_CACHE_SIZE++;
	    stringHashCache[string] = hashed;
	  }

	  return hashed;
	} // http://jsperf.com/hashing-strings


	function hashString(string) {
	  // This is the hash from JVM
	  // The hash code for a string is computed as
	  // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	  // where s[i] is the ith character of the string and n is the length of
	  // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	  // (exclusive) by dropping high bits.
	  var hashed = 0;

	  for (var ii = 0; ii < string.length; ii++) {
	    hashed = 31 * hashed + string.charCodeAt(ii) | 0;
	  }

	  return smi(hashed);
	}

	function hashJSObj(obj) {
	  var hashed;

	  if (usingWeakMap) {
	    hashed = weakMap.get(obj);

	    if (hashed !== undefined) {
	      return hashed;
	    }
	  }

	  hashed = obj[UID_HASH_KEY];

	  if (hashed !== undefined) {
	    return hashed;
	  }

	  if (!canDefineProperty) {
	    hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];

	    if (hashed !== undefined) {
	      return hashed;
	    }

	    hashed = getIENodeHash(obj);

	    if (hashed !== undefined) {
	      return hashed;
	    }
	  }

	  hashed = ++objHashUID;

	  if (objHashUID & 0x40000000) {
	    objHashUID = 0;
	  }

	  if (usingWeakMap) {
	    weakMap.set(obj, hashed);
	  } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	    throw new Error('Non-extensible objects are not allowed as keys.');
	  } else if (canDefineProperty) {
	    Object.defineProperty(obj, UID_HASH_KEY, {
	      enumerable: false,
	      configurable: false,
	      writable: false,
	      value: hashed
	    });
	  } else if (obj.propertyIsEnumerable !== undefined && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	    // Since we can't define a non-enumerable property on the object
	    // we'll hijack one of the less-used non-enumerable properties to
	    // save our hash on it. Since this is a function it will not show up in
	    // `JSON.stringify` which is what we want.
	    obj.propertyIsEnumerable = function () {
	      return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	    };

	    obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
	  } else if (obj.nodeType !== undefined) {
	    // At this point we couldn't get the IE `uniqueID` to use as a hash
	    // and we couldn't use a non-enumerable property to exploit the
	    // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	    // itself.
	    obj[UID_HASH_KEY] = hashed;
	  } else {
	    throw new Error('Unable to set a non-enumerable property on object.');
	  }

	  return hashed;
	} // Get references to ES5 object methods.


	var isExtensible = Object.isExtensible; // True if Object.defineProperty works as expected. IE8 fails this test.

	var canDefineProperty = function () {
	  try {
	    Object.defineProperty({}, '@', {});
	    return true;
	  } catch (e) {
	    return false;
	  }
	}(); // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	// and avoid memory leaks from the IE cloneNode bug.


	function getIENodeHash(node) {
	  if (node && node.nodeType > 0) {
	    switch (node.nodeType) {
	      case 1:
	        // Element
	        return node.uniqueID;

	      case 9:
	        // Document
	        return node.documentElement && node.documentElement.uniqueID;
	    }
	  }
	} // If possible, use a WeakMap.


	var usingWeakMap = typeof WeakMap === 'function';
	var weakMap;

	if (usingWeakMap) {
	  weakMap = new WeakMap();
	}

	var objHashUID = 0;
	var UID_HASH_KEY = '__immutablehash__';

	if (typeof Symbol === 'function') {
	  UID_HASH_KEY = Symbol(UID_HASH_KEY);
	}

	var STRING_HASH_CACHE_MIN_STRLEN = 16;
	var STRING_HASH_CACHE_MAX_SIZE = 255;
	var STRING_HASH_CACHE_SIZE = 0;
	var stringHashCache = {};

	var ToKeyedSequence =
	/*@__PURE__*/
	function (KeyedSeq$$1) {
	  function ToKeyedSequence(indexed, useKeys) {
	    this._iter = indexed;
	    this._useKeys = useKeys;
	    this.size = indexed.size;
	  }

	  if (KeyedSeq$$1) ToKeyedSequence.__proto__ = KeyedSeq$$1;
	  ToKeyedSequence.prototype = Object.create(KeyedSeq$$1 && KeyedSeq$$1.prototype);
	  ToKeyedSequence.prototype.constructor = ToKeyedSequence;

	  ToKeyedSequence.prototype.get = function get(key, notSetValue) {
	    return this._iter.get(key, notSetValue);
	  };

	  ToKeyedSequence.prototype.has = function has(key) {
	    return this._iter.has(key);
	  };

	  ToKeyedSequence.prototype.valueSeq = function valueSeq() {
	    return this._iter.valueSeq();
	  };

	  ToKeyedSequence.prototype.reverse = function reverse() {
	    var this$1 = this;
	    var reversedSequence = reverseFactory(this, true);

	    if (!this._useKeys) {
	      reversedSequence.valueSeq = function () {
	        return this$1._iter.toSeq().reverse();
	      };
	    }

	    return reversedSequence;
	  };

	  ToKeyedSequence.prototype.map = function map(mapper, context) {
	    var this$1 = this;
	    var mappedSequence = mapFactory(this, mapper, context);

	    if (!this._useKeys) {
	      mappedSequence.valueSeq = function () {
	        return this$1._iter.toSeq().map(mapper, context);
	      };
	    }

	    return mappedSequence;
	  };

	  ToKeyedSequence.prototype.__iterate = function __iterate(fn, reverse) {
	    var this$1 = this;
	    return this._iter.__iterate(function (v, k) {
	      return fn(v, k, this$1);
	    }, reverse);
	  };

	  ToKeyedSequence.prototype.__iterator = function __iterator(type, reverse) {
	    return this._iter.__iterator(type, reverse);
	  };

	  return ToKeyedSequence;
	}(KeyedSeq);

	ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;

	var ToIndexedSequence =
	/*@__PURE__*/
	function (IndexedSeq$$1) {
	  function ToIndexedSequence(iter) {
	    this._iter = iter;
	    this.size = iter.size;
	  }

	  if (IndexedSeq$$1) ToIndexedSequence.__proto__ = IndexedSeq$$1;
	  ToIndexedSequence.prototype = Object.create(IndexedSeq$$1 && IndexedSeq$$1.prototype);
	  ToIndexedSequence.prototype.constructor = ToIndexedSequence;

	  ToIndexedSequence.prototype.includes = function includes(value) {
	    return this._iter.includes(value);
	  };

	  ToIndexedSequence.prototype.__iterate = function __iterate(fn, reverse) {
	    var this$1 = this;
	    var i = 0;
	    reverse && ensureSize(this);
	    return this._iter.__iterate(function (v) {
	      return fn(v, reverse ? this$1.size - ++i : i++, this$1);
	    }, reverse);
	  };

	  ToIndexedSequence.prototype.__iterator = function __iterator(type, reverse) {
	    var this$1 = this;

	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);

	    var i = 0;
	    reverse && ensureSize(this);
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, reverse ? this$1.size - ++i : i++, step.value, step);
	    });
	  };

	  return ToIndexedSequence;
	}(IndexedSeq);

	var ToSetSequence =
	/*@__PURE__*/
	function (SetSeq$$1) {
	  function ToSetSequence(iter) {
	    this._iter = iter;
	    this.size = iter.size;
	  }

	  if (SetSeq$$1) ToSetSequence.__proto__ = SetSeq$$1;
	  ToSetSequence.prototype = Object.create(SetSeq$$1 && SetSeq$$1.prototype);
	  ToSetSequence.prototype.constructor = ToSetSequence;

	  ToSetSequence.prototype.has = function has(key) {
	    return this._iter.includes(key);
	  };

	  ToSetSequence.prototype.__iterate = function __iterate(fn, reverse) {
	    var this$1 = this;
	    return this._iter.__iterate(function (v) {
	      return fn(v, v, this$1);
	    }, reverse);
	  };

	  ToSetSequence.prototype.__iterator = function __iterator(type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);

	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, step.value, step.value, step);
	    });
	  };

	  return ToSetSequence;
	}(SetSeq);

	var FromEntriesSequence =
	/*@__PURE__*/
	function (KeyedSeq$$1) {
	  function FromEntriesSequence(entries) {
	    this._iter = entries;
	    this.size = entries.size;
	  }

	  if (KeyedSeq$$1) FromEntriesSequence.__proto__ = KeyedSeq$$1;
	  FromEntriesSequence.prototype = Object.create(KeyedSeq$$1 && KeyedSeq$$1.prototype);
	  FromEntriesSequence.prototype.constructor = FromEntriesSequence;

	  FromEntriesSequence.prototype.entrySeq = function entrySeq() {
	    return this._iter.toSeq();
	  };

	  FromEntriesSequence.prototype.__iterate = function __iterate(fn, reverse) {
	    var this$1 = this;
	    return this._iter.__iterate(function (entry) {
	      // Check if entry exists first so array access doesn't throw for holes
	      // in the parent iteration.
	      if (entry) {
	        validateEntry(entry);
	        var indexedCollection = isCollection(entry);
	        return fn(indexedCollection ? entry.get(1) : entry[1], indexedCollection ? entry.get(0) : entry[0], this$1);
	      }
	    }, reverse);
	  };

	  FromEntriesSequence.prototype.__iterator = function __iterator(type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);

	    return new Iterator(function () {
	      while (true) {
	        var step = iterator.next();

	        if (step.done) {
	          return step;
	        }

	        var entry = step.value; // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.

	        if (entry) {
	          validateEntry(entry);
	          var indexedCollection = isCollection(entry);
	          return iteratorValue(type, indexedCollection ? entry.get(0) : entry[0], indexedCollection ? entry.get(1) : entry[1], step);
	        }
	      }
	    });
	  };

	  return FromEntriesSequence;
	}(KeyedSeq);

	ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

	function flipFactory(collection) {
	  var flipSequence = makeSequence(collection);
	  flipSequence._iter = collection;
	  flipSequence.size = collection.size;

	  flipSequence.flip = function () {
	    return collection;
	  };

	  flipSequence.reverse = function () {
	    var reversedSequence = collection.reverse.apply(this); // super.reverse()

	    reversedSequence.flip = function () {
	      return collection.reverse();
	    };

	    return reversedSequence;
	  };

	  flipSequence.has = function (key) {
	    return collection.includes(key);
	  };

	  flipSequence.includes = function (key) {
	    return collection.has(key);
	  };

	  flipSequence.cacheResult = cacheResultThrough;

	  flipSequence.__iterateUncached = function (fn, reverse) {
	    var this$1 = this;
	    return collection.__iterate(function (v, k) {
	      return fn(k, v, this$1) !== false;
	    }, reverse);
	  };

	  flipSequence.__iteratorUncached = function (type, reverse) {
	    if (type === ITERATE_ENTRIES) {
	      var iterator = collection.__iterator(type, reverse);

	      return new Iterator(function () {
	        var step = iterator.next();

	        if (!step.done) {
	          var k = step.value[0];
	          step.value[0] = step.value[1];
	          step.value[1] = k;
	        }

	        return step;
	      });
	    }

	    return collection.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse);
	  };

	  return flipSequence;
	}

	function mapFactory(collection, mapper, context) {
	  var mappedSequence = makeSequence(collection);
	  mappedSequence.size = collection.size;

	  mappedSequence.has = function (key) {
	    return collection.has(key);
	  };

	  mappedSequence.get = function (key, notSetValue) {
	    var v = collection.get(key, NOT_SET);
	    return v === NOT_SET ? notSetValue : mapper.call(context, v, key, collection);
	  };

	  mappedSequence.__iterateUncached = function (fn, reverse) {
	    var this$1 = this;
	    return collection.__iterate(function (v, k, c) {
	      return fn(mapper.call(context, v, k, c), k, this$1) !== false;
	    }, reverse);
	  };

	  mappedSequence.__iteratorUncached = function (type, reverse) {
	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);

	    return new Iterator(function () {
	      var step = iterator.next();

	      if (step.done) {
	        return step;
	      }

	      var entry = step.value;
	      var key = entry[0];
	      return iteratorValue(type, key, mapper.call(context, entry[1], key, collection), step);
	    });
	  };

	  return mappedSequence;
	}

	function reverseFactory(collection, useKeys) {
	  var this$1 = this;
	  var reversedSequence = makeSequence(collection);
	  reversedSequence._iter = collection;
	  reversedSequence.size = collection.size;

	  reversedSequence.reverse = function () {
	    return collection;
	  };

	  if (collection.flip) {
	    reversedSequence.flip = function () {
	      var flipSequence = flipFactory(collection);

	      flipSequence.reverse = function () {
	        return collection.flip();
	      };

	      return flipSequence;
	    };
	  }

	  reversedSequence.get = function (key, notSetValue) {
	    return collection.get(useKeys ? key : -1 - key, notSetValue);
	  };

	  reversedSequence.has = function (key) {
	    return collection.has(useKeys ? key : -1 - key);
	  };

	  reversedSequence.includes = function (value) {
	    return collection.includes(value);
	  };

	  reversedSequence.cacheResult = cacheResultThrough;

	  reversedSequence.__iterate = function (fn, reverse) {
	    var this$1 = this;
	    var i = 0;
	    reverse && ensureSize(collection);
	    return collection.__iterate(function (v, k) {
	      return fn(v, useKeys ? k : reverse ? this$1.size - ++i : i++, this$1);
	    }, !reverse);
	  };

	  reversedSequence.__iterator = function (type, reverse) {
	    var i = 0;
	    reverse && ensureSize(collection);

	    var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse);

	    return new Iterator(function () {
	      var step = iterator.next();

	      if (step.done) {
	        return step;
	      }

	      var entry = step.value;
	      return iteratorValue(type, useKeys ? entry[0] : reverse ? this$1.size - ++i : i++, entry[1], step);
	    });
	  };

	  return reversedSequence;
	}

	function filterFactory(collection, predicate, context, useKeys) {
	  var filterSequence = makeSequence(collection);

	  if (useKeys) {
	    filterSequence.has = function (key) {
	      var v = collection.get(key, NOT_SET);
	      return v !== NOT_SET && !!predicate.call(context, v, key, collection);
	    };

	    filterSequence.get = function (key, notSetValue) {
	      var v = collection.get(key, NOT_SET);
	      return v !== NOT_SET && predicate.call(context, v, key, collection) ? v : notSetValue;
	    };
	  }

	  filterSequence.__iterateUncached = function (fn, reverse) {
	    var this$1 = this;
	    var iterations = 0;

	    collection.__iterate(function (v, k, c) {
	      if (predicate.call(context, v, k, c)) {
	        iterations++;
	        return fn(v, useKeys ? k : iterations - 1, this$1);
	      }
	    }, reverse);

	    return iterations;
	  };

	  filterSequence.__iteratorUncached = function (type, reverse) {
	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);

	    var iterations = 0;
	    return new Iterator(function () {
	      while (true) {
	        var step = iterator.next();

	        if (step.done) {
	          return step;
	        }

	        var entry = step.value;
	        var key = entry[0];
	        var value = entry[1];

	        if (predicate.call(context, value, key, collection)) {
	          return iteratorValue(type, useKeys ? key : iterations++, value, step);
	        }
	      }
	    });
	  };

	  return filterSequence;
	}

	function countByFactory(collection, grouper, context) {
	  var groups = Map$1().asMutable();

	  collection.__iterate(function (v, k) {
	    groups.update(grouper.call(context, v, k, collection), 0, function (a) {
	      return a + 1;
	    });
	  });

	  return groups.asImmutable();
	}

	function groupByFactory(collection, grouper, context) {
	  var isKeyedIter = isKeyed(collection);
	  var groups = (isOrdered(collection) ? OrderedMap() : Map$1()).asMutable();

	  collection.__iterate(function (v, k) {
	    groups.update(grouper.call(context, v, k, collection), function (a) {
	      return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
	    });
	  });

	  var coerce = collectionClass(collection);
	  return groups.map(function (arr) {
	    return reify(collection, coerce(arr));
	  }).asImmutable();
	}

	function sliceFactory(collection, begin, end, useKeys) {
	  var originalSize = collection.size;

	  if (wholeSlice(begin, end, originalSize)) {
	    return collection;
	  }

	  var resolvedBegin = resolveBegin(begin, originalSize);
	  var resolvedEnd = resolveEnd(end, originalSize); // begin or end will be NaN if they were provided as negative numbers and
	  // this collection's size is unknown. In that case, cache first so there is
	  // a known size and these do not resolve to NaN.

	  if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	    return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
	  } // Note: resolvedEnd is undefined when the original sequence's length is
	  // unknown and this slice did not supply an end and should contain all
	  // elements after resolvedBegin.
	  // In that case, resolvedSize will be NaN and sliceSize will remain undefined.


	  var resolvedSize = resolvedEnd - resolvedBegin;
	  var sliceSize;

	  if (resolvedSize === resolvedSize) {
	    sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	  }

	  var sliceSeq = makeSequence(collection); // If collection.size is undefined, the size of the realized sliceSeq is
	  // unknown at this point unless the number of items to slice is 0

	  sliceSeq.size = sliceSize === 0 ? sliceSize : collection.size && sliceSize || undefined;

	  if (!useKeys && isSeq(collection) && sliceSize >= 0) {
	    sliceSeq.get = function (index, notSetValue) {
	      index = wrapIndex(this, index);
	      return index >= 0 && index < sliceSize ? collection.get(index + resolvedBegin, notSetValue) : notSetValue;
	    };
	  }

	  sliceSeq.__iterateUncached = function (fn, reverse) {
	    var this$1 = this;

	    if (sliceSize === 0) {
	      return 0;
	    }

	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }

	    var skipped = 0;
	    var isSkipping = true;
	    var iterations = 0;

	    collection.__iterate(function (v, k) {
	      if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	        iterations++;
	        return fn(v, useKeys ? k : iterations - 1, this$1) !== false && iterations !== sliceSize;
	      }
	    });

	    return iterations;
	  };

	  sliceSeq.__iteratorUncached = function (type, reverse) {
	    if (sliceSize !== 0 && reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    } // Don't bother instantiating parent iterator if taking 0.


	    if (sliceSize === 0) {
	      return new Iterator(iteratorDone);
	    }

	    var iterator = collection.__iterator(type, reverse);

	    var skipped = 0;
	    var iterations = 0;
	    return new Iterator(function () {
	      while (skipped++ < resolvedBegin) {
	        iterator.next();
	      }

	      if (++iterations > sliceSize) {
	        return iteratorDone();
	      }

	      var step = iterator.next();

	      if (useKeys || type === ITERATE_VALUES || step.done) {
	        return step;
	      }

	      if (type === ITERATE_KEYS) {
	        return iteratorValue(type, iterations - 1, undefined, step);
	      }

	      return iteratorValue(type, iterations - 1, step.value[1], step);
	    });
	  };

	  return sliceSeq;
	}

	function takeWhileFactory(collection, predicate, context) {
	  var takeSequence = makeSequence(collection);

	  takeSequence.__iterateUncached = function (fn, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }

	    var iterations = 0;

	    collection.__iterate(function (v, k, c) {
	      return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$1);
	    });

	    return iterations;
	  };

	  takeSequence.__iteratorUncached = function (type, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }

	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);

	    var iterating = true;
	    return new Iterator(function () {
	      if (!iterating) {
	        return iteratorDone();
	      }

	      var step = iterator.next();

	      if (step.done) {
	        return step;
	      }

	      var entry = step.value;
	      var k = entry[0];
	      var v = entry[1];

	      if (!predicate.call(context, v, k, this$1)) {
	        iterating = false;
	        return iteratorDone();
	      }

	      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	    });
	  };

	  return takeSequence;
	}

	function skipWhileFactory(collection, predicate, context, useKeys) {
	  var skipSequence = makeSequence(collection);

	  skipSequence.__iterateUncached = function (fn, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }

	    var isSkipping = true;
	    var iterations = 0;

	    collection.__iterate(function (v, k, c) {
	      if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	        iterations++;
	        return fn(v, useKeys ? k : iterations - 1, this$1);
	      }
	    });

	    return iterations;
	  };

	  skipSequence.__iteratorUncached = function (type, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }

	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);

	    var skipping = true;
	    var iterations = 0;
	    return new Iterator(function () {
	      var step;
	      var k;
	      var v;

	      do {
	        step = iterator.next();

	        if (step.done) {
	          if (useKeys || type === ITERATE_VALUES) {
	            return step;
	          }

	          if (type === ITERATE_KEYS) {
	            return iteratorValue(type, iterations++, undefined, step);
	          }

	          return iteratorValue(type, iterations++, step.value[1], step);
	        }

	        var entry = step.value;
	        k = entry[0];
	        v = entry[1];
	        skipping && (skipping = predicate.call(context, v, k, this$1));
	      } while (skipping);

	      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	    });
	  };

	  return skipSequence;
	}

	function concatFactory(collection, values) {
	  var isKeyedCollection = isKeyed(collection);
	  var iters = [collection].concat(values).map(function (v) {
	    if (!isCollection(v)) {
	      v = isKeyedCollection ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	    } else if (isKeyedCollection) {
	      v = KeyedCollection(v);
	    }

	    return v;
	  }).filter(function (v) {
	    return v.size !== 0;
	  });

	  if (iters.length === 0) {
	    return collection;
	  }

	  if (iters.length === 1) {
	    var singleton = iters[0];

	    if (singleton === collection || isKeyedCollection && isKeyed(singleton) || isIndexed(collection) && isIndexed(singleton)) {
	      return singleton;
	    }
	  }

	  var concatSeq = new ArraySeq(iters);

	  if (isKeyedCollection) {
	    concatSeq = concatSeq.toKeyedSeq();
	  } else if (!isIndexed(collection)) {
	    concatSeq = concatSeq.toSetSeq();
	  }

	  concatSeq = concatSeq.flatten(true);
	  concatSeq.size = iters.reduce(function (sum, seq) {
	    if (sum !== undefined) {
	      var size = seq.size;

	      if (size !== undefined) {
	        return sum + size;
	      }
	    }
	  }, 0);
	  return concatSeq;
	}

	function flattenFactory(collection, depth, useKeys) {
	  var flatSequence = makeSequence(collection);

	  flatSequence.__iterateUncached = function (fn, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }

	    var iterations = 0;
	    var stopped = false;

	    function flatDeep(iter, currentDepth) {
	      iter.__iterate(function (v, k) {
	        if ((!depth || currentDepth < depth) && isCollection(v)) {
	          flatDeep(v, currentDepth + 1);
	        } else {
	          iterations++;

	          if (fn(v, useKeys ? k : iterations - 1, flatSequence) === false) {
	            stopped = true;
	          }
	        }

	        return !stopped;
	      }, reverse);
	    }

	    flatDeep(collection, 0);
	    return iterations;
	  };

	  flatSequence.__iteratorUncached = function (type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }

	    var iterator = collection.__iterator(type, reverse);

	    var stack = [];
	    var iterations = 0;
	    return new Iterator(function () {
	      while (iterator) {
	        var step = iterator.next();

	        if (step.done !== false) {
	          iterator = stack.pop();
	          continue;
	        }

	        var v = step.value;

	        if (type === ITERATE_ENTRIES) {
	          v = v[1];
	        }

	        if ((!depth || stack.length < depth) && isCollection(v)) {
	          stack.push(iterator);
	          iterator = v.__iterator(type, reverse);
	        } else {
	          return useKeys ? step : iteratorValue(type, iterations++, v, step);
	        }
	      }

	      return iteratorDone();
	    });
	  };

	  return flatSequence;
	}

	function flatMapFactory(collection, mapper, context) {
	  var coerce = collectionClass(collection);
	  return collection.toSeq().map(function (v, k) {
	    return coerce(mapper.call(context, v, k, collection));
	  }).flatten(true);
	}

	function interposeFactory(collection, separator) {
	  var interposedSequence = makeSequence(collection);
	  interposedSequence.size = collection.size && collection.size * 2 - 1;

	  interposedSequence.__iterateUncached = function (fn, reverse) {
	    var this$1 = this;
	    var iterations = 0;

	    collection.__iterate(function (v) {
	      return (!iterations || fn(separator, iterations++, this$1) !== false) && fn(v, iterations++, this$1) !== false;
	    }, reverse);

	    return iterations;
	  };

	  interposedSequence.__iteratorUncached = function (type, reverse) {
	    var iterator = collection.__iterator(ITERATE_VALUES, reverse);

	    var iterations = 0;
	    var step;
	    return new Iterator(function () {
	      if (!step || iterations % 2) {
	        step = iterator.next();

	        if (step.done) {
	          return step;
	        }
	      }

	      return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
	    });
	  };

	  return interposedSequence;
	}

	function sortFactory(collection, comparator, mapper) {
	  if (!comparator) {
	    comparator = defaultComparator;
	  }

	  var isKeyedCollection = isKeyed(collection);
	  var index = 0;
	  var entries = collection.toSeq().map(function (v, k) {
	    return [k, v, index++, mapper ? mapper(v, k, collection) : v];
	  }).valueSeq().toArray();
	  entries.sort(function (a, b) {
	    return comparator(a[3], b[3]) || a[2] - b[2];
	  }).forEach(isKeyedCollection ? function (v, i) {
	    entries[i].length = 2;
	  } : function (v, i) {
	    entries[i] = v[1];
	  });
	  return isKeyedCollection ? KeyedSeq(entries) : isIndexed(collection) ? IndexedSeq(entries) : SetSeq(entries);
	}

	function maxFactory(collection, comparator, mapper) {
	  if (!comparator) {
	    comparator = defaultComparator;
	  }

	  if (mapper) {
	    var entry = collection.toSeq().map(function (v, k) {
	      return [v, mapper(v, k, collection)];
	    }).reduce(function (a, b) {
	      return maxCompare(comparator, a[1], b[1]) ? b : a;
	    });
	    return entry && entry[0];
	  }

	  return collection.reduce(function (a, b) {
	    return maxCompare(comparator, a, b) ? b : a;
	  });
	}

	function maxCompare(comparator, a, b) {
	  var comp = comparator(b, a); // b is considered the new max if the comparator declares them equal, but
	  // they are not equal and b is in fact a nullish value.

	  return comp === 0 && b !== a && (b === undefined || b === null || b !== b) || comp > 0;
	}

	function zipWithFactory(keyIter, zipper, iters, zipAll) {
	  var zipSequence = makeSequence(keyIter);
	  var sizes = new ArraySeq(iters).map(function (i) {
	    return i.size;
	  });
	  zipSequence.size = zipAll ? sizes.max() : sizes.min(); // Note: this a generic base implementation of __iterate in terms of
	  // __iterator which may be more generically useful in the future.

	  zipSequence.__iterate = function (fn, reverse) {
	    /* generic:
	    var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	    var step;
	    var iterations = 0;
	    while (!(step = iterator.next()).done) {
	      iterations++;
	      if (fn(step.value[1], step.value[0], this) === false) {
	        break;
	      }
	    }
	    return iterations;
	    */
	    // indexed:
	    var iterator = this.__iterator(ITERATE_VALUES, reverse);

	    var step;
	    var iterations = 0;

	    while (!(step = iterator.next()).done) {
	      if (fn(step.value, iterations++, this) === false) {
	        break;
	      }
	    }

	    return iterations;
	  };

	  zipSequence.__iteratorUncached = function (type, reverse) {
	    var iterators = iters.map(function (i) {
	      return i = Collection(i), getIterator(reverse ? i.reverse() : i);
	    });
	    var iterations = 0;
	    var isDone = false;
	    return new Iterator(function () {
	      var steps;

	      if (!isDone) {
	        steps = iterators.map(function (i) {
	          return i.next();
	        });
	        isDone = zipAll ? steps.every(function (s) {
	          return s.done;
	        }) : steps.some(function (s) {
	          return s.done;
	        });
	      }

	      if (isDone) {
	        return iteratorDone();
	      }

	      return iteratorValue(type, iterations++, zipper.apply(null, steps.map(function (s) {
	        return s.value;
	      })));
	    });
	  };

	  return zipSequence;
	} // #pragma Helper Functions


	function reify(iter, seq) {
	  return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
	}

	function validateEntry(entry) {
	  if (entry !== Object(entry)) {
	    throw new TypeError('Expected [K, V] tuple: ' + entry);
	  }
	}

	function collectionClass(collection) {
	  return isKeyed(collection) ? KeyedCollection : isIndexed(collection) ? IndexedCollection : SetCollection;
	}

	function makeSequence(collection) {
	  return Object.create((isKeyed(collection) ? KeyedSeq : isIndexed(collection) ? IndexedSeq : SetSeq).prototype);
	}

	function cacheResultThrough() {
	  if (this._iter.cacheResult) {
	    this._iter.cacheResult();

	    this.size = this._iter.size;
	    return this;
	  }

	  return Seq.prototype.cacheResult.call(this);
	}

	function defaultComparator(a, b) {
	  if (a === undefined && b === undefined) {
	    return 0;
	  }

	  if (a === undefined) {
	    return 1;
	  }

	  if (b === undefined) {
	    return -1;
	  }

	  return a > b ? 1 : a < b ? -1 : 0;
	} // http://jsperf.com/copy-array-inline


	function arrCopy(arr, offset) {
	  offset = offset || 0;
	  var len = Math.max(0, arr.length - offset);
	  var newArr = new Array(len);

	  for (var ii = 0; ii < len; ii++) {
	    newArr[ii] = arr[ii + offset];
	  }

	  return newArr;
	}

	function invariant(condition, error) {
	  if (!condition) {
	    throw new Error(error);
	  }
	}

	function assertNotInfinite(size) {
	  invariant(size !== Infinity, 'Cannot perform this action with an infinite size.');
	}

	function coerceKeyPath(keyPath) {
	  if (isArrayLike$1(keyPath) && typeof keyPath !== 'string') {
	    return keyPath;
	  }

	  if (isOrdered(keyPath)) {
	    return keyPath.toArray();
	  }

	  throw new TypeError('Invalid keyPath: expected Ordered Collection or Array: ' + keyPath);
	}

	function isPlainObj(value) {
	  return value && (typeof value.constructor !== 'function' || value.constructor.name === 'Object');
	}
	/**
	 * Returns true if the value is a potentially-persistent data structure, either
	 * provided by Immutable.js or a plain Array or Object.
	 */


	function isDataStructure(value) {
	  return typeof value === 'object' && (isImmutable(value) || Array.isArray(value) || isPlainObj(value));
	}
	/**
	 * Converts a value to a string, adding quotes if a string was provided.
	 */


	function quoteString(value) {
	  try {
	    return typeof value === 'string' ? JSON.stringify(value) : String(value);
	  } catch (_ignoreError) {
	    return JSON.stringify(value);
	  }
	}

	function has(collection, key) {
	  return isImmutable(collection) ? collection.has(key) : isDataStructure(collection) && hasOwnProperty.call(collection, key);
	}

	function get(collection, key, notSetValue) {
	  return isImmutable(collection) ? collection.get(key, notSetValue) : !has(collection, key) ? notSetValue : typeof collection.get === 'function' ? collection.get(key) : collection[key];
	}

	function shallowCopy(from) {
	  if (Array.isArray(from)) {
	    return arrCopy(from);
	  }

	  var to = {};

	  for (var key in from) {
	    if (hasOwnProperty.call(from, key)) {
	      to[key] = from[key];
	    }
	  }

	  return to;
	}

	function remove(collection, key) {
	  if (!isDataStructure(collection)) {
	    throw new TypeError('Cannot update non-data-structure value: ' + collection);
	  }

	  if (isImmutable(collection)) {
	    if (!collection.remove) {
	      throw new TypeError('Cannot update immutable value without .remove() method: ' + collection);
	    }

	    return collection.remove(key);
	  }

	  if (!hasOwnProperty.call(collection, key)) {
	    return collection;
	  }

	  var collectionCopy = shallowCopy(collection);

	  if (Array.isArray(collectionCopy)) {
	    collectionCopy.splice(key, 1);
	  } else {
	    delete collectionCopy[key];
	  }

	  return collectionCopy;
	}

	function set(collection, key, value) {
	  if (!isDataStructure(collection)) {
	    throw new TypeError('Cannot update non-data-structure value: ' + collection);
	  }

	  if (isImmutable(collection)) {
	    if (!collection.set) {
	      throw new TypeError('Cannot update immutable value without .set() method: ' + collection);
	    }

	    return collection.set(key, value);
	  }

	  if (hasOwnProperty.call(collection, key) && value === collection[key]) {
	    return collection;
	  }

	  var collectionCopy = shallowCopy(collection);
	  collectionCopy[key] = value;
	  return collectionCopy;
	}

	function updateIn(collection, keyPath, notSetValue, updater) {
	  if (!updater) {
	    updater = notSetValue;
	    notSetValue = undefined;
	  }

	  var updatedValue = updateInDeeply(isImmutable(collection), collection, coerceKeyPath(keyPath), 0, notSetValue, updater);
	  return updatedValue === NOT_SET ? notSetValue : updatedValue;
	}

	function updateInDeeply(inImmutable, existing, keyPath, i, notSetValue, updater) {
	  var wasNotSet = existing === NOT_SET;

	  if (i === keyPath.length) {
	    var existingValue = wasNotSet ? notSetValue : existing;
	    var newValue = updater(existingValue);
	    return newValue === existingValue ? existing : newValue;
	  }

	  if (!wasNotSet && !isDataStructure(existing)) {
	    throw new TypeError('Cannot update within non-data-structure value in path [' + keyPath.slice(0, i).map(quoteString) + ']: ' + existing);
	  }

	  var key = keyPath[i];
	  var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
	  var nextUpdated = updateInDeeply(nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting), nextExisting, keyPath, i + 1, notSetValue, updater);
	  return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? remove(existing, key) : set(wasNotSet ? inImmutable ? emptyMap() : {} : existing, key, nextUpdated);
	}

	function setIn(collection, keyPath, value) {
	  return updateIn(collection, keyPath, NOT_SET, function () {
	    return value;
	  });
	}

	function setIn$1(keyPath, v) {
	  return setIn(this, keyPath, v);
	}

	function removeIn(collection, keyPath) {
	  return updateIn(collection, keyPath, function () {
	    return NOT_SET;
	  });
	}

	function deleteIn(keyPath) {
	  return removeIn(this, keyPath);
	}

	function update(collection, key, notSetValue, updater) {
	  return updateIn(collection, [key], notSetValue, updater);
	}

	function update$1(key, notSetValue, updater) {
	  return arguments.length === 1 ? key(this) : update(this, key, notSetValue, updater);
	}

	function updateIn$1(keyPath, notSetValue, updater) {
	  return updateIn(this, keyPath, notSetValue, updater);
	}

	function merge$1() {
	  var iters = [],
	      len = arguments.length;

	  while (len--) iters[len] = arguments[len];

	  return mergeIntoKeyedWith(this, iters);
	}

	function mergeWith(merger) {
	  var iters = [],
	      len = arguments.length - 1;

	  while (len-- > 0) iters[len] = arguments[len + 1];

	  if (typeof merger !== 'function') {
	    throw new TypeError('Invalid merger function: ' + merger);
	  }

	  return mergeIntoKeyedWith(this, iters, merger);
	}

	function mergeIntoKeyedWith(collection, collections, merger) {
	  var iters = [];

	  for (var ii = 0; ii < collections.length; ii++) {
	    var collection$1 = KeyedCollection(collections[ii]);

	    if (collection$1.size !== 0) {
	      iters.push(collection$1);
	    }
	  }

	  if (iters.length === 0) {
	    return collection;
	  }

	  if (collection.toSeq().size === 0 && !collection.__ownerID && iters.length === 1) {
	    return collection.constructor(iters[0]);
	  }

	  return collection.withMutations(function (collection) {
	    var mergeIntoCollection = merger ? function (value, key) {
	      update(collection, key, NOT_SET, function (oldVal) {
	        return oldVal === NOT_SET ? value : merger(oldVal, value, key);
	      });
	    } : function (value, key) {
	      collection.set(key, value);
	    };

	    for (var ii = 0; ii < iters.length; ii++) {
	      iters[ii].forEach(mergeIntoCollection);
	    }
	  });
	}

	function merge$1$1(collection) {
	  var sources = [],
	      len = arguments.length - 1;

	  while (len-- > 0) sources[len] = arguments[len + 1];

	  return mergeWithSources(collection, sources);
	}

	function mergeWith$1(merger, collection) {
	  var sources = [],
	      len = arguments.length - 2;

	  while (len-- > 0) sources[len] = arguments[len + 2];

	  return mergeWithSources(collection, sources, merger);
	}

	function mergeDeep(collection) {
	  var sources = [],
	      len = arguments.length - 1;

	  while (len-- > 0) sources[len] = arguments[len + 1];

	  return mergeDeepWithSources(collection, sources);
	}

	function mergeDeepWith(merger, collection) {
	  var sources = [],
	      len = arguments.length - 2;

	  while (len-- > 0) sources[len] = arguments[len + 2];

	  return mergeDeepWithSources(collection, sources, merger);
	}

	function mergeDeepWithSources(collection, sources, merger) {
	  return mergeWithSources(collection, sources, deepMergerWith(merger));
	}

	function mergeWithSources(collection, sources, merger) {
	  if (!isDataStructure(collection)) {
	    throw new TypeError('Cannot merge into non-data-structure value: ' + collection);
	  }

	  if (isImmutable(collection)) {
	    return typeof merger === 'function' && collection.mergeWith ? collection.mergeWith.apply(collection, [merger].concat(sources)) : collection.merge ? collection.merge.apply(collection, sources) : collection.concat.apply(collection, sources);
	  }

	  var isArray = Array.isArray(collection);
	  var merged = collection;
	  var Collection$$1 = isArray ? IndexedCollection : KeyedCollection;
	  var mergeItem = isArray ? function (value) {
	    // Copy on write
	    if (merged === collection) {
	      merged = shallowCopy(merged);
	    }

	    merged.push(value);
	  } : function (value, key) {
	    var hasVal = hasOwnProperty.call(merged, key);
	    var nextVal = hasVal && merger ? merger(merged[key], value, key) : value;

	    if (!hasVal || nextVal !== merged[key]) {
	      // Copy on write
	      if (merged === collection) {
	        merged = shallowCopy(merged);
	      }

	      merged[key] = nextVal;
	    }
	  };

	  for (var i = 0; i < sources.length; i++) {
	    Collection$$1(sources[i]).forEach(mergeItem);
	  }

	  return merged;
	}

	function deepMergerWith(merger) {
	  function deepMerger(oldValue, newValue, key) {
	    return isDataStructure(oldValue) && isDataStructure(newValue) ? mergeWithSources(oldValue, [newValue], deepMerger) : merger ? merger(oldValue, newValue, key) : newValue;
	  }

	  return deepMerger;
	}

	function mergeDeep$1() {
	  var iters = [],
	      len = arguments.length;

	  while (len--) iters[len] = arguments[len];

	  return mergeDeepWithSources(this, iters);
	}

	function mergeDeepWith$1(merger) {
	  var iters = [],
	      len = arguments.length - 1;

	  while (len-- > 0) iters[len] = arguments[len + 1];

	  return mergeDeepWithSources(this, iters, merger);
	}

	function mergeIn(keyPath) {
	  var iters = [],
	      len = arguments.length - 1;

	  while (len-- > 0) iters[len] = arguments[len + 1];

	  return updateIn(this, keyPath, emptyMap(), function (m) {
	    return mergeWithSources(m, iters);
	  });
	}

	function mergeDeepIn(keyPath) {
	  var iters = [],
	      len = arguments.length - 1;

	  while (len-- > 0) iters[len] = arguments[len + 1];

	  return updateIn(this, keyPath, emptyMap(), function (m) {
	    return mergeDeepWithSources(m, iters);
	  });
	}

	function withMutations(fn) {
	  var mutable = this.asMutable();
	  fn(mutable);
	  return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	}

	function asMutable() {
	  return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	}

	function asImmutable() {
	  return this.__ensureOwner();
	}

	function wasAltered() {
	  return this.__altered;
	}

	var Map$1 =
	/*@__PURE__*/
	function (KeyedCollection$$1) {
	  function Map(value) {
	    return value === null || value === undefined ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function (map) {
	      var iter = KeyedCollection$$1(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v, k) {
	        return map.set(k, v);
	      });
	    });
	  }

	  if (KeyedCollection$$1) Map.__proto__ = KeyedCollection$$1;
	  Map.prototype = Object.create(KeyedCollection$$1 && KeyedCollection$$1.prototype);
	  Map.prototype.constructor = Map;

	  Map.of = function of() {
	    var keyValues = [],
	        len = arguments.length;

	    while (len--) keyValues[len] = arguments[len];

	    return emptyMap().withMutations(function (map) {
	      for (var i = 0; i < keyValues.length; i += 2) {
	        if (i + 1 >= keyValues.length) {
	          throw new Error('Missing value for key: ' + keyValues[i]);
	        }

	        map.set(keyValues[i], keyValues[i + 1]);
	      }
	    });
	  };

	  Map.prototype.toString = function toString() {
	    return this.__toString('Map {', '}');
	  }; // @pragma Access


	  Map.prototype.get = function get(k, notSetValue) {
	    return this._root ? this._root.get(0, undefined, k, notSetValue) : notSetValue;
	  }; // @pragma Modification


	  Map.prototype.set = function set(k, v) {
	    return updateMap(this, k, v);
	  };

	  Map.prototype.remove = function remove(k) {
	    return updateMap(this, k, NOT_SET);
	  };

	  Map.prototype.deleteAll = function deleteAll(keys) {
	    var collection = Collection(keys);

	    if (collection.size === 0) {
	      return this;
	    }

	    return this.withMutations(function (map) {
	      collection.forEach(function (key) {
	        return map.remove(key);
	      });
	    });
	  };

	  Map.prototype.clear = function clear() {
	    if (this.size === 0) {
	      return this;
	    }

	    if (this.__ownerID) {
	      this.size = 0;
	      this._root = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }

	    return emptyMap();
	  }; // @pragma Composition


	  Map.prototype.sort = function sort(comparator) {
	    // Late binding
	    return OrderedMap(sortFactory(this, comparator));
	  };

	  Map.prototype.sortBy = function sortBy(mapper, comparator) {
	    // Late binding
	    return OrderedMap(sortFactory(this, comparator, mapper));
	  };

	  Map.prototype.map = function map(mapper, context) {
	    return this.withMutations(function (map) {
	      map.forEach(function (value, key) {
	        map.set(key, mapper.call(context, value, key, map));
	      });
	    });
	  }; // @pragma Mutability


	  Map.prototype.__iterator = function __iterator(type, reverse) {
	    return new MapIterator(this, type, reverse);
	  };

	  Map.prototype.__iterate = function __iterate(fn, reverse) {
	    var this$1 = this;
	    var iterations = 0;
	    this._root && this._root.iterate(function (entry) {
	      iterations++;
	      return fn(entry[1], entry[0], this$1);
	    }, reverse);
	    return iterations;
	  };

	  Map.prototype.__ensureOwner = function __ensureOwner(ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }

	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyMap();
	      }

	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }

	    return makeMap(this.size, this._root, ownerID, this.__hash);
	  };

	  return Map;
	}(KeyedCollection);

	Map$1.isMap = isMap;
	var MapPrototype = Map$1.prototype;
	MapPrototype[IS_MAP_SYMBOL] = true;
	MapPrototype[DELETE] = MapPrototype.remove;
	MapPrototype.removeAll = MapPrototype.deleteAll;
	MapPrototype.setIn = setIn$1;
	MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
	MapPrototype.update = update$1;
	MapPrototype.updateIn = updateIn$1;
	MapPrototype.merge = MapPrototype.concat = merge$1;
	MapPrototype.mergeWith = mergeWith;
	MapPrototype.mergeDeep = mergeDeep$1;
	MapPrototype.mergeDeepWith = mergeDeepWith$1;
	MapPrototype.mergeIn = mergeIn;
	MapPrototype.mergeDeepIn = mergeDeepIn;
	MapPrototype.withMutations = withMutations;
	MapPrototype.wasAltered = wasAltered;
	MapPrototype.asImmutable = asImmutable;
	MapPrototype['@@transducer/init'] = MapPrototype.asMutable = asMutable;

	MapPrototype['@@transducer/step'] = function (result, arr) {
	  return result.set(arr[0], arr[1]);
	};

	MapPrototype['@@transducer/result'] = function (obj) {
	  return obj.asImmutable();
	}; // #pragma Trie Nodes


	var ArrayMapNode = function ArrayMapNode(ownerID, entries) {
	  this.ownerID = ownerID;
	  this.entries = entries;
	};

	ArrayMapNode.prototype.get = function get(shift, keyHash, key, notSetValue) {
	  var entries = this.entries;

	  for (var ii = 0, len = entries.length; ii < len; ii++) {
	    if (is(key, entries[ii][0])) {
	      return entries[ii][1];
	    }
	  }

	  return notSetValue;
	};

	ArrayMapNode.prototype.update = function update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  var removed = value === NOT_SET;
	  var entries = this.entries;
	  var idx = 0;
	  var len = entries.length;

	  for (; idx < len; idx++) {
	    if (is(key, entries[idx][0])) {
	      break;
	    }
	  }

	  var exists = idx < len;

	  if (exists ? entries[idx][1] === value : removed) {
	    return this;
	  }

	  SetRef(didAlter);
	  (removed || !exists) && SetRef(didChangeSize);

	  if (removed && entries.length === 1) {
	    return; // undefined
	  }

	  if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	    return createNodes(ownerID, entries, key, value);
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newEntries = isEditable ? entries : arrCopy(entries);

	  if (exists) {
	    if (removed) {
	      idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
	    } else {
	      newEntries[idx] = [key, value];
	    }
	  } else {
	    newEntries.push([key, value]);
	  }

	  if (isEditable) {
	    this.entries = newEntries;
	    return this;
	  }

	  return new ArrayMapNode(ownerID, newEntries);
	};

	var BitmapIndexedNode = function BitmapIndexedNode(ownerID, bitmap, nodes) {
	  this.ownerID = ownerID;
	  this.bitmap = bitmap;
	  this.nodes = nodes;
	};

	BitmapIndexedNode.prototype.get = function get(shift, keyHash, key, notSetValue) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }

	  var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
	  var bitmap = this.bitmap;
	  return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
	};

	BitmapIndexedNode.prototype.update = function update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }

	  var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	  var bit = 1 << keyHashFrag;
	  var bitmap = this.bitmap;
	  var exists = (bitmap & bit) !== 0;

	  if (!exists && value === NOT_SET) {
	    return this;
	  }

	  var idx = popCount(bitmap & bit - 1);
	  var nodes = this.nodes;
	  var node = exists ? nodes[idx] : undefined;
	  var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	  if (newNode === node) {
	    return this;
	  }

	  if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	    return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	  }

	  if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	    return nodes[idx ^ 1];
	  }

	  if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	    return newNode;
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	  var newNodes = exists ? newNode ? setAt(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);

	  if (isEditable) {
	    this.bitmap = newBitmap;
	    this.nodes = newNodes;
	    return this;
	  }

	  return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	};

	var HashArrayMapNode = function HashArrayMapNode(ownerID, count, nodes) {
	  this.ownerID = ownerID;
	  this.count = count;
	  this.nodes = nodes;
	};

	HashArrayMapNode.prototype.get = function get(shift, keyHash, key, notSetValue) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }

	  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	  var node = this.nodes[idx];
	  return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	};

	HashArrayMapNode.prototype.update = function update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }

	  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	  var removed = value === NOT_SET;
	  var nodes = this.nodes;
	  var node = nodes[idx];

	  if (removed && !node) {
	    return this;
	  }

	  var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	  if (newNode === node) {
	    return this;
	  }

	  var newCount = this.count;

	  if (!node) {
	    newCount++;
	  } else if (!newNode) {
	    newCount--;

	    if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	      return packNodes(ownerID, nodes, newCount, idx);
	    }
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newNodes = setAt(nodes, idx, newNode, isEditable);

	  if (isEditable) {
	    this.count = newCount;
	    this.nodes = newNodes;
	    return this;
	  }

	  return new HashArrayMapNode(ownerID, newCount, newNodes);
	};

	var HashCollisionNode = function HashCollisionNode(ownerID, keyHash, entries) {
	  this.ownerID = ownerID;
	  this.keyHash = keyHash;
	  this.entries = entries;
	};

	HashCollisionNode.prototype.get = function get(shift, keyHash, key, notSetValue) {
	  var entries = this.entries;

	  for (var ii = 0, len = entries.length; ii < len; ii++) {
	    if (is(key, entries[ii][0])) {
	      return entries[ii][1];
	    }
	  }

	  return notSetValue;
	};

	HashCollisionNode.prototype.update = function update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }

	  var removed = value === NOT_SET;

	  if (keyHash !== this.keyHash) {
	    if (removed) {
	      return this;
	    }

	    SetRef(didAlter);
	    SetRef(didChangeSize);
	    return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	  }

	  var entries = this.entries;
	  var idx = 0;
	  var len = entries.length;

	  for (; idx < len; idx++) {
	    if (is(key, entries[idx][0])) {
	      break;
	    }
	  }

	  var exists = idx < len;

	  if (exists ? entries[idx][1] === value : removed) {
	    return this;
	  }

	  SetRef(didAlter);
	  (removed || !exists) && SetRef(didChangeSize);

	  if (removed && len === 2) {
	    return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newEntries = isEditable ? entries : arrCopy(entries);

	  if (exists) {
	    if (removed) {
	      idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
	    } else {
	      newEntries[idx] = [key, value];
	    }
	  } else {
	    newEntries.push([key, value]);
	  }

	  if (isEditable) {
	    this.entries = newEntries;
	    return this;
	  }

	  return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	};

	var ValueNode = function ValueNode(ownerID, keyHash, entry) {
	  this.ownerID = ownerID;
	  this.keyHash = keyHash;
	  this.entry = entry;
	};

	ValueNode.prototype.get = function get(shift, keyHash, key, notSetValue) {
	  return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	};

	ValueNode.prototype.update = function update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  var removed = value === NOT_SET;
	  var keyMatch = is(key, this.entry[0]);

	  if (keyMatch ? value === this.entry[1] : removed) {
	    return this;
	  }

	  SetRef(didAlter);

	  if (removed) {
	    SetRef(didChangeSize);
	    return; // undefined
	  }

	  if (keyMatch) {
	    if (ownerID && ownerID === this.ownerID) {
	      this.entry[1] = value;
	      return this;
	    }

	    return new ValueNode(ownerID, this.keyHash, [key, value]);
	  }

	  SetRef(didChangeSize);
	  return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	}; // #pragma Iterators


	ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function (fn, reverse) {
	  var entries = this.entries;

	  for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	    if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	      return false;
	    }
	  }
	};

	BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	  var nodes = this.nodes;

	  for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	    var node = nodes[reverse ? maxIndex - ii : ii];

	    if (node && node.iterate(fn, reverse) === false) {
	      return false;
	    }
	  }
	}; // eslint-disable-next-line no-unused-vars


	ValueNode.prototype.iterate = function (fn, reverse) {
	  return fn(this.entry);
	};

	var MapIterator =
	/*@__PURE__*/
	function (Iterator$$1) {
	  function MapIterator(map, type, reverse) {
	    this._type = type;
	    this._reverse = reverse;
	    this._stack = map._root && mapIteratorFrame(map._root);
	  }

	  if (Iterator$$1) MapIterator.__proto__ = Iterator$$1;
	  MapIterator.prototype = Object.create(Iterator$$1 && Iterator$$1.prototype);
	  MapIterator.prototype.constructor = MapIterator;

	  MapIterator.prototype.next = function next() {
	    var type = this._type;
	    var stack = this._stack;

	    while (stack) {
	      var node = stack.node;
	      var index = stack.index++;
	      var maxIndex = void 0;

	      if (node.entry) {
	        if (index === 0) {
	          return mapIteratorValue(type, node.entry);
	        }
	      } else if (node.entries) {
	        maxIndex = node.entries.length - 1;

	        if (index <= maxIndex) {
	          return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	        }
	      } else {
	        maxIndex = node.nodes.length - 1;

	        if (index <= maxIndex) {
	          var subNode = node.nodes[this._reverse ? maxIndex - index : index];

	          if (subNode) {
	            if (subNode.entry) {
	              return mapIteratorValue(type, subNode.entry);
	            }

	            stack = this._stack = mapIteratorFrame(subNode, stack);
	          }

	          continue;
	        }
	      }

	      stack = this._stack = this._stack.__prev;
	    }

	    return iteratorDone();
	  };

	  return MapIterator;
	}(Iterator);

	function mapIteratorValue(type, entry) {
	  return iteratorValue(type, entry[0], entry[1]);
	}

	function mapIteratorFrame(node, prev) {
	  return {
	    node: node,
	    index: 0,
	    __prev: prev
	  };
	}

	function makeMap(size, root, ownerID, hash$$1) {
	  var map = Object.create(MapPrototype);
	  map.size = size;
	  map._root = root;
	  map.__ownerID = ownerID;
	  map.__hash = hash$$1;
	  map.__altered = false;
	  return map;
	}

	var EMPTY_MAP;

	function emptyMap() {
	  return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	}

	function updateMap(map, k, v) {
	  var newRoot;
	  var newSize;

	  if (!map._root) {
	    if (v === NOT_SET) {
	      return map;
	    }

	    newSize = 1;
	    newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	  } else {
	    var didChangeSize = MakeRef();
	    var didAlter = MakeRef();
	    newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);

	    if (!didAlter.value) {
	      return map;
	    }

	    newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	  }

	  if (map.__ownerID) {
	    map.size = newSize;
	    map._root = newRoot;
	    map.__hash = undefined;
	    map.__altered = true;
	    return map;
	  }

	  return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	}

	function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  if (!node) {
	    if (value === NOT_SET) {
	      return node;
	    }

	    SetRef(didAlter);
	    SetRef(didChangeSize);
	    return new ValueNode(ownerID, keyHash, [key, value]);
	  }

	  return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	}

	function isLeafNode(node) {
	  return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	}

	function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	  if (node.keyHash === keyHash) {
	    return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	  }

	  var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	  var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	  var newNode;
	  var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);
	  return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
	}

	function createNodes(ownerID, entries, key, value) {
	  if (!ownerID) {
	    ownerID = new OwnerID();
	  }

	  var node = new ValueNode(ownerID, hash(key), [key, value]);

	  for (var ii = 0; ii < entries.length; ii++) {
	    var entry = entries[ii];
	    node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	  }

	  return node;
	}

	function packNodes(ownerID, nodes, count, excluding) {
	  var bitmap = 0;
	  var packedII = 0;
	  var packedNodes = new Array(count);

	  for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	    var node = nodes[ii];

	    if (node !== undefined && ii !== excluding) {
	      bitmap |= bit;
	      packedNodes[packedII++] = node;
	    }
	  }

	  return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	}

	function expandNodes(ownerID, nodes, bitmap, including, node) {
	  var count = 0;
	  var expandedNodes = new Array(SIZE);

	  for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	    expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	  }

	  expandedNodes[including] = node;
	  return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	}

	function popCount(x) {
	  x -= x >> 1 & 0x55555555;
	  x = (x & 0x33333333) + (x >> 2 & 0x33333333);
	  x = x + (x >> 4) & 0x0f0f0f0f;
	  x += x >> 8;
	  x += x >> 16;
	  return x & 0x7f;
	}

	function setAt(array, idx, val, canEdit) {
	  var newArray = canEdit ? array : arrCopy(array);
	  newArray[idx] = val;
	  return newArray;
	}

	function spliceIn(array, idx, val, canEdit) {
	  var newLen = array.length + 1;

	  if (canEdit && idx + 1 === newLen) {
	    array[idx] = val;
	    return array;
	  }

	  var newArray = new Array(newLen);
	  var after = 0;

	  for (var ii = 0; ii < newLen; ii++) {
	    if (ii === idx) {
	      newArray[ii] = val;
	      after = -1;
	    } else {
	      newArray[ii] = array[ii + after];
	    }
	  }

	  return newArray;
	}

	function spliceOut(array, idx, canEdit) {
	  var newLen = array.length - 1;

	  if (canEdit && idx === newLen) {
	    array.pop();
	    return array;
	  }

	  var newArray = new Array(newLen);
	  var after = 0;

	  for (var ii = 0; ii < newLen; ii++) {
	    if (ii === idx) {
	      after = 1;
	    }

	    newArray[ii] = array[ii + after];
	  }

	  return newArray;
	}

	var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
	var IS_LIST_SYMBOL = '@@__IMMUTABLE_LIST__@@';

	function isList(maybeList) {
	  return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
	}

	var List =
	/*@__PURE__*/
	function (IndexedCollection$$1) {
	  function List(value) {
	    var empty = emptyList();

	    if (value === null || value === undefined) {
	      return empty;
	    }

	    if (isList(value)) {
	      return value;
	    }

	    var iter = IndexedCollection$$1(value);
	    var size = iter.size;

	    if (size === 0) {
	      return empty;
	    }

	    assertNotInfinite(size);

	    if (size > 0 && size < SIZE) {
	      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	    }

	    return empty.withMutations(function (list) {
	      list.setSize(size);
	      iter.forEach(function (v, i) {
	        return list.set(i, v);
	      });
	    });
	  }

	  if (IndexedCollection$$1) List.__proto__ = IndexedCollection$$1;
	  List.prototype = Object.create(IndexedCollection$$1 && IndexedCollection$$1.prototype);
	  List.prototype.constructor = List;

	  List.of = function of()
	  /*...values*/
	  {
	    return this(arguments);
	  };

	  List.prototype.toString = function toString() {
	    return this.__toString('List [', ']');
	  }; // @pragma Access


	  List.prototype.get = function get(index, notSetValue) {
	    index = wrapIndex(this, index);

	    if (index >= 0 && index < this.size) {
	      index += this._origin;
	      var node = listNodeFor(this, index);
	      return node && node.array[index & MASK];
	    }

	    return notSetValue;
	  }; // @pragma Modification


	  List.prototype.set = function set(index, value) {
	    return updateList(this, index, value);
	  };

	  List.prototype.remove = function remove(index) {
	    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
	  };

	  List.prototype.insert = function insert(index, value) {
	    return this.splice(index, 0, value);
	  };

	  List.prototype.clear = function clear() {
	    if (this.size === 0) {
	      return this;
	    }

	    if (this.__ownerID) {
	      this.size = this._origin = this._capacity = 0;
	      this._level = SHIFT;
	      this._root = this._tail = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }

	    return emptyList();
	  };

	  List.prototype.push = function push()
	  /*...values*/
	  {
	    var values = arguments;
	    var oldSize = this.size;
	    return this.withMutations(function (list) {
	      setListBounds(list, 0, oldSize + values.length);

	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(oldSize + ii, values[ii]);
	      }
	    });
	  };

	  List.prototype.pop = function pop() {
	    return setListBounds(this, 0, -1);
	  };

	  List.prototype.unshift = function unshift()
	  /*...values*/
	  {
	    var values = arguments;
	    return this.withMutations(function (list) {
	      setListBounds(list, -values.length);

	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(ii, values[ii]);
	      }
	    });
	  };

	  List.prototype.shift = function shift() {
	    return setListBounds(this, 1);
	  }; // @pragma Composition


	  List.prototype.concat = function concat()
	  /*...collections*/
	  {
	    var arguments$1 = arguments;
	    var seqs = [];

	    for (var i = 0; i < arguments.length; i++) {
	      var argument = arguments$1[i];
	      var seq = IndexedCollection$$1(typeof argument !== 'string' && hasIterator(argument) ? argument : [argument]);

	      if (seq.size !== 0) {
	        seqs.push(seq);
	      }
	    }

	    if (seqs.length === 0) {
	      return this;
	    }

	    if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
	      return this.constructor(seqs[0]);
	    }

	    return this.withMutations(function (list) {
	      seqs.forEach(function (seq) {
	        return seq.forEach(function (value) {
	          return list.push(value);
	        });
	      });
	    });
	  };

	  List.prototype.setSize = function setSize(size) {
	    return setListBounds(this, 0, size);
	  };

	  List.prototype.map = function map(mapper, context) {
	    var this$1 = this;
	    return this.withMutations(function (list) {
	      for (var i = 0; i < this$1.size; i++) {
	        list.set(i, mapper.call(context, list.get(i), i, list));
	      }
	    });
	  }; // @pragma Iteration


	  List.prototype.slice = function slice(begin, end) {
	    var size = this.size;

	    if (wholeSlice(begin, end, size)) {
	      return this;
	    }

	    return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
	  };

	  List.prototype.__iterator = function __iterator(type, reverse) {
	    var index = reverse ? this.size : 0;
	    var values = iterateList(this, reverse);
	    return new Iterator(function () {
	      var value = values();
	      return value === DONE ? iteratorDone() : iteratorValue(type, reverse ? --index : index++, value);
	    });
	  };

	  List.prototype.__iterate = function __iterate(fn, reverse) {
	    var index = reverse ? this.size : 0;
	    var values = iterateList(this, reverse);
	    var value;

	    while ((value = values()) !== DONE) {
	      if (fn(value, reverse ? --index : index++, this) === false) {
	        break;
	      }
	    }

	    return index;
	  };

	  List.prototype.__ensureOwner = function __ensureOwner(ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }

	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyList();
	      }

	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }

	    return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	  };

	  return List;
	}(IndexedCollection);

	List.isList = isList;
	var ListPrototype = List.prototype;
	ListPrototype[IS_LIST_SYMBOL] = true;
	ListPrototype[DELETE] = ListPrototype.remove;
	ListPrototype.merge = ListPrototype.concat;
	ListPrototype.setIn = setIn$1;
	ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
	ListPrototype.update = update$1;
	ListPrototype.updateIn = updateIn$1;
	ListPrototype.mergeIn = mergeIn;
	ListPrototype.mergeDeepIn = mergeDeepIn;
	ListPrototype.withMutations = withMutations;
	ListPrototype.wasAltered = wasAltered;
	ListPrototype.asImmutable = asImmutable;
	ListPrototype['@@transducer/init'] = ListPrototype.asMutable = asMutable;

	ListPrototype['@@transducer/step'] = function (result, arr) {
	  return result.push(arr);
	};

	ListPrototype['@@transducer/result'] = function (obj) {
	  return obj.asImmutable();
	};

	var VNode = function VNode(array, ownerID) {
	  this.array = array;
	  this.ownerID = ownerID;
	}; // TODO: seems like these methods are very similar


	VNode.prototype.removeBefore = function removeBefore(ownerID, level, index) {
	  if (index === level ? 1 << level : this.array.length === 0) {
	    return this;
	  }

	  var originIndex = index >>> level & MASK;

	  if (originIndex >= this.array.length) {
	    return new VNode([], ownerID);
	  }

	  var removingFirst = originIndex === 0;
	  var newChild;

	  if (level > 0) {
	    var oldChild = this.array[originIndex];
	    newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);

	    if (newChild === oldChild && removingFirst) {
	      return this;
	    }
	  }

	  if (removingFirst && !newChild) {
	    return this;
	  }

	  var editable = editableVNode(this, ownerID);

	  if (!removingFirst) {
	    for (var ii = 0; ii < originIndex; ii++) {
	      editable.array[ii] = undefined;
	    }
	  }

	  if (newChild) {
	    editable.array[originIndex] = newChild;
	  }

	  return editable;
	};

	VNode.prototype.removeAfter = function removeAfter(ownerID, level, index) {
	  if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	    return this;
	  }

	  var sizeIndex = index - 1 >>> level & MASK;

	  if (sizeIndex >= this.array.length) {
	    return this;
	  }

	  var newChild;

	  if (level > 0) {
	    var oldChild = this.array[sizeIndex];
	    newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);

	    if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	      return this;
	    }
	  }

	  var editable = editableVNode(this, ownerID);
	  editable.array.splice(sizeIndex + 1);

	  if (newChild) {
	    editable.array[sizeIndex] = newChild;
	  }

	  return editable;
	};

	var DONE = {};

	function iterateList(list, reverse) {
	  var left = list._origin;
	  var right = list._capacity;
	  var tailPos = getTailOffset(right);
	  var tail = list._tail;
	  return iterateNodeOrLeaf(list._root, list._level, 0);

	  function iterateNodeOrLeaf(node, level, offset) {
	    return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
	  }

	  function iterateLeaf(node, offset) {
	    var array = offset === tailPos ? tail && tail.array : node && node.array;
	    var from = offset > left ? 0 : left - offset;
	    var to = right - offset;

	    if (to > SIZE) {
	      to = SIZE;
	    }

	    return function () {
	      if (from === to) {
	        return DONE;
	      }

	      var idx = reverse ? --to : from++;
	      return array && array[idx];
	    };
	  }

	  function iterateNode(node, level, offset) {
	    var values;
	    var array = node && node.array;
	    var from = offset > left ? 0 : left - offset >> level;
	    var to = (right - offset >> level) + 1;

	    if (to > SIZE) {
	      to = SIZE;
	    }

	    return function () {
	      while (true) {
	        if (values) {
	          var value = values();

	          if (value !== DONE) {
	            return value;
	          }

	          values = null;
	        }

	        if (from === to) {
	          return DONE;
	        }

	        var idx = reverse ? --to : from++;
	        values = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
	      }
	    };
	  }
	}

	function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	  var list = Object.create(ListPrototype);
	  list.size = capacity - origin;
	  list._origin = origin;
	  list._capacity = capacity;
	  list._level = level;
	  list._root = root;
	  list._tail = tail;
	  list.__ownerID = ownerID;
	  list.__hash = hash;
	  list.__altered = false;
	  return list;
	}

	var EMPTY_LIST;

	function emptyList() {
	  return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	}

	function updateList(list, index, value) {
	  index = wrapIndex(list, index);

	  if (index !== index) {
	    return list;
	  }

	  if (index >= list.size || index < 0) {
	    return list.withMutations(function (list) {
	      index < 0 ? setListBounds(list, index).set(0, value) : setListBounds(list, 0, index + 1).set(index, value);
	    });
	  }

	  index += list._origin;
	  var newTail = list._tail;
	  var newRoot = list._root;
	  var didAlter = MakeRef();

	  if (index >= getTailOffset(list._capacity)) {
	    newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	  } else {
	    newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	  }

	  if (!didAlter.value) {
	    return list;
	  }

	  if (list.__ownerID) {
	    list._root = newRoot;
	    list._tail = newTail;
	    list.__hash = undefined;
	    list.__altered = true;
	    return list;
	  }

	  return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	}

	function updateVNode(node, ownerID, level, index, value, didAlter) {
	  var idx = index >>> level & MASK;
	  var nodeHas = node && idx < node.array.length;

	  if (!nodeHas && value === undefined) {
	    return node;
	  }

	  var newNode;

	  if (level > 0) {
	    var lowerNode = node && node.array[idx];
	    var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);

	    if (newLowerNode === lowerNode) {
	      return node;
	    }

	    newNode = editableVNode(node, ownerID);
	    newNode.array[idx] = newLowerNode;
	    return newNode;
	  }

	  if (nodeHas && node.array[idx] === value) {
	    return node;
	  }

	  if (didAlter) {
	    SetRef(didAlter);
	  }

	  newNode = editableVNode(node, ownerID);

	  if (value === undefined && idx === newNode.array.length - 1) {
	    newNode.array.pop();
	  } else {
	    newNode.array[idx] = value;
	  }

	  return newNode;
	}

	function editableVNode(node, ownerID) {
	  if (ownerID && node && ownerID === node.ownerID) {
	    return node;
	  }

	  return new VNode(node ? node.array.slice() : [], ownerID);
	}

	function listNodeFor(list, rawIndex) {
	  if (rawIndex >= getTailOffset(list._capacity)) {
	    return list._tail;
	  }

	  if (rawIndex < 1 << list._level + SHIFT) {
	    var node = list._root;
	    var level = list._level;

	    while (node && level > 0) {
	      node = node.array[rawIndex >>> level & MASK];
	      level -= SHIFT;
	    }

	    return node;
	  }
	}

	function setListBounds(list, begin, end) {
	  // Sanitize begin & end using this shorthand for ToInt32(argument)
	  // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	  if (begin !== undefined) {
	    begin |= 0;
	  }

	  if (end !== undefined) {
	    end |= 0;
	  }

	  var owner = list.__ownerID || new OwnerID();
	  var oldOrigin = list._origin;
	  var oldCapacity = list._capacity;
	  var newOrigin = oldOrigin + begin;
	  var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;

	  if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	    return list;
	  } // If it's going to end after it starts, it's empty.


	  if (newOrigin >= newCapacity) {
	    return list.clear();
	  }

	  var newLevel = list._level;
	  var newRoot = list._root; // New origin might need creating a higher root.

	  var offsetShift = 0;

	  while (newOrigin + offsetShift < 0) {
	    newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	    newLevel += SHIFT;
	    offsetShift += 1 << newLevel;
	  }

	  if (offsetShift) {
	    newOrigin += offsetShift;
	    oldOrigin += offsetShift;
	    newCapacity += offsetShift;
	    oldCapacity += offsetShift;
	  }

	  var oldTailOffset = getTailOffset(oldCapacity);
	  var newTailOffset = getTailOffset(newCapacity); // New size might need creating a higher root.

	  while (newTailOffset >= 1 << newLevel + SHIFT) {
	    newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	    newLevel += SHIFT;
	  } // Locate or create the new tail.


	  var oldTail = list._tail;
	  var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail; // Merge Tail into tree.

	  if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	    newRoot = editableVNode(newRoot, owner);
	    var node = newRoot;

	    for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	      var idx = oldTailOffset >>> level & MASK;
	      node = node.array[idx] = editableVNode(node.array[idx], owner);
	    }

	    node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
	  } // If the size has been reduced, there's a chance the tail needs to be trimmed.


	  if (newCapacity < oldCapacity) {
	    newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	  } // If the new origin is within the tail, then we do not need a root.


	  if (newOrigin >= newTailOffset) {
	    newOrigin -= newTailOffset;
	    newCapacity -= newTailOffset;
	    newLevel = SHIFT;
	    newRoot = null;
	    newTail = newTail && newTail.removeBefore(owner, 0, newOrigin); // Otherwise, if the root has been trimmed, garbage collect.
	  } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	    offsetShift = 0; // Identify the new top root node of the subtree of the old root.

	    while (newRoot) {
	      var beginIndex = newOrigin >>> newLevel & MASK;

	      if (beginIndex !== newTailOffset >>> newLevel & MASK) {
	        break;
	      }

	      if (beginIndex) {
	        offsetShift += (1 << newLevel) * beginIndex;
	      }

	      newLevel -= SHIFT;
	      newRoot = newRoot.array[beginIndex];
	    } // Trim the new sides of the new root.


	    if (newRoot && newOrigin > oldOrigin) {
	      newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	    }

	    if (newRoot && newTailOffset < oldTailOffset) {
	      newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	    }

	    if (offsetShift) {
	      newOrigin -= offsetShift;
	      newCapacity -= offsetShift;
	    }
	  }

	  if (list.__ownerID) {
	    list.size = newCapacity - newOrigin;
	    list._origin = newOrigin;
	    list._capacity = newCapacity;
	    list._level = newLevel;
	    list._root = newRoot;
	    list._tail = newTail;
	    list.__hash = undefined;
	    list.__altered = true;
	    return list;
	  }

	  return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	}

	function getTailOffset(size) {
	  return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
	}

	var OrderedMap =
	/*@__PURE__*/
	function (Map$$1) {
	  function OrderedMap(value) {
	    return value === null || value === undefined ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function (map) {
	      var iter = KeyedCollection(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v, k) {
	        return map.set(k, v);
	      });
	    });
	  }

	  if (Map$$1) OrderedMap.__proto__ = Map$$1;
	  OrderedMap.prototype = Object.create(Map$$1 && Map$$1.prototype);
	  OrderedMap.prototype.constructor = OrderedMap;

	  OrderedMap.of = function of()
	  /*...values*/
	  {
	    return this(arguments);
	  };

	  OrderedMap.prototype.toString = function toString() {
	    return this.__toString('OrderedMap {', '}');
	  }; // @pragma Access


	  OrderedMap.prototype.get = function get(k, notSetValue) {
	    var index = this._map.get(k);

	    return index !== undefined ? this._list.get(index)[1] : notSetValue;
	  }; // @pragma Modification


	  OrderedMap.prototype.clear = function clear() {
	    if (this.size === 0) {
	      return this;
	    }

	    if (this.__ownerID) {
	      this.size = 0;

	      this._map.clear();

	      this._list.clear();

	      return this;
	    }

	    return emptyOrderedMap();
	  };

	  OrderedMap.prototype.set = function set(k, v) {
	    return updateOrderedMap(this, k, v);
	  };

	  OrderedMap.prototype.remove = function remove(k) {
	    return updateOrderedMap(this, k, NOT_SET);
	  };

	  OrderedMap.prototype.wasAltered = function wasAltered() {
	    return this._map.wasAltered() || this._list.wasAltered();
	  };

	  OrderedMap.prototype.__iterate = function __iterate(fn, reverse) {
	    var this$1 = this;
	    return this._list.__iterate(function (entry) {
	      return entry && fn(entry[1], entry[0], this$1);
	    }, reverse);
	  };

	  OrderedMap.prototype.__iterator = function __iterator(type, reverse) {
	    return this._list.fromEntrySeq().__iterator(type, reverse);
	  };

	  OrderedMap.prototype.__ensureOwner = function __ensureOwner(ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }

	    var newMap = this._map.__ensureOwner(ownerID);

	    var newList = this._list.__ensureOwner(ownerID);

	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyOrderedMap();
	      }

	      this.__ownerID = ownerID;
	      this._map = newMap;
	      this._list = newList;
	      return this;
	    }

	    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	  };

	  return OrderedMap;
	}(Map$1);

	OrderedMap.isOrderedMap = isOrderedMap;
	OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
	OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

	function makeOrderedMap(map, list, ownerID, hash) {
	  var omap = Object.create(OrderedMap.prototype);
	  omap.size = map ? map.size : 0;
	  omap._map = map;
	  omap._list = list;
	  omap.__ownerID = ownerID;
	  omap.__hash = hash;
	  return omap;
	}

	var EMPTY_ORDERED_MAP;

	function emptyOrderedMap() {
	  return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	}

	function updateOrderedMap(omap, k, v) {
	  var map = omap._map;
	  var list = omap._list;
	  var i = map.get(k);
	  var has = i !== undefined;
	  var newMap;
	  var newList;

	  if (v === NOT_SET) {
	    // removed
	    if (!has) {
	      return omap;
	    }

	    if (list.size >= SIZE && list.size >= map.size * 2) {
	      newList = list.filter(function (entry, idx) {
	        return entry !== undefined && i !== idx;
	      });
	      newMap = newList.toKeyedSeq().map(function (entry) {
	        return entry[0];
	      }).flip().toMap();

	      if (omap.__ownerID) {
	        newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	      }
	    } else {
	      newMap = map.remove(k);
	      newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	    }
	  } else if (has) {
	    if (v === list.get(i)[1]) {
	      return omap;
	    }

	    newMap = map;
	    newList = list.set(i, [k, v]);
	  } else {
	    newMap = map.set(k, list.size);
	    newList = list.set(list.size, [k, v]);
	  }

	  if (omap.__ownerID) {
	    omap.size = newMap.size;
	    omap._map = newMap;
	    omap._list = newList;
	    omap.__hash = undefined;
	    return omap;
	  }

	  return makeOrderedMap(newMap, newList);
	}

	var IS_STACK_SYMBOL = '@@__IMMUTABLE_STACK__@@';

	function isStack(maybeStack) {
	  return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
	}

	var Stack =
	/*@__PURE__*/
	function (IndexedCollection$$1) {
	  function Stack(value) {
	    return value === null || value === undefined ? emptyStack() : isStack(value) ? value : emptyStack().pushAll(value);
	  }

	  if (IndexedCollection$$1) Stack.__proto__ = IndexedCollection$$1;
	  Stack.prototype = Object.create(IndexedCollection$$1 && IndexedCollection$$1.prototype);
	  Stack.prototype.constructor = Stack;

	  Stack.of = function of()
	  /*...values*/
	  {
	    return this(arguments);
	  };

	  Stack.prototype.toString = function toString() {
	    return this.__toString('Stack [', ']');
	  }; // @pragma Access


	  Stack.prototype.get = function get(index, notSetValue) {
	    var head = this._head;
	    index = wrapIndex(this, index);

	    while (head && index--) {
	      head = head.next;
	    }

	    return head ? head.value : notSetValue;
	  };

	  Stack.prototype.peek = function peek() {
	    return this._head && this._head.value;
	  }; // @pragma Modification


	  Stack.prototype.push = function push()
	  /*...values*/
	  {
	    var arguments$1 = arguments;

	    if (arguments.length === 0) {
	      return this;
	    }

	    var newSize = this.size + arguments.length;
	    var head = this._head;

	    for (var ii = arguments.length - 1; ii >= 0; ii--) {
	      head = {
	        value: arguments$1[ii],
	        next: head
	      };
	    }

	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }

	    return makeStack(newSize, head);
	  };

	  Stack.prototype.pushAll = function pushAll(iter) {
	    iter = IndexedCollection$$1(iter);

	    if (iter.size === 0) {
	      return this;
	    }

	    if (this.size === 0 && isStack(iter)) {
	      return iter;
	    }

	    assertNotInfinite(iter.size);
	    var newSize = this.size;
	    var head = this._head;

	    iter.__iterate(function (value) {
	      newSize++;
	      head = {
	        value: value,
	        next: head
	      };
	    },
	    /* reverse */
	    true);

	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }

	    return makeStack(newSize, head);
	  };

	  Stack.prototype.pop = function pop() {
	    return this.slice(1);
	  };

	  Stack.prototype.clear = function clear() {
	    if (this.size === 0) {
	      return this;
	    }

	    if (this.__ownerID) {
	      this.size = 0;
	      this._head = undefined;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }

	    return emptyStack();
	  };

	  Stack.prototype.slice = function slice(begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }

	    var resolvedBegin = resolveBegin(begin, this.size);
	    var resolvedEnd = resolveEnd(end, this.size);

	    if (resolvedEnd !== this.size) {
	      // super.slice(begin, end);
	      return IndexedCollection$$1.prototype.slice.call(this, begin, end);
	    }

	    var newSize = this.size - resolvedBegin;
	    var head = this._head;

	    while (resolvedBegin--) {
	      head = head.next;
	    }

	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }

	    return makeStack(newSize, head);
	  }; // @pragma Mutability


	  Stack.prototype.__ensureOwner = function __ensureOwner(ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }

	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyStack();
	      }

	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }

	    return makeStack(this.size, this._head, ownerID, this.__hash);
	  }; // @pragma Iteration


	  Stack.prototype.__iterate = function __iterate(fn, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return new ArraySeq(this.toArray()).__iterate(function (v, k) {
	        return fn(v, k, this$1);
	      }, reverse);
	    }

	    var iterations = 0;
	    var node = this._head;

	    while (node) {
	      if (fn(node.value, iterations++, this) === false) {
	        break;
	      }

	      node = node.next;
	    }

	    return iterations;
	  };

	  Stack.prototype.__iterator = function __iterator(type, reverse) {
	    if (reverse) {
	      return new ArraySeq(this.toArray()).__iterator(type, reverse);
	    }

	    var iterations = 0;
	    var node = this._head;
	    return new Iterator(function () {
	      if (node) {
	        var value = node.value;
	        node = node.next;
	        return iteratorValue(type, iterations++, value);
	      }

	      return iteratorDone();
	    });
	  };

	  return Stack;
	}(IndexedCollection);

	Stack.isStack = isStack;
	var StackPrototype = Stack.prototype;
	StackPrototype[IS_STACK_SYMBOL] = true;
	StackPrototype.shift = StackPrototype.pop;
	StackPrototype.unshift = StackPrototype.push;
	StackPrototype.unshiftAll = StackPrototype.pushAll;
	StackPrototype.withMutations = withMutations;
	StackPrototype.wasAltered = wasAltered;
	StackPrototype.asImmutable = asImmutable;
	StackPrototype['@@transducer/init'] = StackPrototype.asMutable = asMutable;

	StackPrototype['@@transducer/step'] = function (result, arr) {
	  return result.unshift(arr);
	};

	StackPrototype['@@transducer/result'] = function (obj) {
	  return obj.asImmutable();
	};

	function makeStack(size, head, ownerID, hash) {
	  var map = Object.create(StackPrototype);
	  map.size = size;
	  map._head = head;
	  map.__ownerID = ownerID;
	  map.__hash = hash;
	  map.__altered = false;
	  return map;
	}

	var EMPTY_STACK;

	function emptyStack() {
	  return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	}

	var IS_SET_SYMBOL = '@@__IMMUTABLE_SET__@@';

	function isSet(maybeSet) {
	  return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
	}

	function isOrderedSet(maybeOrderedSet) {
	  return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	}

	function deepEqual(a, b) {
	  if (a === b) {
	    return true;
	  }

	  if (!isCollection(b) || a.size !== undefined && b.size !== undefined && a.size !== b.size || a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
	    return false;
	  }

	  if (a.size === 0 && b.size === 0) {
	    return true;
	  }

	  var notAssociative = !isAssociative(a);

	  if (isOrdered(a)) {
	    var entries = a.entries();
	    return b.every(function (v, k) {
	      var entry = entries.next().value;
	      return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	    }) && entries.next().done;
	  }

	  var flipped = false;

	  if (a.size === undefined) {
	    if (b.size === undefined) {
	      if (typeof a.cacheResult === 'function') {
	        a.cacheResult();
	      }
	    } else {
	      flipped = true;
	      var _ = a;
	      a = b;
	      b = _;
	    }
	  }

	  var allEqual = true;

	  var bSize = b.__iterate(function (v, k) {
	    if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	      allEqual = false;
	      return false;
	    }
	  });

	  return allEqual && a.size === bSize;
	}
	/**
	 * Contributes additional methods to a constructor
	 */


	function mixin(ctor, methods) {
	  var keyCopier = function (key) {
	    ctor.prototype[key] = methods[key];
	  };

	  Object.keys(methods).forEach(keyCopier);
	  Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	  return ctor;
	}

	function toJS(value) {
	  if (!value || typeof value !== 'object') {
	    return value;
	  }

	  if (!isCollection(value)) {
	    if (!isDataStructure(value)) {
	      return value;
	    }

	    value = Seq(value);
	  }

	  if (isKeyed(value)) {
	    var result$1 = {};

	    value.__iterate(function (v, k) {
	      result$1[k] = toJS(v);
	    });

	    return result$1;
	  }

	  var result = [];

	  value.__iterate(function (v) {
	    result.push(toJS(v));
	  });

	  return result;
	}

	var Set$1 =
	/*@__PURE__*/
	function (SetCollection$$1) {
	  function Set(value) {
	    return value === null || value === undefined ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function (set) {
	      var iter = SetCollection$$1(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v) {
	        return set.add(v);
	      });
	    });
	  }

	  if (SetCollection$$1) Set.__proto__ = SetCollection$$1;
	  Set.prototype = Object.create(SetCollection$$1 && SetCollection$$1.prototype);
	  Set.prototype.constructor = Set;

	  Set.of = function of()
	  /*...values*/
	  {
	    return this(arguments);
	  };

	  Set.fromKeys = function fromKeys(value) {
	    return this(KeyedCollection(value).keySeq());
	  };

	  Set.intersect = function intersect(sets) {
	    sets = Collection(sets).toArray();
	    return sets.length ? SetPrototype.intersect.apply(Set(sets.pop()), sets) : emptySet();
	  };

	  Set.union = function union(sets) {
	    sets = Collection(sets).toArray();
	    return sets.length ? SetPrototype.union.apply(Set(sets.pop()), sets) : emptySet();
	  };

	  Set.prototype.toString = function toString() {
	    return this.__toString('Set {', '}');
	  }; // @pragma Access


	  Set.prototype.has = function has(value) {
	    return this._map.has(value);
	  }; // @pragma Modification


	  Set.prototype.add = function add(value) {
	    return updateSet(this, this._map.set(value, value));
	  };

	  Set.prototype.remove = function remove(value) {
	    return updateSet(this, this._map.remove(value));
	  };

	  Set.prototype.clear = function clear() {
	    return updateSet(this, this._map.clear());
	  }; // @pragma Composition


	  Set.prototype.map = function map(mapper, context) {
	    var this$1 = this;
	    var removes = [];
	    var adds = [];
	    this.forEach(function (value) {
	      var mapped = mapper.call(context, value, value, this$1);

	      if (mapped !== value) {
	        removes.push(value);
	        adds.push(mapped);
	      }
	    });
	    return this.withMutations(function (set) {
	      removes.forEach(function (value) {
	        return set.remove(value);
	      });
	      adds.forEach(function (value) {
	        return set.add(value);
	      });
	    });
	  };

	  Set.prototype.union = function union() {
	    var iters = [],
	        len = arguments.length;

	    while (len--) iters[len] = arguments[len];

	    iters = iters.filter(function (x) {
	      return x.size !== 0;
	    });

	    if (iters.length === 0) {
	      return this;
	    }

	    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	      return this.constructor(iters[0]);
	    }

	    return this.withMutations(function (set) {
	      for (var ii = 0; ii < iters.length; ii++) {
	        SetCollection$$1(iters[ii]).forEach(function (value) {
	          return set.add(value);
	        });
	      }
	    });
	  };

	  Set.prototype.intersect = function intersect() {
	    var iters = [],
	        len = arguments.length;

	    while (len--) iters[len] = arguments[len];

	    if (iters.length === 0) {
	      return this;
	    }

	    iters = iters.map(function (iter) {
	      return SetCollection$$1(iter);
	    });
	    var toRemove = [];
	    this.forEach(function (value) {
	      if (!iters.every(function (iter) {
	        return iter.includes(value);
	      })) {
	        toRemove.push(value);
	      }
	    });
	    return this.withMutations(function (set) {
	      toRemove.forEach(function (value) {
	        set.remove(value);
	      });
	    });
	  };

	  Set.prototype.subtract = function subtract() {
	    var iters = [],
	        len = arguments.length;

	    while (len--) iters[len] = arguments[len];

	    if (iters.length === 0) {
	      return this;
	    }

	    iters = iters.map(function (iter) {
	      return SetCollection$$1(iter);
	    });
	    var toRemove = [];
	    this.forEach(function (value) {
	      if (iters.some(function (iter) {
	        return iter.includes(value);
	      })) {
	        toRemove.push(value);
	      }
	    });
	    return this.withMutations(function (set) {
	      toRemove.forEach(function (value) {
	        set.remove(value);
	      });
	    });
	  };

	  Set.prototype.sort = function sort(comparator) {
	    // Late binding
	    return OrderedSet(sortFactory(this, comparator));
	  };

	  Set.prototype.sortBy = function sortBy(mapper, comparator) {
	    // Late binding
	    return OrderedSet(sortFactory(this, comparator, mapper));
	  };

	  Set.prototype.wasAltered = function wasAltered() {
	    return this._map.wasAltered();
	  };

	  Set.prototype.__iterate = function __iterate(fn, reverse) {
	    var this$1 = this;
	    return this._map.__iterate(function (k) {
	      return fn(k, k, this$1);
	    }, reverse);
	  };

	  Set.prototype.__iterator = function __iterator(type, reverse) {
	    return this._map.__iterator(type, reverse);
	  };

	  Set.prototype.__ensureOwner = function __ensureOwner(ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }

	    var newMap = this._map.__ensureOwner(ownerID);

	    if (!ownerID) {
	      if (this.size === 0) {
	        return this.__empty();
	      }

	      this.__ownerID = ownerID;
	      this._map = newMap;
	      return this;
	    }

	    return this.__make(newMap, ownerID);
	  };

	  return Set;
	}(SetCollection);

	Set$1.isSet = isSet;
	var SetPrototype = Set$1.prototype;
	SetPrototype[IS_SET_SYMBOL] = true;
	SetPrototype[DELETE] = SetPrototype.remove;
	SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
	SetPrototype.withMutations = withMutations;
	SetPrototype.asImmutable = asImmutable;
	SetPrototype['@@transducer/init'] = SetPrototype.asMutable = asMutable;

	SetPrototype['@@transducer/step'] = function (result, arr) {
	  return result.add(arr);
	};

	SetPrototype['@@transducer/result'] = function (obj) {
	  return obj.asImmutable();
	};

	SetPrototype.__empty = emptySet;
	SetPrototype.__make = makeSet;

	function updateSet(set, newMap) {
	  if (set.__ownerID) {
	    set.size = newMap.size;
	    set._map = newMap;
	    return set;
	  }

	  return newMap === set._map ? set : newMap.size === 0 ? set.__empty() : set.__make(newMap);
	}

	function makeSet(map, ownerID) {
	  var set = Object.create(SetPrototype);
	  set.size = map ? map.size : 0;
	  set._map = map;
	  set.__ownerID = ownerID;
	  return set;
	}

	var EMPTY_SET;

	function emptySet() {
	  return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	}
	/**
	 * Returns a lazy seq of nums from start (inclusive) to end
	 * (exclusive), by step, where start defaults to 0, step to 1, and end to
	 * infinity. When start is equal to end, returns empty list.
	 */


	var Range =
	/*@__PURE__*/
	function (IndexedSeq$$1) {
	  function Range(start, end, step) {
	    if (!(this instanceof Range)) {
	      return new Range(start, end, step);
	    }

	    invariant(step !== 0, 'Cannot step a Range by 0');
	    start = start || 0;

	    if (end === undefined) {
	      end = Infinity;
	    }

	    step = step === undefined ? 1 : Math.abs(step);

	    if (end < start) {
	      step = -step;
	    }

	    this._start = start;
	    this._end = end;
	    this._step = step;
	    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);

	    if (this.size === 0) {
	      if (EMPTY_RANGE) {
	        return EMPTY_RANGE;
	      }

	      EMPTY_RANGE = this;
	    }
	  }

	  if (IndexedSeq$$1) Range.__proto__ = IndexedSeq$$1;
	  Range.prototype = Object.create(IndexedSeq$$1 && IndexedSeq$$1.prototype);
	  Range.prototype.constructor = Range;

	  Range.prototype.toString = function toString() {
	    if (this.size === 0) {
	      return 'Range []';
	    }

	    return 'Range [ ' + this._start + '...' + this._end + (this._step !== 1 ? ' by ' + this._step : '') + ' ]';
	  };

	  Range.prototype.get = function get(index, notSetValue) {
	    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
	  };

	  Range.prototype.includes = function includes(searchValue) {
	    var possibleIndex = (searchValue - this._start) / this._step;
	    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
	  };

	  Range.prototype.slice = function slice(begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }

	    begin = resolveBegin(begin, this.size);
	    end = resolveEnd(end, this.size);

	    if (end <= begin) {
	      return new Range(0, 0);
	    }

	    return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	  };

	  Range.prototype.indexOf = function indexOf(searchValue) {
	    var offsetValue = searchValue - this._start;

	    if (offsetValue % this._step === 0) {
	      var index = offsetValue / this._step;

	      if (index >= 0 && index < this.size) {
	        return index;
	      }
	    }

	    return -1;
	  };

	  Range.prototype.lastIndexOf = function lastIndexOf(searchValue) {
	    return this.indexOf(searchValue);
	  };

	  Range.prototype.__iterate = function __iterate(fn, reverse) {
	    var size = this.size;
	    var step = this._step;
	    var value = reverse ? this._start + (size - 1) * step : this._start;
	    var i = 0;

	    while (i !== size) {
	      if (fn(value, reverse ? size - ++i : i++, this) === false) {
	        break;
	      }

	      value += reverse ? -step : step;
	    }

	    return i;
	  };

	  Range.prototype.__iterator = function __iterator(type, reverse) {
	    var size = this.size;
	    var step = this._step;
	    var value = reverse ? this._start + (size - 1) * step : this._start;
	    var i = 0;
	    return new Iterator(function () {
	      if (i === size) {
	        return iteratorDone();
	      }

	      var v = value;
	      value += reverse ? -step : step;
	      return iteratorValue(type, reverse ? size - ++i : i++, v);
	    });
	  };

	  Range.prototype.equals = function equals(other) {
	    return other instanceof Range ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
	  };

	  return Range;
	}(IndexedSeq);

	var EMPTY_RANGE;

	function getIn(collection, searchKeyPath, notSetValue) {
	  var keyPath = coerceKeyPath(searchKeyPath);
	  var i = 0;

	  while (i !== keyPath.length) {
	    collection = get(collection, keyPath[i++], NOT_SET);

	    if (collection === NOT_SET) {
	      return notSetValue;
	    }
	  }

	  return collection;
	}

	function getIn$1(searchKeyPath, notSetValue) {
	  return getIn(this, searchKeyPath, notSetValue);
	}

	function hasIn(collection, keyPath) {
	  return getIn(collection, keyPath, NOT_SET) !== NOT_SET;
	}

	function hasIn$1(searchKeyPath) {
	  return hasIn(this, searchKeyPath);
	}

	function toObject() {
	  assertNotInfinite(this.size);
	  var object = {};

	  this.__iterate(function (v, k) {
	    object[k] = v;
	  });

	  return object;
	} // Note: all of these methods are deprecated.


	Collection.isIterable = isCollection;
	Collection.isKeyed = isKeyed;
	Collection.isIndexed = isIndexed;
	Collection.isAssociative = isAssociative;
	Collection.isOrdered = isOrdered;
	Collection.Iterator = Iterator;
	mixin(Collection, {
	  // ### Conversion to other types
	  toArray: function toArray() {
	    assertNotInfinite(this.size);
	    var array = new Array(this.size || 0);
	    var useTuples = isKeyed(this);
	    var i = 0;

	    this.__iterate(function (v, k) {
	      // Keyed collections produce an array of tuples.
	      array[i++] = useTuples ? [k, v] : v;
	    });

	    return array;
	  },
	  toIndexedSeq: function toIndexedSeq() {
	    return new ToIndexedSequence(this);
	  },
	  toJS: function toJS$1() {
	    return toJS(this);
	  },
	  toKeyedSeq: function toKeyedSeq() {
	    return new ToKeyedSequence(this, true);
	  },
	  toMap: function toMap() {
	    // Use Late Binding here to solve the circular dependency.
	    return Map$1(this.toKeyedSeq());
	  },
	  toObject: toObject,
	  toOrderedMap: function toOrderedMap() {
	    // Use Late Binding here to solve the circular dependency.
	    return OrderedMap(this.toKeyedSeq());
	  },
	  toOrderedSet: function toOrderedSet() {
	    // Use Late Binding here to solve the circular dependency.
	    return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	  },
	  toSet: function toSet() {
	    // Use Late Binding here to solve the circular dependency.
	    return Set$1(isKeyed(this) ? this.valueSeq() : this);
	  },
	  toSetSeq: function toSetSeq() {
	    return new ToSetSequence(this);
	  },
	  toSeq: function toSeq() {
	    return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
	  },
	  toStack: function toStack() {
	    // Use Late Binding here to solve the circular dependency.
	    return Stack(isKeyed(this) ? this.valueSeq() : this);
	  },
	  toList: function toList() {
	    // Use Late Binding here to solve the circular dependency.
	    return List(isKeyed(this) ? this.valueSeq() : this);
	  },
	  // ### Common JavaScript methods and properties
	  toString: function toString() {
	    return '[Collection]';
	  },
	  __toString: function __toString(head, tail) {
	    if (this.size === 0) {
	      return head + tail;
	    }

	    return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	  },
	  // ### ES6 Collection methods (ES6 Array and Map)
	  concat: function concat() {
	    var values = [],
	        len = arguments.length;

	    while (len--) values[len] = arguments[len];

	    return reify(this, concatFactory(this, values));
	  },
	  includes: function includes(searchValue) {
	    return this.some(function (value) {
	      return is(value, searchValue);
	    });
	  },
	  entries: function entries() {
	    return this.__iterator(ITERATE_ENTRIES);
	  },
	  every: function every(predicate, context) {
	    assertNotInfinite(this.size);
	    var returnValue = true;

	    this.__iterate(function (v, k, c) {
	      if (!predicate.call(context, v, k, c)) {
	        returnValue = false;
	        return false;
	      }
	    });

	    return returnValue;
	  },
	  filter: function filter(predicate, context) {
	    return reify(this, filterFactory(this, predicate, context, true));
	  },
	  find: function find(predicate, context, notSetValue) {
	    var entry = this.findEntry(predicate, context);
	    return entry ? entry[1] : notSetValue;
	  },
	  forEach: function forEach(sideEffect, context) {
	    assertNotInfinite(this.size);
	    return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	  },
	  join: function join(separator) {
	    assertNotInfinite(this.size);
	    separator = separator !== undefined ? '' + separator : ',';
	    var joined = '';
	    var isFirst = true;

	    this.__iterate(function (v) {
	      isFirst ? isFirst = false : joined += separator;
	      joined += v !== null && v !== undefined ? v.toString() : '';
	    });

	    return joined;
	  },
	  keys: function keys() {
	    return this.__iterator(ITERATE_KEYS);
	  },
	  map: function map(mapper, context) {
	    return reify(this, mapFactory(this, mapper, context));
	  },
	  reduce: function reduce$1(reducer, initialReduction, context) {
	    return reduce(this, reducer, initialReduction, context, arguments.length < 2, false);
	  },
	  reduceRight: function reduceRight(reducer, initialReduction, context) {
	    return reduce(this, reducer, initialReduction, context, arguments.length < 2, true);
	  },
	  reverse: function reverse() {
	    return reify(this, reverseFactory(this, true));
	  },
	  slice: function slice(begin, end) {
	    return reify(this, sliceFactory(this, begin, end, true));
	  },
	  some: function some(predicate, context) {
	    return !this.every(not(predicate), context);
	  },
	  sort: function sort(comparator) {
	    return reify(this, sortFactory(this, comparator));
	  },
	  values: function values() {
	    return this.__iterator(ITERATE_VALUES);
	  },
	  // ### More sequential methods
	  butLast: function butLast() {
	    return this.slice(0, -1);
	  },
	  isEmpty: function isEmpty() {
	    return this.size !== undefined ? this.size === 0 : !this.some(function () {
	      return true;
	    });
	  },
	  count: function count(predicate, context) {
	    return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
	  },
	  countBy: function countBy(grouper, context) {
	    return countByFactory(this, grouper, context);
	  },
	  equals: function equals(other) {
	    return deepEqual(this, other);
	  },
	  entrySeq: function entrySeq() {
	    var collection = this;

	    if (collection._cache) {
	      // We cache as an entries array, so we can just return the cache!
	      return new ArraySeq(collection._cache);
	    }

	    var entriesSequence = collection.toSeq().map(entryMapper).toIndexedSeq();

	    entriesSequence.fromEntrySeq = function () {
	      return collection.toSeq();
	    };

	    return entriesSequence;
	  },
	  filterNot: function filterNot(predicate, context) {
	    return this.filter(not(predicate), context);
	  },
	  findEntry: function findEntry(predicate, context, notSetValue) {
	    var found = notSetValue;

	    this.__iterate(function (v, k, c) {
	      if (predicate.call(context, v, k, c)) {
	        found = [k, v];
	        return false;
	      }
	    });

	    return found;
	  },
	  findKey: function findKey(predicate, context) {
	    var entry = this.findEntry(predicate, context);
	    return entry && entry[0];
	  },
	  findLast: function findLast(predicate, context, notSetValue) {
	    return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	  },
	  findLastEntry: function findLastEntry(predicate, context, notSetValue) {
	    return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
	  },
	  findLastKey: function findLastKey(predicate, context) {
	    return this.toKeyedSeq().reverse().findKey(predicate, context);
	  },
	  first: function first(notSetValue) {
	    return this.find(returnTrue, null, notSetValue);
	  },
	  flatMap: function flatMap(mapper, context) {
	    return reify(this, flatMapFactory(this, mapper, context));
	  },
	  flatten: function flatten(depth) {
	    return reify(this, flattenFactory(this, depth, true));
	  },
	  fromEntrySeq: function fromEntrySeq() {
	    return new FromEntriesSequence(this);
	  },
	  get: function get(searchKey, notSetValue) {
	    return this.find(function (_, key) {
	      return is(key, searchKey);
	    }, undefined, notSetValue);
	  },
	  getIn: getIn$1,
	  groupBy: function groupBy(grouper, context) {
	    return groupByFactory(this, grouper, context);
	  },
	  has: function has(searchKey) {
	    return this.get(searchKey, NOT_SET) !== NOT_SET;
	  },
	  hasIn: hasIn$1,
	  isSubset: function isSubset(iter) {
	    iter = typeof iter.includes === 'function' ? iter : Collection(iter);
	    return this.every(function (value) {
	      return iter.includes(value);
	    });
	  },
	  isSuperset: function isSuperset(iter) {
	    iter = typeof iter.isSubset === 'function' ? iter : Collection(iter);
	    return iter.isSubset(this);
	  },
	  keyOf: function keyOf(searchValue) {
	    return this.findKey(function (value) {
	      return is(value, searchValue);
	    });
	  },
	  keySeq: function keySeq() {
	    return this.toSeq().map(keyMapper).toIndexedSeq();
	  },
	  last: function last(notSetValue) {
	    return this.toSeq().reverse().first(notSetValue);
	  },
	  lastKeyOf: function lastKeyOf(searchValue) {
	    return this.toKeyedSeq().reverse().keyOf(searchValue);
	  },
	  max: function max(comparator) {
	    return maxFactory(this, comparator);
	  },
	  maxBy: function maxBy(mapper, comparator) {
	    return maxFactory(this, comparator, mapper);
	  },
	  min: function min(comparator) {
	    return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	  },
	  minBy: function minBy(mapper, comparator) {
	    return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	  },
	  rest: function rest() {
	    return this.slice(1);
	  },
	  skip: function skip(amount) {
	    return amount === 0 ? this : this.slice(Math.max(0, amount));
	  },
	  skipLast: function skipLast(amount) {
	    return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
	  },
	  skipWhile: function skipWhile(predicate, context) {
	    return reify(this, skipWhileFactory(this, predicate, context, true));
	  },
	  skipUntil: function skipUntil(predicate, context) {
	    return this.skipWhile(not(predicate), context);
	  },
	  sortBy: function sortBy(mapper, comparator) {
	    return reify(this, sortFactory(this, comparator, mapper));
	  },
	  take: function take(amount) {
	    return this.slice(0, Math.max(0, amount));
	  },
	  takeLast: function takeLast(amount) {
	    return this.slice(-Math.max(0, amount));
	  },
	  takeWhile: function takeWhile(predicate, context) {
	    return reify(this, takeWhileFactory(this, predicate, context));
	  },
	  takeUntil: function takeUntil(predicate, context) {
	    return this.takeWhile(not(predicate), context);
	  },
	  update: function update(fn) {
	    return fn(this);
	  },
	  valueSeq: function valueSeq() {
	    return this.toIndexedSeq();
	  },
	  // ### Hashable Object
	  hashCode: function hashCode() {
	    return this.__hash || (this.__hash = hashCollection(this));
	  } // ### Internal
	  // abstract __iterate(fn, reverse)
	  // abstract __iterator(type, reverse)

	});
	var CollectionPrototype = Collection.prototype;
	CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
	CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
	CollectionPrototype.toJSON = CollectionPrototype.toArray;
	CollectionPrototype.__toStringMapper = quoteString;

	CollectionPrototype.inspect = CollectionPrototype.toSource = function () {
	  return this.toString();
	};

	CollectionPrototype.chain = CollectionPrototype.flatMap;
	CollectionPrototype.contains = CollectionPrototype.includes;
	mixin(KeyedCollection, {
	  // ### More sequential methods
	  flip: function flip() {
	    return reify(this, flipFactory(this));
	  },
	  mapEntries: function mapEntries(mapper, context) {
	    var this$1 = this;
	    var iterations = 0;
	    return reify(this, this.toSeq().map(function (v, k) {
	      return mapper.call(context, [k, v], iterations++, this$1);
	    }).fromEntrySeq());
	  },
	  mapKeys: function mapKeys(mapper, context) {
	    var this$1 = this;
	    return reify(this, this.toSeq().flip().map(function (k, v) {
	      return mapper.call(context, k, v, this$1);
	    }).flip());
	  }
	});
	var KeyedCollectionPrototype = KeyedCollection.prototype;
	KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
	KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
	KeyedCollectionPrototype.toJSON = toObject;

	KeyedCollectionPrototype.__toStringMapper = function (v, k) {
	  return quoteString(k) + ': ' + quoteString(v);
	};

	mixin(IndexedCollection, {
	  // ### Conversion to other types
	  toKeyedSeq: function toKeyedSeq() {
	    return new ToKeyedSequence(this, false);
	  },
	  // ### ES6 Collection methods (ES6 Array and Map)
	  filter: function filter(predicate, context) {
	    return reify(this, filterFactory(this, predicate, context, false));
	  },
	  findIndex: function findIndex(predicate, context) {
	    var entry = this.findEntry(predicate, context);
	    return entry ? entry[0] : -1;
	  },
	  indexOf: function indexOf(searchValue) {
	    var key = this.keyOf(searchValue);
	    return key === undefined ? -1 : key;
	  },
	  lastIndexOf: function lastIndexOf(searchValue) {
	    var key = this.lastKeyOf(searchValue);
	    return key === undefined ? -1 : key;
	  },
	  reverse: function reverse() {
	    return reify(this, reverseFactory(this, false));
	  },
	  slice: function slice(begin, end) {
	    return reify(this, sliceFactory(this, begin, end, false));
	  },
	  splice: function splice(index, removeNum
	  /*, ...values*/
	  ) {
	    var numArgs = arguments.length;
	    removeNum = Math.max(removeNum || 0, 0);

	    if (numArgs === 0 || numArgs === 2 && !removeNum) {
	      return this;
	    } // If index is negative, it should resolve relative to the size of the
	    // collection. However size may be expensive to compute if not cached, so
	    // only call count() if the number is in fact negative.


	    index = resolveBegin(index, index < 0 ? this.count() : this.size);
	    var spliced = this.slice(0, index);
	    return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
	  },
	  // ### More collection methods
	  findLastIndex: function findLastIndex(predicate, context) {
	    var entry = this.findLastEntry(predicate, context);
	    return entry ? entry[0] : -1;
	  },
	  first: function first(notSetValue) {
	    return this.get(0, notSetValue);
	  },
	  flatten: function flatten(depth) {
	    return reify(this, flattenFactory(this, depth, false));
	  },
	  get: function get(index, notSetValue) {
	    index = wrapIndex(this, index);
	    return index < 0 || this.size === Infinity || this.size !== undefined && index > this.size ? notSetValue : this.find(function (_, key) {
	      return key === index;
	    }, undefined, notSetValue);
	  },
	  has: function has(index) {
	    index = wrapIndex(this, index);
	    return index >= 0 && (this.size !== undefined ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
	  },
	  interpose: function interpose(separator) {
	    return reify(this, interposeFactory(this, separator));
	  },
	  interleave: function interleave()
	  /*...collections*/
	  {
	    var collections = [this].concat(arrCopy(arguments));
	    var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
	    var interleaved = zipped.flatten(true);

	    if (zipped.size) {
	      interleaved.size = zipped.size * collections.length;
	    }

	    return reify(this, interleaved);
	  },
	  keySeq: function keySeq() {
	    return Range(0, this.size);
	  },
	  last: function last(notSetValue) {
	    return this.get(-1, notSetValue);
	  },
	  skipWhile: function skipWhile(predicate, context) {
	    return reify(this, skipWhileFactory(this, predicate, context, false));
	  },
	  zip: function zip()
	  /*, ...collections */
	  {
	    var collections = [this].concat(arrCopy(arguments));
	    return reify(this, zipWithFactory(this, defaultZipper, collections));
	  },
	  zipAll: function zipAll()
	  /*, ...collections */
	  {
	    var collections = [this].concat(arrCopy(arguments));
	    return reify(this, zipWithFactory(this, defaultZipper, collections, true));
	  },
	  zipWith: function zipWith(zipper
	  /*, ...collections */
	  ) {
	    var collections = arrCopy(arguments);
	    collections[0] = this;
	    return reify(this, zipWithFactory(this, zipper, collections));
	  }
	});
	var IndexedCollectionPrototype = IndexedCollection.prototype;
	IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
	IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;
	mixin(SetCollection, {
	  // ### ES6 Collection methods (ES6 Array and Map)
	  get: function get(value, notSetValue) {
	    return this.has(value) ? value : notSetValue;
	  },
	  includes: function includes(value) {
	    return this.has(value);
	  },
	  // ### More sequential methods
	  keySeq: function keySeq() {
	    return this.valueSeq();
	  }
	});
	SetCollection.prototype.has = CollectionPrototype.includes;
	SetCollection.prototype.contains = SetCollection.prototype.includes; // Mixin subclasses

	mixin(KeyedSeq, KeyedCollection.prototype);
	mixin(IndexedSeq, IndexedCollection.prototype);
	mixin(SetSeq, SetCollection.prototype); // #pragma Helper functions

	function reduce(collection, reducer, reduction, context, useFirst, reverse) {
	  assertNotInfinite(collection.size);

	  collection.__iterate(function (v, k, c) {
	    if (useFirst) {
	      useFirst = false;
	      reduction = v;
	    } else {
	      reduction = reducer.call(context, reduction, v, k, c);
	    }
	  }, reverse);

	  return reduction;
	}

	function keyMapper(v, k) {
	  return k;
	}

	function entryMapper(v, k) {
	  return [k, v];
	}

	function not(predicate) {
	  return function () {
	    return !predicate.apply(this, arguments);
	  };
	}

	function neg(predicate) {
	  return function () {
	    return -predicate.apply(this, arguments);
	  };
	}

	function defaultZipper() {
	  return arrCopy(arguments);
	}

	function defaultNegComparator(a, b) {
	  return a < b ? 1 : a > b ? -1 : 0;
	}

	function hashCollection(collection) {
	  if (collection.size === Infinity) {
	    return 0;
	  }

	  var ordered = isOrdered(collection);
	  var keyed = isKeyed(collection);
	  var h = ordered ? 1 : 0;

	  var size = collection.__iterate(keyed ? ordered ? function (v, k) {
	    h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
	  } : function (v, k) {
	    h = h + hashMerge(hash(v), hash(k)) | 0;
	  } : ordered ? function (v) {
	    h = 31 * h + hash(v) | 0;
	  } : function (v) {
	    h = h + hash(v) | 0;
	  });

	  return murmurHashOfSize(size, h);
	}

	function murmurHashOfSize(size, h) {
	  h = imul(h, 0xcc9e2d51);
	  h = imul(h << 15 | h >>> -15, 0x1b873593);
	  h = imul(h << 13 | h >>> -13, 5);
	  h = (h + 0xe6546b64 | 0) ^ size;
	  h = imul(h ^ h >>> 16, 0x85ebca6b);
	  h = imul(h ^ h >>> 13, 0xc2b2ae35);
	  h = smi(h ^ h >>> 16);
	  return h;
	}

	function hashMerge(a, b) {
	  return a ^ b + 0x9e3779b9 + (a << 6) + (a >> 2) | 0; // int
	}

	var OrderedSet =
	/*@__PURE__*/
	function (Set$$1) {
	  function OrderedSet(value) {
	    return value === null || value === undefined ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function (set) {
	      var iter = SetCollection(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v) {
	        return set.add(v);
	      });
	    });
	  }

	  if (Set$$1) OrderedSet.__proto__ = Set$$1;
	  OrderedSet.prototype = Object.create(Set$$1 && Set$$1.prototype);
	  OrderedSet.prototype.constructor = OrderedSet;

	  OrderedSet.of = function of()
	  /*...values*/
	  {
	    return this(arguments);
	  };

	  OrderedSet.fromKeys = function fromKeys(value) {
	    return this(KeyedCollection(value).keySeq());
	  };

	  OrderedSet.prototype.toString = function toString() {
	    return this.__toString('OrderedSet {', '}');
	  };

	  return OrderedSet;
	}(Set$1);

	OrderedSet.isOrderedSet = isOrderedSet;
	var OrderedSetPrototype = OrderedSet.prototype;
	OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
	OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
	OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;
	OrderedSetPrototype.__empty = emptyOrderedSet;
	OrderedSetPrototype.__make = makeOrderedSet;

	function makeOrderedSet(map, ownerID) {
	  var set = Object.create(OrderedSetPrototype);
	  set.size = map ? map.size : 0;
	  set._map = map;
	  set.__ownerID = ownerID;
	  return set;
	}

	var EMPTY_ORDERED_SET;

	function emptyOrderedSet() {
	  return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	}

	var Record = function Record(defaultValues, name) {
	  var hasInitialized;

	  var RecordType = function Record(values) {
	    var this$1 = this;

	    if (values instanceof RecordType) {
	      return values;
	    }

	    if (!(this instanceof RecordType)) {
	      return new RecordType(values);
	    }

	    if (!hasInitialized) {
	      hasInitialized = true;
	      var keys = Object.keys(defaultValues);
	      var indices = RecordTypePrototype._indices = {}; // Deprecated: left to attempt not to break any external code which
	      // relies on a ._name property existing on record instances.
	      // Use Record.getDescriptiveName() instead

	      RecordTypePrototype._name = name;
	      RecordTypePrototype._keys = keys;
	      RecordTypePrototype._defaultValues = defaultValues;

	      for (var i = 0; i < keys.length; i++) {
	        var propName = keys[i];
	        indices[propName] = i;

	        if (RecordTypePrototype[propName]) {
	          /* eslint-disable no-console */
	          typeof console === 'object' && console.warn && console.warn('Cannot define ' + recordName(this) + ' with property "' + propName + '" since that property name is part of the Record API.');
	          /* eslint-enable no-console */
	        } else {
	          setProp(RecordTypePrototype, propName);
	        }
	      }
	    }

	    this.__ownerID = undefined;
	    this._values = List().withMutations(function (l) {
	      l.setSize(this$1._keys.length);
	      KeyedCollection(values).forEach(function (v, k) {
	        l.set(this$1._indices[k], v === this$1._defaultValues[k] ? undefined : v);
	      });
	    });
	  };

	  var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	  RecordTypePrototype.constructor = RecordType;

	  if (name) {
	    RecordType.displayName = name;
	  }

	  return RecordType;
	};

	Record.prototype.toString = function toString() {
	  var str = recordName(this) + ' { ';
	  var keys = this._keys;
	  var k;

	  for (var i = 0, l = keys.length; i !== l; i++) {
	    k = keys[i];
	    str += (i ? ', ' : '') + k + ': ' + quoteString(this.get(k));
	  }

	  return str + ' }';
	};

	Record.prototype.equals = function equals(other) {
	  return this === other || other && this._keys === other._keys && recordSeq(this).equals(recordSeq(other));
	};

	Record.prototype.hashCode = function hashCode() {
	  return recordSeq(this).hashCode();
	}; // @pragma Access


	Record.prototype.has = function has(k) {
	  return this._indices.hasOwnProperty(k);
	};

	Record.prototype.get = function get(k, notSetValue) {
	  if (!this.has(k)) {
	    return notSetValue;
	  }

	  var index = this._indices[k];

	  var value = this._values.get(index);

	  return value === undefined ? this._defaultValues[k] : value;
	}; // @pragma Modification


	Record.prototype.set = function set(k, v) {
	  if (this.has(k)) {
	    var newValues = this._values.set(this._indices[k], v === this._defaultValues[k] ? undefined : v);

	    if (newValues !== this._values && !this.__ownerID) {
	      return makeRecord(this, newValues);
	    }
	  }

	  return this;
	};

	Record.prototype.remove = function remove(k) {
	  return this.set(k);
	};

	Record.prototype.clear = function clear() {
	  var newValues = this._values.clear().setSize(this._keys.length);

	  return this.__ownerID ? this : makeRecord(this, newValues);
	};

	Record.prototype.wasAltered = function wasAltered() {
	  return this._values.wasAltered();
	};

	Record.prototype.toSeq = function toSeq() {
	  return recordSeq(this);
	};

	Record.prototype.toJS = function toJS$1() {
	  return toJS(this);
	};

	Record.prototype.entries = function entries() {
	  return this.__iterator(ITERATE_ENTRIES);
	};

	Record.prototype.__iterator = function __iterator(type, reverse) {
	  return recordSeq(this).__iterator(type, reverse);
	};

	Record.prototype.__iterate = function __iterate(fn, reverse) {
	  return recordSeq(this).__iterate(fn, reverse);
	};

	Record.prototype.__ensureOwner = function __ensureOwner(ownerID) {
	  if (ownerID === this.__ownerID) {
	    return this;
	  }

	  var newValues = this._values.__ensureOwner(ownerID);

	  if (!ownerID) {
	    this.__ownerID = ownerID;
	    this._values = newValues;
	    return this;
	  }

	  return makeRecord(this, newValues, ownerID);
	};

	Record.isRecord = isRecord;
	Record.getDescriptiveName = recordName;
	var RecordPrototype = Record.prototype;
	RecordPrototype[IS_RECORD_SYMBOL] = true;
	RecordPrototype[DELETE] = RecordPrototype.remove;
	RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
	RecordPrototype.getIn = getIn$1;
	RecordPrototype.hasIn = CollectionPrototype.hasIn;
	RecordPrototype.merge = merge$1;
	RecordPrototype.mergeWith = mergeWith;
	RecordPrototype.mergeIn = mergeIn;
	RecordPrototype.mergeDeep = mergeDeep$1;
	RecordPrototype.mergeDeepWith = mergeDeepWith$1;
	RecordPrototype.mergeDeepIn = mergeDeepIn;
	RecordPrototype.setIn = setIn$1;
	RecordPrototype.update = update$1;
	RecordPrototype.updateIn = updateIn$1;
	RecordPrototype.withMutations = withMutations;
	RecordPrototype.asMutable = asMutable;
	RecordPrototype.asImmutable = asImmutable;
	RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
	RecordPrototype.toJSON = RecordPrototype.toObject = CollectionPrototype.toObject;

	RecordPrototype.inspect = RecordPrototype.toSource = function () {
	  return this.toString();
	};

	function makeRecord(likeRecord, values, ownerID) {
	  var record = Object.create(Object.getPrototypeOf(likeRecord));
	  record._values = values;
	  record.__ownerID = ownerID;
	  return record;
	}

	function recordName(record) {
	  return record.constructor.displayName || record.constructor.name || 'Record';
	}

	function recordSeq(record) {
	  return keyedSeqFromValue(record._keys.map(function (k) {
	    return [k, record.get(k)];
	  }));
	}

	function setProp(prototype, name) {
	  try {
	    Object.defineProperty(prototype, name, {
	      get: function () {
	        return this.get(name);
	      },
	      set: function (value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  } catch (error) {// Object.defineProperty failed. Probably IE8.
	  }
	}
	/**
	 * Returns a lazy Seq of `value` repeated `times` times. When `times` is
	 * undefined, returns an infinite sequence of `value`.
	 */


	var Repeat =
	/*@__PURE__*/
	function (IndexedSeq$$1) {
	  function Repeat(value, times) {
	    if (!(this instanceof Repeat)) {
	      return new Repeat(value, times);
	    }

	    this._value = value;
	    this.size = times === undefined ? Infinity : Math.max(0, times);

	    if (this.size === 0) {
	      if (EMPTY_REPEAT) {
	        return EMPTY_REPEAT;
	      }

	      EMPTY_REPEAT = this;
	    }
	  }

	  if (IndexedSeq$$1) Repeat.__proto__ = IndexedSeq$$1;
	  Repeat.prototype = Object.create(IndexedSeq$$1 && IndexedSeq$$1.prototype);
	  Repeat.prototype.constructor = Repeat;

	  Repeat.prototype.toString = function toString() {
	    if (this.size === 0) {
	      return 'Repeat []';
	    }

	    return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	  };

	  Repeat.prototype.get = function get(index, notSetValue) {
	    return this.has(index) ? this._value : notSetValue;
	  };

	  Repeat.prototype.includes = function includes(searchValue) {
	    return is(this._value, searchValue);
	  };

	  Repeat.prototype.slice = function slice(begin, end) {
	    var size = this.size;
	    return wholeSlice(begin, end, size) ? this : new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	  };

	  Repeat.prototype.reverse = function reverse() {
	    return this;
	  };

	  Repeat.prototype.indexOf = function indexOf(searchValue) {
	    if (is(this._value, searchValue)) {
	      return 0;
	    }

	    return -1;
	  };

	  Repeat.prototype.lastIndexOf = function lastIndexOf(searchValue) {
	    if (is(this._value, searchValue)) {
	      return this.size;
	    }

	    return -1;
	  };

	  Repeat.prototype.__iterate = function __iterate(fn, reverse) {
	    var size = this.size;
	    var i = 0;

	    while (i !== size) {
	      if (fn(this._value, reverse ? size - ++i : i++, this) === false) {
	        break;
	      }
	    }

	    return i;
	  };

	  Repeat.prototype.__iterator = function __iterator(type, reverse) {
	    var this$1 = this;
	    var size = this.size;
	    var i = 0;
	    return new Iterator(function () {
	      return i === size ? iteratorDone() : iteratorValue(type, reverse ? size - ++i : i++, this$1._value);
	    });
	  };

	  Repeat.prototype.equals = function equals(other) {
	    return other instanceof Repeat ? is(this._value, other._value) : deepEqual(other);
	  };

	  return Repeat;
	}(IndexedSeq);

	var EMPTY_REPEAT;

	function fromJS(value, converter) {
	  return fromJSWith([], converter || defaultConverter, value, '', converter && converter.length > 2 ? [] : undefined, {
	    '': value
	  });
	}

	function fromJSWith(stack, converter, value, key, keyPath, parentValue) {
	  var toSeq = Array.isArray(value) ? IndexedSeq : isPlainObj(value) ? KeyedSeq : null;

	  if (toSeq) {
	    if (~stack.indexOf(value)) {
	      throw new TypeError('Cannot convert circular structure to Immutable');
	    }

	    stack.push(value);
	    keyPath && key !== '' && keyPath.push(key);
	    var converted = converter.call(parentValue, key, toSeq(value).map(function (v, k) {
	      return fromJSWith(stack, converter, v, k, keyPath, value);
	    }), keyPath && keyPath.slice());
	    stack.pop();
	    keyPath && keyPath.pop();
	    return converted;
	  }

	  return value;
	}

	function defaultConverter(k, v) {
	  return isKeyed(v) ? v.toMap() : v.toList();
	}

	var version = "4.0.0-rc.11";
	var Immutable = {
	  version: version,
	  Collection: Collection,
	  // Note: Iterable is deprecated
	  Iterable: Collection,
	  Seq: Seq,
	  Map: Map$1,
	  OrderedMap: OrderedMap,
	  List: List,
	  Stack: Stack,
	  Set: Set$1,
	  OrderedSet: OrderedSet,
	  Record: Record,
	  Range: Range,
	  Repeat: Repeat,
	  is: is,
	  fromJS: fromJS,
	  hash: hash,
	  isImmutable: isImmutable,
	  isCollection: isCollection,
	  isKeyed: isKeyed,
	  isIndexed: isIndexed,
	  isAssociative: isAssociative,
	  isOrdered: isOrdered,
	  isValueObject: isValueObject,
	  isSeq: isSeq,
	  isList: isList,
	  isMap: isMap,
	  isOrderedMap: isOrderedMap,
	  isStack: isStack,
	  isSet: isSet,
	  isOrderedSet: isOrderedSet,
	  isRecord: isRecord,
	  get: get,
	  getIn: getIn,
	  has: has,
	  hasIn: hasIn,
	  merge: merge$1$1,
	  mergeDeep: mergeDeep,
	  mergeWith: mergeWith$1,
	  mergeDeepWith: mergeDeepWith,
	  remove: remove,
	  removeIn: removeIn,
	  set: set,
	  setIn: setIn,
	  update: update,
	  updateIn: updateIn
	}; // Note: Iterable is deprecated
	engine_10(Immutable, {
	  tmpl: _tmpl$2
	});

	class Editor extends Record({
	  visibleRange: new AudioRange(new Time(0), Time.fromSeconds(10)),
	  frame: null,
	  cursor: Time.fromSeconds(1),
	  virtualCursor: Time.fromSeconds(2)
	}) {
	  pixelToTime(pixel) {
	    const {
	      width
	    } = this.frame;
	    const {
	      visibleRange
	    } = this;
	    const percent = pixel / width;
	    const millisecond = percent * visibleRange.duration.milliseconds;
	    return new Time(millisecond);
	  }

	  timeToPixel(time) {
	    const {
	      width
	    } = this.frame;
	    const {
	      visibleRange
	    } = this;
	    const percent = (time.milliseconds - visibleRange.start.milliseconds) / visibleRange.duration.milliseconds;
	    return percent * width;
	  }

	  durationToWidth(time) {
	    const {
	      width
	    } = this.frame;
	    const {
	      visibleRange
	    } = this;
	    const pixelsPerMillisecond = width / visibleRange.duration.milliseconds;
	    return pixelsPerMillisecond * time.milliseconds;
	  }

	}

	function setVirtualCursorTime(time) {
	  editorSubject.next(editorSubject.value.set('virtualCursor', time));
	}
	function setCursorTime(time) {
	  editorSubject.next(editorSubject.value.set('cursor', time));
	}
	function setVisibleRangeStart(time) {
	  const editor = editorSubject.value;
	  const range$$1 = new AudioRange(time, editor.visibleRange.duration);
	  editorSubject.next(editorSubject.value.set('visibleRange', range$$1));
	}
	function setFrame(frame) {
	  editorSubject.next(editorSubject.value.set('frame', frame));
	}
	const editorSubject = new BehaviorSubject(new Editor());
	const editorSym = Symbol();
	wire_2(editorSym, wireObservable(editorSubject.asObservable()));

	var interact = createCommonjsModule(function (module, exports) {
	/**
	 * interact.js v1.3.4
	 *
	 * Copyright (c) 2012-2018 Taye Adeyemi <dev@taye.me>
	 * Released under the MIT License.
	 * https://raw.github.com/taye/interact.js/master/LICENSE
	 */
	(function (f) {
	  {
	    module.exports = f();
	  }
	})(function () {
	  return function e(t, n, r) {
	    function s(o, u) {
	      if (!n[o]) {
	        if (!t[o]) {
	          var a = typeof commonjsRequire == "function" && commonjsRequire;
	          if (!u && a) return a(o, !0);
	          if (i) return i(o, !0);
	          var f = new Error("Cannot find module '" + o + "'");
	          throw f.code = "MODULE_NOT_FOUND", f;
	        }

	        var l = n[o] = {
	          exports: {}
	        };
	        t[o][0].call(l.exports, function (e) {
	          var n = t[o][1][e];
	          return s(n ? n : e);
	        }, l, l.exports, e, t, n, r);
	      }

	      return n[o].exports;
	    }

	    var i = typeof commonjsRequire == "function" && commonjsRequire;

	    for (var o = 0; o < r.length; o++) s(r[o]);

	    return s;
	  }({
	    1: [function (require, module, exports) {
	      /*
	       * In a (windowless) server environment this file exports a factory function
	       * that takes the window to use.
	       *
	       *     var interact = require('interact.js')(windowObject);
	       *
	       * See https://github.com/taye/interact.js/issues/187
	       */

	      if (typeof window === 'undefined') {
	        module.exports = function (window) {
	          require('./src/utils/window').init(window);

	          return require('./src/index');
	        };
	      } else {
	        module.exports = require('./src/index');
	      }
	    }, {
	      "./src/index": 19,
	      "./src/utils/window": 52
	    }],
	    2: [function (require, module, exports) {

	      function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	          throw new TypeError("Cannot call a class as a function");
	        }
	      }

	      var extend = require('./utils/extend.js');

	      function fireUntilImmediateStopped(event, listeners) {
	        for (var _i = 0; _i < listeners.length; _i++) {
	          var _ref;

	          _ref = listeners[_i];
	          var listener = _ref;

	          if (event.immediatePropagationStopped) {
	            break;
	          }

	          listener(event);
	        }
	      }

	      var Eventable = function () {
	        function Eventable(options) {
	          _classCallCheck(this, Eventable);

	          this.options = extend({}, options || {});
	        }

	        Eventable.prototype.fire = function fire(event) {
	          var listeners = void 0;
	          var onEvent = 'on' + event.type;
	          var global = this.global; // Interactable#on() listeners

	          if (listeners = this[event.type]) {
	            fireUntilImmediateStopped(event, listeners);
	          } // interactable.onevent listener


	          if (this[onEvent]) {
	            this[onEvent](event);
	          } // interact.on() listeners


	          if (!event.propagationStopped && global && (listeners = global[event.type])) {
	            fireUntilImmediateStopped(event, listeners);
	          }
	        };

	        Eventable.prototype.on = function on(eventType, listener) {
	          // if this type of event was never bound
	          if (this[eventType]) {
	            this[eventType].push(listener);
	          } else {
	            this[eventType] = [listener];
	          }
	        };

	        Eventable.prototype.off = function off(eventType, listener) {
	          // if it is an action event type
	          var eventList = this[eventType];
	          var index = eventList ? eventList.indexOf(listener) : -1;

	          if (index !== -1) {
	            eventList.splice(index, 1);
	          }

	          if (eventList && eventList.length === 0 || !listener) {
	            this[eventType] = undefined;
	          }
	        };

	        return Eventable;
	      }();

	      module.exports = Eventable;
	    }, {
	      "./utils/extend.js": 41
	    }],
	    3: [function (require, module, exports) {

	      function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	          throw new TypeError("Cannot call a class as a function");
	        }
	      }

	      var extend = require('./utils/extend');

	      var getOriginXY = require('./utils/getOriginXY');

	      var defaults = require('./defaultOptions');

	      var signals = require('./utils/Signals').new();

	      var InteractEvent = function () {
	        /** */
	        function InteractEvent(interaction, event, action, phase, element, related) {
	          var preEnd = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

	          _classCallCheck(this, InteractEvent);

	          var target = interaction.target;
	          var deltaSource = (target && target.options || defaults).deltaSource;
	          var origin = getOriginXY(target, element, action);
	          var starting = phase === 'start';
	          var ending = phase === 'end';
	          var coords = starting ? interaction.startCoords : interaction.curCoords;
	          var prevEvent = interaction.prevEvent;
	          element = element || interaction.element;
	          var page = extend({}, coords.page);
	          var client = extend({}, coords.client);
	          page.x -= origin.x;
	          page.y -= origin.y;
	          client.x -= origin.x;
	          client.y -= origin.y;
	          this.ctrlKey = event.ctrlKey;
	          this.altKey = event.altKey;
	          this.shiftKey = event.shiftKey;
	          this.metaKey = event.metaKey;
	          this.button = event.button;
	          this.buttons = event.buttons;
	          this.target = element;
	          this.currentTarget = element;
	          this.relatedTarget = related || null;
	          this.preEnd = preEnd;
	          this.type = action + (phase || '');
	          this.interaction = interaction;
	          this.interactable = target;
	          this.t0 = starting ? interaction.downTimes[interaction.downTimes.length - 1] : prevEvent.t0;
	          var signalArg = {
	            interaction: interaction,
	            event: event,
	            action: action,
	            phase: phase,
	            element: element,
	            related: related,
	            page: page,
	            client: client,
	            coords: coords,
	            starting: starting,
	            ending: ending,
	            deltaSource: deltaSource,
	            iEvent: this
	          };
	          signals.fire('set-xy', signalArg);

	          if (ending) {
	            // use previous coords when ending
	            this.pageX = prevEvent.pageX;
	            this.pageY = prevEvent.pageY;
	            this.clientX = prevEvent.clientX;
	            this.clientY = prevEvent.clientY;
	          } else {
	            this.pageX = page.x;
	            this.pageY = page.y;
	            this.clientX = client.x;
	            this.clientY = client.y;
	          }

	          this.x0 = interaction.startCoords.page.x - origin.x;
	          this.y0 = interaction.startCoords.page.y - origin.y;
	          this.clientX0 = interaction.startCoords.client.x - origin.x;
	          this.clientY0 = interaction.startCoords.client.y - origin.y;
	          signals.fire('set-delta', signalArg);
	          this.timeStamp = coords.timeStamp;
	          this.dt = interaction.pointerDelta.timeStamp;
	          this.duration = this.timeStamp - this.t0; // speed and velocity in pixels per second

	          this.speed = interaction.pointerDelta[deltaSource].speed;
	          this.velocityX = interaction.pointerDelta[deltaSource].vx;
	          this.velocityY = interaction.pointerDelta[deltaSource].vy;
	          this.swipe = ending || phase === 'inertiastart' ? this.getSwipe() : null;
	          signals.fire('new', signalArg);
	        }

	        InteractEvent.prototype.getSwipe = function getSwipe() {
	          var interaction = this.interaction;

	          if (interaction.prevEvent.speed < 600 || this.timeStamp - interaction.prevEvent.timeStamp > 150) {
	            return null;
	          }

	          var angle = 180 * Math.atan2(interaction.prevEvent.velocityY, interaction.prevEvent.velocityX) / Math.PI;
	          var overlap = 22.5;

	          if (angle < 0) {
	            angle += 360;
	          }

	          var left = 135 - overlap <= angle && angle < 225 + overlap;
	          var up = 225 - overlap <= angle && angle < 315 + overlap;
	          var right = !left && (315 - overlap <= angle || angle < 45 + overlap);
	          var down = !up && 45 - overlap <= angle && angle < 135 + overlap;
	          return {
	            up: up,
	            down: down,
	            left: left,
	            right: right,
	            angle: angle,
	            speed: interaction.prevEvent.speed,
	            velocity: {
	              x: interaction.prevEvent.velocityX,
	              y: interaction.prevEvent.velocityY
	            }
	          };
	        };

	        InteractEvent.prototype.preventDefault = function preventDefault() {};
	        /** */


	        InteractEvent.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
	          this.immediatePropagationStopped = this.propagationStopped = true;
	        };
	        /** */


	        InteractEvent.prototype.stopPropagation = function stopPropagation() {
	          this.propagationStopped = true;
	        };

	        return InteractEvent;
	      }();

	      signals.on('set-delta', function (_ref) {
	        var iEvent = _ref.iEvent,
	            interaction = _ref.interaction,
	            starting = _ref.starting,
	            deltaSource = _ref.deltaSource;
	        var prevEvent = starting ? iEvent : interaction.prevEvent;

	        if (deltaSource === 'client') {
	          iEvent.dx = iEvent.clientX - prevEvent.clientX;
	          iEvent.dy = iEvent.clientY - prevEvent.clientY;
	        } else {
	          iEvent.dx = iEvent.pageX - prevEvent.pageX;
	          iEvent.dy = iEvent.pageY - prevEvent.pageY;
	        }
	      });
	      InteractEvent.signals = signals;
	      module.exports = InteractEvent;
	    }, {
	      "./defaultOptions": 18,
	      "./utils/Signals": 34,
	      "./utils/extend": 41,
	      "./utils/getOriginXY": 42
	    }],
	    4: [function (require, module, exports) {

	      function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	          throw new TypeError("Cannot call a class as a function");
	        }
	      }

	      var clone = require('./utils/clone');

	      var is = require('./utils/is');

	      var events = require('./utils/events');

	      var extend = require('./utils/extend');

	      var actions = require('./actions/base');

	      var scope = require('./scope');

	      var Eventable = require('./Eventable');

	      var defaults = require('./defaultOptions');

	      var signals = require('./utils/Signals').new();

	      var _require = require('./utils/domUtils'),
	          getElementRect = _require.getElementRect,
	          nodeContains = _require.nodeContains,
	          trySelector = _require.trySelector,
	          matchesSelector = _require.matchesSelector;

	      var _require2 = require('./utils/window'),
	          getWindow = _require2.getWindow;

	      var _require3 = require('./utils/arr'),
	          contains = _require3.contains;

	      var _require4 = require('./utils/browser'),
	          wheelEvent = _require4.wheelEvent; // all set interactables


	      scope.interactables = [];

	      var Interactable = function () {
	        /** */
	        function Interactable(target, options) {
	          _classCallCheck(this, Interactable);

	          options = options || {};
	          this.target = target;
	          this.events = new Eventable();
	          this._context = options.context || scope.document;
	          this._win = getWindow(trySelector(target) ? this._context : target);
	          this._doc = this._win.document;
	          signals.fire('new', {
	            target: target,
	            options: options,
	            interactable: this,
	            win: this._win
	          });
	          scope.addDocument(this._doc, this._win);
	          scope.interactables.push(this);
	          this.set(options);
	        }

	        Interactable.prototype.setOnEvents = function setOnEvents(action, phases) {
	          var onAction = 'on' + action;

	          if (is.function(phases.onstart)) {
	            this.events[onAction + 'start'] = phases.onstart;
	          }

	          if (is.function(phases.onmove)) {
	            this.events[onAction + 'move'] = phases.onmove;
	          }

	          if (is.function(phases.onend)) {
	            this.events[onAction + 'end'] = phases.onend;
	          }

	          if (is.function(phases.oninertiastart)) {
	            this.events[onAction + 'inertiastart'] = phases.oninertiastart;
	          }

	          return this;
	        };

	        Interactable.prototype.setPerAction = function setPerAction(action, options) {
	          // for all the default per-action options
	          for (var option in options) {
	            // if this option exists for this action
	            if (option in defaults[action]) {
	              // if the option in the options arg is an object value
	              if (is.object(options[option])) {
	                // duplicate the object and merge
	                this.options[action][option] = clone(this.options[action][option] || {});
	                extend(this.options[action][option], options[option]);

	                if (is.object(defaults.perAction[option]) && 'enabled' in defaults.perAction[option]) {
	                  this.options[action][option].enabled = options[option].enabled === false ? false : true;
	                }
	              } else if (is.bool(options[option]) && is.object(defaults.perAction[option])) {
	                this.options[action][option].enabled = options[option];
	              } else if (options[option] !== undefined) {
	                // or if it's not undefined, do a plain assignment
	                this.options[action][option] = options[option];
	              }
	            }
	          }
	        };
	        /**
	         * The default function to get an Interactables bounding rect. Can be
	         * overridden using {@link Interactable.rectChecker}.
	         *
	         * @param {Element} [element] The element to measure.
	         * @return {object} The object's bounding rectangle.
	         */


	        Interactable.prototype.getRect = function getRect(element) {
	          element = element || this.target;

	          if (is.string(this.target) && !is.element(element)) {
	            element = this._context.querySelector(this.target);
	          }

	          return getElementRect(element);
	        };
	        /**
	         * Returns or sets the function used to calculate the interactable's
	         * element's rectangle
	         *
	         * @param {function} [checker] A function which returns this Interactable's
	         * bounding rectangle. See {@link Interactable.getRect}
	         * @return {function | object} The checker function or this Interactable
	         */


	        Interactable.prototype.rectChecker = function rectChecker(checker) {
	          if (is.function(checker)) {
	            this.getRect = checker;
	            return this;
	          }

	          if (checker === null) {
	            delete this.options.getRect;
	            return this;
	          }

	          return this.getRect;
	        };

	        Interactable.prototype._backCompatOption = function _backCompatOption(optionName, newValue) {
	          if (trySelector(newValue) || is.object(newValue)) {
	            this.options[optionName] = newValue;

	            for (var _i = 0; _i < actions.names.length; _i++) {
	              var _ref;

	              _ref = actions.names[_i];
	              var action = _ref;
	              this.options[action][optionName] = newValue;
	            }

	            return this;
	          }

	          return this.options[optionName];
	        };
	        /**
	         * Gets or sets the origin of the Interactable's element.  The x and y
	         * of the origin will be subtracted from action event coordinates.
	         *
	         * @param {Element | object | string} [origin] An HTML or SVG Element whose
	         * rect will be used, an object eg. { x: 0, y: 0 } or string 'parent', 'self'
	         * or any CSS selector
	         *
	         * @return {object} The current origin or this Interactable
	         */


	        Interactable.prototype.origin = function origin(newValue) {
	          return this._backCompatOption('origin', newValue);
	        };
	        /**
	         * Returns or sets the mouse coordinate types used to calculate the
	         * movement of the pointer.
	         *
	         * @param {string} [newValue] Use 'client' if you will be scrolling while
	         * interacting; Use 'page' if you want autoScroll to work
	         * @return {string | object} The current deltaSource or this Interactable
	         */


	        Interactable.prototype.deltaSource = function deltaSource(newValue) {
	          if (newValue === 'page' || newValue === 'client') {
	            this.options.deltaSource = newValue;
	            return this;
	          }

	          return this.options.deltaSource;
	        };
	        /**
	         * Gets the selector context Node of the Interactable. The default is
	         * `window.document`.
	         *
	         * @return {Node} The context Node of this Interactable
	         */


	        Interactable.prototype.context = function context() {
	          return this._context;
	        };

	        Interactable.prototype.inContext = function inContext(element) {
	          return this._context === element.ownerDocument || nodeContains(this._context, element);
	        };
	        /**
	         * Calls listeners for the given InteractEvent type bound globally
	         * and directly to this Interactable
	         *
	         * @param {InteractEvent} iEvent The InteractEvent object to be fired on this
	         * Interactable
	         * @return {Interactable} this Interactable
	         */


	        Interactable.prototype.fire = function fire(iEvent) {
	          this.events.fire(iEvent);
	          return this;
	        };

	        Interactable.prototype._onOffMultiple = function _onOffMultiple(method, eventType, listener, options) {
	          if (is.string(eventType) && eventType.search(' ') !== -1) {
	            eventType = eventType.trim().split(/ +/);
	          }

	          if (is.array(eventType)) {
	            for (var _i2 = 0; _i2 < eventType.length; _i2++) {
	              var _ref2;

	              _ref2 = eventType[_i2];
	              var type = _ref2;
	              this[method](type, listener, options);
	            }

	            return true;
	          }

	          if (is.object(eventType)) {
	            for (var prop in eventType) {
	              this[method](prop, eventType[prop], listener);
	            }

	            return true;
	          }
	        };
	        /**
	         * Binds a listener for an InteractEvent, pointerEvent or DOM event.
	         *
	         * @param {string | array | object} eventType  The types of events to listen
	         * for
	         * @param {function} listener   The function event (s)
	         * @param {object | boolean} [options]    options object or useCapture flag
	         * for addEventListener
	         * @return {object} This Interactable
	         */


	        Interactable.prototype.on = function on(eventType, listener, options) {
	          if (this._onOffMultiple('on', eventType, listener, options)) {
	            return this;
	          }

	          if (eventType === 'wheel') {
	            eventType = wheelEvent;
	          }

	          if (contains(Interactable.eventTypes, eventType)) {
	            this.events.on(eventType, listener);
	          } // delegated event for selector
	          else if (is.string(this.target)) {
	              events.addDelegate(this.target, this._context, eventType, listener, options);
	            } else {
	              events.add(this.target, eventType, listener, options);
	            }

	          return this;
	        };
	        /**
	         * Removes an InteractEvent, pointerEvent or DOM event listener
	         *
	         * @param {string | array | object} eventType The types of events that were
	         * listened for
	         * @param {function} listener The listener function to be removed
	         * @param {object | boolean} [options] options object or useCapture flag for
	         * removeEventListener
	         * @return {object} This Interactable
	         */


	        Interactable.prototype.off = function off(eventType, listener, options) {
	          if (this._onOffMultiple('off', eventType, listener, options)) {
	            return this;
	          }

	          if (eventType === 'wheel') {
	            eventType = wheelEvent;
	          } // if it is an action event type


	          if (contains(Interactable.eventTypes, eventType)) {
	            this.events.off(eventType, listener);
	          } // delegated event
	          else if (is.string(this.target)) {
	              events.removeDelegate(this.target, this._context, eventType, listener, options);
	            } // remove listener from this Interatable's element
	            else {
	                events.remove(this.target, eventType, listener, options);
	              }

	          return this;
	        };
	        /**
	         * Reset the options of this Interactable
	         *
	         * @param {object} options The new settings to apply
	         * @return {object} This Interactable
	         */


	        Interactable.prototype.set = function set(options) {
	          if (!is.object(options)) {
	            options = {};
	          }

	          this.options = clone(defaults.base);
	          var perActions = clone(defaults.perAction);

	          for (var actionName in actions.methodDict) {
	            var methodName = actions.methodDict[actionName];
	            this.options[actionName] = clone(defaults[actionName]);
	            this.setPerAction(actionName, perActions);
	            this[methodName](options[actionName]);
	          }

	          for (var _i3 = 0; _i3 < Interactable.settingsMethods.length; _i3++) {
	            var _ref3;

	            _ref3 = Interactable.settingsMethods[_i3];
	            var setting = _ref3;
	            this.options[setting] = defaults.base[setting];

	            if (setting in options) {
	              this[setting](options[setting]);
	            }
	          }

	          signals.fire('set', {
	            options: options,
	            interactable: this
	          });
	          return this;
	        };
	        /**
	         * Remove this interactable from the list of interactables and remove it's
	         * action capabilities and event listeners
	         *
	         * @return {interact}
	         */


	        Interactable.prototype.unset = function unset() {
	          events.remove(this.target, 'all');

	          if (is.string(this.target)) {
	            // remove delegated events
	            for (var type in events.delegatedEvents) {
	              var delegated = events.delegatedEvents[type];

	              if (delegated.selectors[0] === this.target && delegated.contexts[0] === this._context) {
	                delegated.selectors.splice(0, 1);
	                delegated.contexts.splice(0, 1);
	                delegated.listeners.splice(0, 1); // remove the arrays if they are empty

	                if (!delegated.selectors.length) {
	                  delegated[type] = null;
	                }
	              }

	              events.remove(this._context, type, events.delegateListener);
	              events.remove(this._context, type, events.delegateUseCapture, true);
	            }
	          } else {
	            events.remove(this, 'all');
	          }

	          signals.fire('unset', {
	            interactable: this
	          });
	          scope.interactables.splice(scope.interactables.indexOf(this), 1); // Stop related interactions when an Interactable is unset

	          for (var _i4 = 0; _i4 < (scope.interactions || []).length; _i4++) {
	            var _ref4;

	            _ref4 = (scope.interactions || [])[_i4];
	            var interaction = _ref4;

	            if (interaction.target === this && interaction.interacting() && !interaction._ending) {
	              interaction.stop();
	            }
	          }

	          return scope.interact;
	        };

	        return Interactable;
	      }();

	      scope.interactables.indexOfElement = function indexOfElement(target, context) {
	        context = context || scope.document;

	        for (var i = 0; i < this.length; i++) {
	          var interactable = this[i];

	          if (interactable.target === target && interactable._context === context) {
	            return i;
	          }
	        }

	        return -1;
	      };

	      scope.interactables.get = function interactableGet(element, options, dontCheckInContext) {
	        var ret = this[this.indexOfElement(element, options && options.context)];
	        return ret && (is.string(element) || dontCheckInContext || ret.inContext(element)) ? ret : null;
	      };

	      scope.interactables.forEachMatch = function (element, callback) {
	        for (var _i5 = 0; _i5 < this.length; _i5++) {
	          var _ref5;

	          _ref5 = this[_i5];
	          var interactable = _ref5;
	          var ret = void 0;

	          if ((is.string(interactable.target) // target is a selector and the element matches
	          ? is.element(element) && matchesSelector(element, interactable.target) : // target is the element
	          element === interactable.target) && // the element is in context
	          interactable.inContext(element)) {
	            ret = callback(interactable);
	          }

	          if (ret !== undefined) {
	            return ret;
	          }
	        }
	      }; // all interact.js eventTypes


	      Interactable.eventTypes = scope.eventTypes = [];
	      Interactable.signals = signals;
	      Interactable.settingsMethods = ['deltaSource', 'origin', 'preventDefault', 'rectChecker'];
	      module.exports = Interactable;
	    }, {
	      "./Eventable": 2,
	      "./actions/base": 6,
	      "./defaultOptions": 18,
	      "./scope": 33,
	      "./utils/Signals": 34,
	      "./utils/arr": 35,
	      "./utils/browser": 36,
	      "./utils/clone": 37,
	      "./utils/domUtils": 39,
	      "./utils/events": 40,
	      "./utils/extend": 41,
	      "./utils/is": 46,
	      "./utils/window": 52
	    }],
	    5: [function (require, module, exports) {

	      function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	          throw new TypeError("Cannot call a class as a function");
	        }
	      }

	      var scope = require('./scope');

	      var utils = require('./utils');

	      var events = require('./utils/events');

	      var browser = require('./utils/browser');

	      var domObjects = require('./utils/domObjects');

	      var finder = require('./utils/interactionFinder');

	      var signals = require('./utils/Signals').new();

	      var listeners = {};
	      var methodNames = ['pointerDown', 'pointerMove', 'pointerUp', 'updatePointer', 'removePointer']; // for ignoring browser's simulated mouse events

	      var prevTouchTime = 0; // all active and idle interactions

	      scope.interactions = [];

	      var Interaction = function () {
	        /** */
	        function Interaction(_ref) {
	          var pointerType = _ref.pointerType;

	          _classCallCheck(this, Interaction);

	          this.target = null; // current interactable being interacted with

	          this.element = null; // the target element of the interactable

	          this.prepared = {
	            // action that's ready to be fired on next move event
	            name: null,
	            axis: null,
	            edges: null
	          }; // keep track of added pointers

	          this.pointers = [];
	          this.pointerIds = [];
	          this.downTargets = [];
	          this.downTimes = []; // Previous native pointer move event coordinates

	          this.prevCoords = {
	            page: {
	              x: 0,
	              y: 0
	            },
	            client: {
	              x: 0,
	              y: 0
	            },
	            timeStamp: 0
	          }; // current native pointer move event coordinates

	          this.curCoords = {
	            page: {
	              x: 0,
	              y: 0
	            },
	            client: {
	              x: 0,
	              y: 0
	            },
	            timeStamp: 0
	          }; // Starting InteractEvent pointer coordinates

	          this.startCoords = {
	            page: {
	              x: 0,
	              y: 0
	            },
	            client: {
	              x: 0,
	              y: 0
	            },
	            timeStamp: 0
	          }; // Change in coordinates and time of the pointer

	          this.pointerDelta = {
	            page: {
	              x: 0,
	              y: 0,
	              vx: 0,
	              vy: 0,
	              speed: 0
	            },
	            client: {
	              x: 0,
	              y: 0,
	              vx: 0,
	              vy: 0,
	              speed: 0
	            },
	            timeStamp: 0
	          };
	          this.downEvent = null; // pointerdown/mousedown/touchstart event

	          this.downPointer = {};
	          this._eventTarget = null;
	          this._curEventTarget = null;
	          this.prevEvent = null; // previous action event

	          this.pointerIsDown = false;
	          this.pointerWasMoved = false;
	          this._interacting = false;
	          this._ending = false;
	          this.pointerType = pointerType;
	          signals.fire('new', this);
	          scope.interactions.push(this);
	        }

	        Interaction.prototype.pointerDown = function pointerDown(pointer, event, eventTarget) {
	          var pointerIndex = this.updatePointer(pointer, event, true);
	          signals.fire('down', {
	            pointer: pointer,
	            event: event,
	            eventTarget: eventTarget,
	            pointerIndex: pointerIndex,
	            interaction: this
	          });
	        };
	        /**
	         * ```js
	         * interact(target)
	         *   .draggable({
	         *     // disable the default drag start by down->move
	         *     manualStart: true
	         *   })
	         *   // start dragging after the user holds the pointer down
	         *   .on('hold', function (event) {
	         *     var interaction = event.interaction;
	         *
	         *     if (!interaction.interacting()) {
	         *       interaction.start({ name: 'drag' },
	         *                         event.interactable,
	         *                         event.currentTarget);
	         *     }
	         * });
	         * ```
	         *
	         * Start an action with the given Interactable and Element as tartgets. The
	         * action must be enabled for the target Interactable and an appropriate
	         * number of pointers must be held down - 1 for drag/resize, 2 for gesture.
	         *
	         * Use it with `interactable.<action>able({ manualStart: false })` to always
	         * [start actions manually](https://github.com/taye/interact.js/issues/114)
	         *
	         * @param {object} action   The action to be performed - drag, resize, etc.
	         * @param {Interactable} target  The Interactable to target
	         * @param {Element} element The DOM Element to target
	         * @return {object} interact
	         */


	        Interaction.prototype.start = function start(action, target, element) {
	          if (this.interacting() || !this.pointerIsDown || this.pointerIds.length < (action.name === 'gesture' ? 2 : 1)) {
	            return;
	          } // if this interaction had been removed after stopping
	          // add it back


	          if (scope.interactions.indexOf(this) === -1) {
	            scope.interactions.push(this);
	          }

	          utils.copyAction(this.prepared, action);
	          this.target = target;
	          this.element = element;
	          signals.fire('action-start', {
	            interaction: this,
	            event: this.downEvent
	          });
	        };

	        Interaction.prototype.pointerMove = function pointerMove(pointer, event, eventTarget) {
	          if (!this.simulation) {
	            this.updatePointer(pointer);
	            utils.setCoords(this.curCoords, this.pointers);
	          }

	          var duplicateMove = this.curCoords.page.x === this.prevCoords.page.x && this.curCoords.page.y === this.prevCoords.page.y && this.curCoords.client.x === this.prevCoords.client.x && this.curCoords.client.y === this.prevCoords.client.y;
	          var dx = void 0;
	          var dy = void 0; // register movement greater than pointerMoveTolerance

	          if (this.pointerIsDown && !this.pointerWasMoved) {
	            dx = this.curCoords.client.x - this.startCoords.client.x;
	            dy = this.curCoords.client.y - this.startCoords.client.y;
	            this.pointerWasMoved = utils.hypot(dx, dy) > Interaction.pointerMoveTolerance;
	          }

	          var signalArg = {
	            pointer: pointer,
	            pointerIndex: this.getPointerIndex(pointer),
	            event: event,
	            eventTarget: eventTarget,
	            dx: dx,
	            dy: dy,
	            duplicate: duplicateMove,
	            interaction: this,
	            interactingBeforeMove: this.interacting()
	          };

	          if (!duplicateMove) {
	            // set pointer coordinate, time changes and speeds
	            utils.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);
	          }

	          signals.fire('move', signalArg);

	          if (!duplicateMove) {
	            // if interacting, fire an 'action-move' signal etc
	            if (this.interacting()) {
	              this.doMove(signalArg);
	            }

	            if (this.pointerWasMoved) {
	              utils.copyCoords(this.prevCoords, this.curCoords);
	            }
	          }
	        };
	        /**
	         * ```js
	         * interact(target)
	         *   .draggable(true)
	         *   .on('dragmove', function (event) {
	         *     if (someCondition) {
	         *       // change the snap settings
	         *       event.interactable.draggable({ snap: { targets: [] }});
	         *       // fire another move event with re-calculated snap
	         *       event.interaction.doMove();
	         *     }
	         *   });
	         * ```
	         *
	         * Force a move of the current action at the same coordinates. Useful if
	         * snap/restrict has been changed and you want a movement with the new
	         * settings.
	         */


	        Interaction.prototype.doMove = function doMove(signalArg) {
	          signalArg = utils.extend({
	            pointer: this.pointers[0],
	            event: this.prevEvent,
	            eventTarget: this._eventTarget,
	            interaction: this
	          }, signalArg || {});
	          signals.fire('before-action-move', signalArg);

	          if (!this._dontFireMove) {
	            signals.fire('action-move', signalArg);
	          }

	          this._dontFireMove = false;
	        }; // End interact move events and stop auto-scroll unless simulation is running


	        Interaction.prototype.pointerUp = function pointerUp(pointer, event, eventTarget, curEventTarget) {
	          var pointerIndex = this.getPointerIndex(pointer);
	          signals.fire(/cancel$/i.test(event.type) ? 'cancel' : 'up', {
	            pointer: pointer,
	            pointerIndex: pointerIndex,
	            event: event,
	            eventTarget: eventTarget,
	            curEventTarget: curEventTarget,
	            interaction: this
	          });

	          if (!this.simulation) {
	            this.end(event);
	          }

	          this.pointerIsDown = false;
	          this.removePointer(pointer, event);
	        };
	        /**
	         * ```js
	         * interact(target)
	         *   .draggable(true)
	         *   .on('move', function (event) {
	         *     if (event.pageX > 1000) {
	         *       // end the current action
	         *       event.interaction.end();
	         *       // stop all further listeners from being called
	         *       event.stopImmediatePropagation();
	         *     }
	         *   });
	         * ```
	         *
	         * Stop the current action and fire an end event. Inertial movement does
	         * not happen.
	         *
	         * @param {PointerEvent} [event]
	         */


	        Interaction.prototype.end = function end(event) {
	          this._ending = true;
	          event = event || this.prevEvent;

	          if (this.interacting()) {
	            signals.fire('action-end', {
	              event: event,
	              interaction: this
	            });
	          }

	          this.stop();
	          this._ending = false;
	        };

	        Interaction.prototype.currentAction = function currentAction() {
	          return this._interacting ? this.prepared.name : null;
	        };

	        Interaction.prototype.interacting = function interacting() {
	          return this._interacting;
	        };
	        /** */


	        Interaction.prototype.stop = function stop() {
	          signals.fire('stop', {
	            interaction: this
	          });

	          if (this._interacting) {
	            signals.fire('stop-active', {
	              interaction: this
	            });
	            signals.fire('stop-' + this.prepared.name, {
	              interaction: this
	            });
	          }

	          this.target = this.element = null;
	          this._interacting = false;
	          this.prepared.name = this.prevEvent = null;
	        };

	        Interaction.prototype.getPointerIndex = function getPointerIndex(pointer) {
	          // mouse and pen interactions may have only one pointer
	          if (this.pointerType === 'mouse' || this.pointerType === 'pen') {
	            return 0;
	          }

	          return this.pointerIds.indexOf(utils.getPointerId(pointer));
	        };

	        Interaction.prototype.updatePointer = function updatePointer(pointer, event) {
	          var down = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : event && /(down|start)$/i.test(event.type);
	          var id = utils.getPointerId(pointer);
	          var index = this.getPointerIndex(pointer);

	          if (index === -1) {
	            index = this.pointerIds.length;
	            this.pointerIds[index] = id;
	          }

	          if (down) {
	            signals.fire('update-pointer-down', {
	              pointer: pointer,
	              event: event,
	              down: down,
	              pointerId: id,
	              pointerIndex: index,
	              interaction: this
	            });
	          }

	          this.pointers[index] = pointer;
	          return index;
	        };

	        Interaction.prototype.removePointer = function removePointer(pointer, event) {
	          var index = this.getPointerIndex(pointer);

	          if (index === -1) {
	            return;
	          }

	          signals.fire('remove-pointer', {
	            pointer: pointer,
	            event: event,
	            pointerIndex: index,
	            interaction: this
	          });
	          this.pointers.splice(index, 1);
	          this.pointerIds.splice(index, 1);
	          this.downTargets.splice(index, 1);
	          this.downTimes.splice(index, 1);
	        };

	        Interaction.prototype._updateEventTargets = function _updateEventTargets(target, currentTarget) {
	          this._eventTarget = target;
	          this._curEventTarget = currentTarget;
	        };

	        return Interaction;
	      }();

	      for (var _i = 0; _i < methodNames.length; _i++) {
	        var method = methodNames[_i];
	        listeners[method] = doOnInteractions(method);
	      }

	      function doOnInteractions(method) {
	        return function (event) {
	          var pointerType = utils.getPointerType(event);

	          var _utils$getEventTarget = utils.getEventTargets(event),
	              eventTarget = _utils$getEventTarget[0],
	              curEventTarget = _utils$getEventTarget[1];

	          var matches = []; // [ [pointer, interaction], ...]

	          if (browser.supportsTouch && /touch/.test(event.type)) {
	            prevTouchTime = new Date().getTime();

	            for (var _i2 = 0; _i2 < event.changedTouches.length; _i2++) {
	              var _ref2;

	              _ref2 = event.changedTouches[_i2];
	              var changedTouch = _ref2;
	              var pointer = changedTouch;
	              var interaction = finder.search(pointer, event.type, eventTarget);
	              matches.push([pointer, interaction || new Interaction({
	                pointerType: pointerType
	              })]);
	            }
	          } else {
	            var invalidPointer = false;

	            if (!browser.supportsPointerEvent && /mouse/.test(event.type)) {
	              // ignore mouse events while touch interactions are active
	              for (var i = 0; i < scope.interactions.length && !invalidPointer; i++) {
	                invalidPointer = scope.interactions[i].pointerType !== 'mouse' && scope.interactions[i].pointerIsDown;
	              } // try to ignore mouse events that are simulated by the browser
	              // after a touch event


	              invalidPointer = invalidPointer || new Date().getTime() - prevTouchTime < 500 // on iOS and Firefox Mobile, MouseEvent.timeStamp is zero if simulated
	              || event.timeStamp === 0;
	            }

	            if (!invalidPointer) {
	              var _interaction = finder.search(event, event.type, eventTarget);

	              if (!_interaction) {
	                _interaction = new Interaction({
	                  pointerType: pointerType
	                });
	              }

	              matches.push([event, _interaction]);
	            }
	          }

	          for (var _i3 = 0; _i3 < matches.length; _i3++) {
	            var _ref3 = matches[_i3];
	            var _pointer = _ref3[0];
	            var _interaction2 = _ref3[1];

	            _interaction2._updateEventTargets(eventTarget, curEventTarget);

	            _interaction2[method](_pointer, event, eventTarget, curEventTarget);
	          }
	        };
	      }

	      function endAll(event) {
	        for (var _i4 = 0; _i4 < scope.interactions.length; _i4++) {
	          var _ref4;

	          _ref4 = scope.interactions[_i4];
	          var interaction = _ref4;
	          interaction.end(event);
	          signals.fire('endall', {
	            event: event,
	            interaction: interaction
	          });
	        }
	      }

	      var docEvents = {
	        /* 'eventType': listenerFunc */
	      };
	      var pEventTypes = browser.pEventTypes;

	      if (domObjects.PointerEvent) {
	        docEvents[pEventTypes.down] = listeners.pointerDown;
	        docEvents[pEventTypes.move] = listeners.pointerMove;
	        docEvents[pEventTypes.up] = listeners.pointerUp;
	        docEvents[pEventTypes.cancel] = listeners.pointerUp;
	      } else {
	        docEvents.mousedown = listeners.pointerDown;
	        docEvents.mousemove = listeners.pointerMove;
	        docEvents.mouseup = listeners.pointerUp;
	        docEvents.touchstart = listeners.pointerDown;
	        docEvents.touchmove = listeners.pointerMove;
	        docEvents.touchend = listeners.pointerUp;
	        docEvents.touchcancel = listeners.pointerUp;
	      }

	      docEvents.blur = endAll;

	      function onDocSignal(_ref5, signalName) {
	        var doc = _ref5.doc;
	        var eventMethod = signalName.indexOf('add') === 0 ? events.add : events.remove; // delegate event listener

	        for (var eventType in scope.delegatedEvents) {
	          eventMethod(doc, eventType, events.delegateListener);
	          eventMethod(doc, eventType, events.delegateUseCapture, true);
	        }

	        for (var _eventType in docEvents) {
	          eventMethod(doc, _eventType, docEvents[_eventType], browser.isIOS ? {
	            passive: false
	          } : undefined);
	        }
	      }

	      signals.on('update-pointer-down', function (_ref6) {
	        var interaction = _ref6.interaction,
	            pointer = _ref6.pointer,
	            pointerId = _ref6.pointerId,
	            pointerIndex = _ref6.pointerIndex,
	            event = _ref6.event,
	            eventTarget = _ref6.eventTarget,
	            down = _ref6.down;
	        interaction.pointerIds[pointerIndex] = pointerId;
	        interaction.pointers[pointerIndex] = pointer;

	        if (down) {
	          interaction.pointerIsDown = true;
	        }

	        if (!interaction.interacting()) {
	          utils.setCoords(interaction.startCoords, interaction.pointers);
	          utils.copyCoords(interaction.curCoords, interaction.startCoords);
	          utils.copyCoords(interaction.prevCoords, interaction.startCoords);
	          interaction.downEvent = event;
	          interaction.downTimes[pointerIndex] = interaction.curCoords.timeStamp;
	          interaction.downTargets[pointerIndex] = eventTarget || event && utils.getEventTargets(event)[0];
	          interaction.pointerWasMoved = false;
	          utils.pointerExtend(interaction.downPointer, pointer);
	        }
	      });
	      scope.signals.on('add-document', onDocSignal);
	      scope.signals.on('remove-document', onDocSignal);
	      Interaction.pointerMoveTolerance = 1;
	      Interaction.doOnInteractions = doOnInteractions;
	      Interaction.endAll = endAll;
	      Interaction.signals = signals;
	      Interaction.docEvents = docEvents;
	      scope.endAllInteractions = endAll;
	      module.exports = Interaction;
	    }, {
	      "./scope": 33,
	      "./utils": 44,
	      "./utils/Signals": 34,
	      "./utils/browser": 36,
	      "./utils/domObjects": 38,
	      "./utils/events": 40,
	      "./utils/interactionFinder": 45
	    }],
	    6: [function (require, module, exports) {

	      var Interaction = require('../Interaction');

	      var InteractEvent = require('../InteractEvent');

	      var actions = {
	        firePrepared: firePrepared,
	        names: [],
	        methodDict: {}
	      };
	      Interaction.signals.on('action-start', function (_ref) {
	        var interaction = _ref.interaction,
	            event = _ref.event;
	        interaction._interacting = true;
	        firePrepared(interaction, event, 'start');
	      });
	      Interaction.signals.on('action-move', function (_ref2) {
	        var interaction = _ref2.interaction,
	            event = _ref2.event,
	            preEnd = _ref2.preEnd;
	        firePrepared(interaction, event, 'move', preEnd); // if the action was ended in a listener

	        if (!interaction.interacting()) {
	          return false;
	        }
	      });
	      Interaction.signals.on('action-end', function (_ref3) {
	        var interaction = _ref3.interaction,
	            event = _ref3.event;
	        firePrepared(interaction, event, 'end');
	      });

	      function firePrepared(interaction, event, phase, preEnd) {
	        var actionName = interaction.prepared.name;
	        var newEvent = new InteractEvent(interaction, event, actionName, phase, interaction.element, null, preEnd);
	        interaction.target.fire(newEvent);
	        interaction.prevEvent = newEvent;
	      }

	      module.exports = actions;
	    }, {
	      "../InteractEvent": 3,
	      "../Interaction": 5
	    }],
	    7: [function (require, module, exports) {

	      var actions = require('./base');

	      var utils = require('../utils');

	      var InteractEvent = require('../InteractEvent');
	      /** @lends Interactable */


	      var Interactable = require('../Interactable');

	      var Interaction = require('../Interaction');

	      var defaultOptions = require('../defaultOptions');

	      var drag = {
	        defaults: {
	          enabled: false,
	          mouseButtons: null,
	          origin: null,
	          snap: null,
	          restrict: null,
	          inertia: null,
	          autoScroll: null,
	          startAxis: 'xy',
	          lockAxis: 'xy'
	        },
	        checker: function checker(pointer, event, interactable) {
	          var dragOptions = interactable.options.drag;
	          return dragOptions.enabled ? {
	            name: 'drag',
	            axis: dragOptions.lockAxis === 'start' ? dragOptions.startAxis : dragOptions.lockAxis
	          } : null;
	        },
	        getCursor: function getCursor() {
	          return 'move';
	        }
	      };
	      Interaction.signals.on('before-action-move', function (_ref) {
	        var interaction = _ref.interaction;

	        if (interaction.prepared.name !== 'drag') {
	          return;
	        }

	        var axis = interaction.prepared.axis;

	        if (axis === 'x') {
	          interaction.curCoords.page.y = interaction.startCoords.page.y;
	          interaction.curCoords.client.y = interaction.startCoords.client.y;
	          interaction.pointerDelta.page.speed = Math.abs(interaction.pointerDelta.page.vx);
	          interaction.pointerDelta.client.speed = Math.abs(interaction.pointerDelta.client.vx);
	          interaction.pointerDelta.client.vy = 0;
	          interaction.pointerDelta.page.vy = 0;
	        } else if (axis === 'y') {
	          interaction.curCoords.page.x = interaction.startCoords.page.x;
	          interaction.curCoords.client.x = interaction.startCoords.client.x;
	          interaction.pointerDelta.page.speed = Math.abs(interaction.pointerDelta.page.vy);
	          interaction.pointerDelta.client.speed = Math.abs(interaction.pointerDelta.client.vy);
	          interaction.pointerDelta.client.vx = 0;
	          interaction.pointerDelta.page.vx = 0;
	        }
	      }); // dragmove

	      InteractEvent.signals.on('new', function (_ref2) {
	        var iEvent = _ref2.iEvent,
	            interaction = _ref2.interaction;

	        if (iEvent.type !== 'dragmove') {
	          return;
	        }

	        var axis = interaction.prepared.axis;

	        if (axis === 'x') {
	          iEvent.pageY = interaction.startCoords.page.y;
	          iEvent.clientY = interaction.startCoords.client.y;
	          iEvent.dy = 0;
	        } else if (axis === 'y') {
	          iEvent.pageX = interaction.startCoords.page.x;
	          iEvent.clientX = interaction.startCoords.client.x;
	          iEvent.dx = 0;
	        }
	      });
	      /**
	       * ```js
	       * interact(element).draggable({
	       *     onstart: function (event) {},
	       *     onmove : function (event) {},
	       *     onend  : function (event) {},
	       *
	       *     // the axis in which the first movement must be
	       *     // for the drag sequence to start
	       *     // 'xy' by default - any direction
	       *     startAxis: 'x' || 'y' || 'xy',
	       *
	       *     // 'xy' by default - don't restrict to one axis (move in any direction)
	       *     // 'x' or 'y' to restrict movement to either axis
	       *     // 'start' to restrict movement to the axis the drag started in
	       *     lockAxis: 'x' || 'y' || 'xy' || 'start',
	       *
	       *     // max number of drags that can happen concurrently
	       *     // with elements of this Interactable. Infinity by default
	       *     max: Infinity,
	       *
	       *     // max number of drags that can target the same element+Interactable
	       *     // 1 by default
	       *     maxPerElement: 2
	       * });
	       *
	       * var isDraggable = interact('element').draggable(); // true
	       * ```
	       *
	       * Get or set whether drag actions can be performed on the target
	       *
	       * @param {boolean | object} [options] true/false or An object with event
	       * listeners to be fired on drag events (object makes the Interactable
	       * draggable)
	       * @return {boolean | Interactable} boolean indicating if this can be the
	       * target of drag events, or this Interctable
	       */

	      Interactable.prototype.draggable = function (options) {
	        if (utils.is.object(options)) {
	          this.options.drag.enabled = options.enabled === false ? false : true;
	          this.setPerAction('drag', options);
	          this.setOnEvents('drag', options);

	          if (/^(xy|x|y|start)$/.test(options.lockAxis)) {
	            this.options.drag.lockAxis = options.lockAxis;
	          }

	          if (/^(xy|x|y)$/.test(options.startAxis)) {
	            this.options.drag.startAxis = options.startAxis;
	          }

	          return this;
	        }

	        if (utils.is.bool(options)) {
	          this.options.drag.enabled = options;

	          if (!options) {
	            this.ondragstart = this.ondragstart = this.ondragend = null;
	          }

	          return this;
	        }

	        return this.options.drag;
	      };

	      actions.drag = drag;
	      actions.names.push('drag');
	      utils.merge(Interactable.eventTypes, ['dragstart', 'dragmove', 'draginertiastart', 'draginertiaresume', 'dragend']);
	      actions.methodDict.drag = 'draggable';
	      defaultOptions.drag = drag.defaults;
	      module.exports = drag;
	    }, {
	      "../InteractEvent": 3,
	      "../Interactable": 4,
	      "../Interaction": 5,
	      "../defaultOptions": 18,
	      "../utils": 44,
	      "./base": 6
	    }],
	    8: [function (require, module, exports) {

	      var actions = require('./base');

	      var utils = require('../utils');

	      var scope = require('../scope');
	      /** @lends module:interact */


	      var interact = require('../interact');

	      var InteractEvent = require('../InteractEvent');
	      /** @lends Interactable */


	      var Interactable = require('../Interactable');

	      var Interaction = require('../Interaction');

	      var defaultOptions = require('../defaultOptions');

	      var drop = {
	        defaults: {
	          enabled: false,
	          accept: null,
	          overlap: 'pointer'
	        }
	      };
	      var dynamicDrop = false;
	      Interaction.signals.on('action-start', function (_ref) {
	        var interaction = _ref.interaction,
	            event = _ref.event;

	        if (interaction.prepared.name !== 'drag') {
	          return;
	        } // reset active dropzones


	        interaction.activeDrops.dropzones = [];
	        interaction.activeDrops.elements = [];
	        interaction.activeDrops.rects = [];
	        interaction.dropEvents = null;

	        if (!interaction.dynamicDrop) {
	          setActiveDrops(interaction.activeDrops, interaction.element);
	        }

	        var dragEvent = interaction.prevEvent;
	        var dropEvents = getDropEvents(interaction, event, dragEvent);

	        if (dropEvents.activate) {
	          fireActiveDrops(interaction.activeDrops, dropEvents.activate);
	        }
	      });
	      InteractEvent.signals.on('new', function (_ref2) {
	        var interaction = _ref2.interaction,
	            iEvent = _ref2.iEvent,
	            event = _ref2.event;

	        if (iEvent.type !== 'dragmove' && iEvent.type !== 'dragend') {
	          return;
	        }

	        var draggableElement = interaction.element;
	        var dragEvent = iEvent;
	        var dropResult = getDrop(dragEvent, event, draggableElement);
	        interaction.dropTarget = dropResult.dropzone;
	        interaction.dropElement = dropResult.element;
	        interaction.dropEvents = getDropEvents(interaction, event, dragEvent);
	      });
	      Interaction.signals.on('action-move', function (_ref3) {
	        var interaction = _ref3.interaction;

	        if (interaction.prepared.name !== 'drag') {
	          return;
	        }

	        fireDropEvents(interaction, interaction.dropEvents);
	      });
	      Interaction.signals.on('action-end', function (_ref4) {
	        var interaction = _ref4.interaction;

	        if (interaction.prepared.name === 'drag') {
	          fireDropEvents(interaction, interaction.dropEvents);
	        }
	      });
	      Interaction.signals.on('stop-drag', function (_ref5) {
	        var interaction = _ref5.interaction;
	        interaction.activeDrops = {
	          dropzones: null,
	          elements: null,
	          rects: null
	        };
	        interaction.dropEvents = null;
	      });

	      function collectDrops(activeDrops, element) {
	        var drops = [];
	        var elements = []; // collect all dropzones and their elements which qualify for a drop

	        for (var _i = 0; _i < scope.interactables.length; _i++) {
	          var _ref6;

	          _ref6 = scope.interactables[_i];
	          var current = _ref6;

	          if (!current.options.drop.enabled) {
	            continue;
	          }

	          var accept = current.options.drop.accept; // test the draggable element against the dropzone's accept setting

	          if (utils.is.element(accept) && accept !== element || utils.is.string(accept) && !utils.matchesSelector(element, accept)) {
	            continue;
	          } // query for new elements if necessary


	          var dropElements = utils.is.string(current.target) ? current._context.querySelectorAll(current.target) : [current.target];

	          for (var _i2 = 0; _i2 < dropElements.length; _i2++) {
	            var _ref7;

	            _ref7 = dropElements[_i2];
	            var currentElement = _ref7;

	            if (currentElement !== element) {
	              drops.push(current);
	              elements.push(currentElement);
	            }
	          }
	        }

	        return {
	          elements: elements,
	          dropzones: drops
	        };
	      }

	      function fireActiveDrops(activeDrops, event) {
	        var prevElement = void 0; // loop through all active dropzones and trigger event

	        for (var i = 0; i < activeDrops.dropzones.length; i++) {
	          var current = activeDrops.dropzones[i];
	          var currentElement = activeDrops.elements[i]; // prevent trigger of duplicate events on same element

	          if (currentElement !== prevElement) {
	            // set current element as event target
	            event.target = currentElement;
	            current.fire(event);
	          }

	          prevElement = currentElement;
	        }
	      } // Collect a new set of possible drops and save them in activeDrops.
	      // setActiveDrops should always be called when a drag has just started or a
	      // drag event happens while dynamicDrop is true


	      function setActiveDrops(activeDrops, dragElement) {
	        // get dropzones and their elements that could receive the draggable
	        var possibleDrops = collectDrops(activeDrops, dragElement);
	        activeDrops.dropzones = possibleDrops.dropzones;
	        activeDrops.elements = possibleDrops.elements;
	        activeDrops.rects = [];

	        for (var i = 0; i < activeDrops.dropzones.length; i++) {
	          activeDrops.rects[i] = activeDrops.dropzones[i].getRect(activeDrops.elements[i]);
	        }
	      }

	      function getDrop(dragEvent, event, dragElement) {
	        var interaction = dragEvent.interaction;
	        var validDrops = [];

	        if (dynamicDrop) {
	          setActiveDrops(interaction.activeDrops, dragElement);
	        } // collect all dropzones and their elements which qualify for a drop


	        for (var j = 0; j < interaction.activeDrops.dropzones.length; j++) {
	          var current = interaction.activeDrops.dropzones[j];
	          var currentElement = interaction.activeDrops.elements[j];
	          var rect = interaction.activeDrops.rects[j];
	          validDrops.push(current.dropCheck(dragEvent, event, interaction.target, dragElement, currentElement, rect) ? currentElement : null);
	        } // get the most appropriate dropzone based on DOM depth and order


	        var dropIndex = utils.indexOfDeepestElement(validDrops);
	        return {
	          dropzone: interaction.activeDrops.dropzones[dropIndex] || null,
	          element: interaction.activeDrops.elements[dropIndex] || null
	        };
	      }

	      function getDropEvents(interaction, pointerEvent, dragEvent) {
	        var dropEvents = {
	          enter: null,
	          leave: null,
	          activate: null,
	          deactivate: null,
	          move: null,
	          drop: null
	        };
	        var tmpl = {
	          dragEvent: dragEvent,
	          interaction: interaction,
	          target: interaction.dropElement,
	          dropzone: interaction.dropTarget,
	          relatedTarget: dragEvent.target,
	          draggable: dragEvent.interactable,
	          timeStamp: dragEvent.timeStamp
	        };

	        if (interaction.dropElement !== interaction.prevDropElement) {
	          // if there was a prevDropTarget, create a dragleave event
	          if (interaction.prevDropTarget) {
	            dropEvents.leave = utils.extend({
	              type: 'dragleave'
	            }, tmpl);
	            dragEvent.dragLeave = dropEvents.leave.target = interaction.prevDropElement;
	            dragEvent.prevDropzone = dropEvents.leave.dropzone = interaction.prevDropTarget;
	          } // if the dropTarget is not null, create a dragenter event


	          if (interaction.dropTarget) {
	            dropEvents.enter = {
	              dragEvent: dragEvent,
	              interaction: interaction,
	              target: interaction.dropElement,
	              dropzone: interaction.dropTarget,
	              relatedTarget: dragEvent.target,
	              draggable: dragEvent.interactable,
	              timeStamp: dragEvent.timeStamp,
	              type: 'dragenter'
	            };
	            dragEvent.dragEnter = interaction.dropElement;
	            dragEvent.dropzone = interaction.dropTarget;
	          }
	        }

	        if (dragEvent.type === 'dragend' && interaction.dropTarget) {
	          dropEvents.drop = utils.extend({
	            type: 'drop'
	          }, tmpl);
	          dragEvent.dropzone = interaction.dropTarget;
	          dragEvent.relatedTarget = interaction.dropElement;
	        }

	        if (dragEvent.type === 'dragstart') {
	          dropEvents.activate = utils.extend({
	            type: 'dropactivate'
	          }, tmpl);
	          dropEvents.activate.target = null;
	          dropEvents.activate.dropzone = null;
	        }

	        if (dragEvent.type === 'dragend') {
	          dropEvents.deactivate = utils.extend({
	            type: 'dropdeactivate'
	          }, tmpl);
	          dropEvents.deactivate.target = null;
	          dropEvents.deactivate.dropzone = null;
	        }

	        if (dragEvent.type === 'dragmove' && interaction.dropTarget) {
	          dropEvents.move = utils.extend({
	            dragmove: dragEvent,
	            type: 'dropmove'
	          }, tmpl);
	          dragEvent.dropzone = interaction.dropTarget;
	        }

	        return dropEvents;
	      }

	      function fireDropEvents(interaction, dropEvents) {
	        var activeDrops = interaction.activeDrops,
	            prevDropTarget = interaction.prevDropTarget,
	            dropTarget = interaction.dropTarget,
	            dropElement = interaction.dropElement;

	        if (dropEvents.leave) {
	          prevDropTarget.fire(dropEvents.leave);
	        }

	        if (dropEvents.move) {
	          dropTarget.fire(dropEvents.move);
	        }

	        if (dropEvents.enter) {
	          dropTarget.fire(dropEvents.enter);
	        }

	        if (dropEvents.drop) {
	          dropTarget.fire(dropEvents.drop);
	        }

	        if (dropEvents.deactivate) {
	          fireActiveDrops(activeDrops, dropEvents.deactivate);
	        }

	        interaction.prevDropTarget = dropTarget;
	        interaction.prevDropElement = dropElement;
	      }
	      /**
	       * ```js
	       * interact(target)
	       * .dropChecker(function(dragEvent,         // related dragmove or dragend event
	       *                       event,             // TouchEvent/PointerEvent/MouseEvent
	       *                       dropped,           // bool result of the default checker
	       *                       dropzone,          // dropzone Interactable
	       *                       dropElement,       // dropzone elemnt
	       *                       draggable,         // draggable Interactable
	       *                       draggableElement) {// draggable element
	       *
	       *   return dropped && event.target.hasAttribute('allow-drop');
	       * }
	       * ```
	       *
	       * ```js
	       * interact('.drop').dropzone({
	       *   accept: '.can-drop' || document.getElementById('single-drop'),
	       *   overlap: 'pointer' || 'center' || zeroToOne
	       * }
	       * ```
	       *
	       * Returns or sets whether draggables can be dropped onto this target to
	       * trigger drop events
	       *
	       * Dropzones can receive the following events:
	       *  - `dropactivate` and `dropdeactivate` when an acceptable drag starts and ends
	       *  - `dragenter` and `dragleave` when a draggable enters and leaves the dropzone
	       *  - `dragmove` when a draggable that has entered the dropzone is moved
	       *  - `drop` when a draggable is dropped into this dropzone
	       *
	       * Use the `accept` option to allow only elements that match the given CSS
	       * selector or element. The value can be:
	       *
	       *  - **an Element** - only that element can be dropped into this dropzone.
	       *  - **a string**, - the element being dragged must match it as a CSS selector.
	       *  - **`null`** - accept options is cleared - it accepts any element.
	       *
	       * Use the `overlap` option to set how drops are checked for. The allowed
	       * values are:
	       *
	       *   - `'pointer'`, the pointer must be over the dropzone (default)
	       *   - `'center'`, the draggable element's center must be over the dropzone
	       *   - a number from 0-1 which is the `(intersection area) / (draggable area)`.
	       *   e.g. `0.5` for drop to happen when half of the area of the draggable is
	       *   over the dropzone
	       *
	       * Use the `checker` option to specify a function to check if a dragged element
	       * is over this Interactable.
	       *
	       * @param {boolean | object | null} [options] The new options to be set.
	       * @return {boolean | Interactable} The current setting or this Interactable
	       */


	      Interactable.prototype.dropzone = function (options) {
	        if (utils.is.object(options)) {
	          this.options.drop.enabled = options.enabled === false ? false : true;

	          if (utils.is.function(options.ondrop)) {
	            this.events.ondrop = options.ondrop;
	          }

	          if (utils.is.function(options.ondropactivate)) {
	            this.events.ondropactivate = options.ondropactivate;
	          }

	          if (utils.is.function(options.ondropdeactivate)) {
	            this.events.ondropdeactivate = options.ondropdeactivate;
	          }

	          if (utils.is.function(options.ondragenter)) {
	            this.events.ondragenter = options.ondragenter;
	          }

	          if (utils.is.function(options.ondragleave)) {
	            this.events.ondragleave = options.ondragleave;
	          }

	          if (utils.is.function(options.ondropmove)) {
	            this.events.ondropmove = options.ondropmove;
	          }

	          if (/^(pointer|center)$/.test(options.overlap)) {
	            this.options.drop.overlap = options.overlap;
	          } else if (utils.is.number(options.overlap)) {
	            this.options.drop.overlap = Math.max(Math.min(1, options.overlap), 0);
	          }

	          if ('accept' in options) {
	            this.options.drop.accept = options.accept;
	          }

	          if ('checker' in options) {
	            this.options.drop.checker = options.checker;
	          }

	          return this;
	        }

	        if (utils.is.bool(options)) {
	          this.options.drop.enabled = options;

	          if (!options) {
	            this.ondragenter = this.ondragleave = this.ondrop = this.ondropactivate = this.ondropdeactivate = null;
	          }

	          return this;
	        }

	        return this.options.drop;
	      };

	      Interactable.prototype.dropCheck = function (dragEvent, event, draggable, draggableElement, dropElement, rect) {
	        var dropped = false; // if the dropzone has no rect (eg. display: none)
	        // call the custom dropChecker or just return false

	        if (!(rect = rect || this.getRect(dropElement))) {
	          return this.options.drop.checker ? this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement) : false;
	        }

	        var dropOverlap = this.options.drop.overlap;

	        if (dropOverlap === 'pointer') {
	          var origin = utils.getOriginXY(draggable, draggableElement, 'drag');
	          var page = utils.getPageXY(dragEvent);
	          page.x += origin.x;
	          page.y += origin.y;
	          var horizontal = page.x > rect.left && page.x < rect.right;
	          var vertical = page.y > rect.top && page.y < rect.bottom;
	          dropped = horizontal && vertical;
	        }

	        var dragRect = draggable.getRect(draggableElement);

	        if (dragRect && dropOverlap === 'center') {
	          var cx = dragRect.left + dragRect.width / 2;
	          var cy = dragRect.top + dragRect.height / 2;
	          dropped = cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
	        }

	        if (dragRect && utils.is.number(dropOverlap)) {
	          var overlapArea = Math.max(0, Math.min(rect.right, dragRect.right) - Math.max(rect.left, dragRect.left)) * Math.max(0, Math.min(rect.bottom, dragRect.bottom) - Math.max(rect.top, dragRect.top));
	          var overlapRatio = overlapArea / (dragRect.width * dragRect.height);
	          dropped = overlapRatio >= dropOverlap;
	        }

	        if (this.options.drop.checker) {
	          dropped = this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement);
	        }

	        return dropped;
	      };

	      Interactable.signals.on('unset', function (_ref8) {
	        var interactable = _ref8.interactable;
	        interactable.dropzone(false);
	      });
	      Interactable.settingsMethods.push('dropChecker');
	      Interaction.signals.on('new', function (interaction) {
	        interaction.dropTarget = null; // the dropzone a drag target might be dropped into

	        interaction.dropElement = null; // the element at the time of checking

	        interaction.prevDropTarget = null; // the dropzone that was recently dragged away from

	        interaction.prevDropElement = null; // the element at the time of checking

	        interaction.dropEvents = null; // the dropEvents related to the current drag event

	        interaction.activeDrops = {
	          dropzones: [],
	          // the dropzones that are mentioned below
	          elements: [],
	          // elements of dropzones that accept the target draggable
	          rects: [] // the rects of the elements mentioned above

	        };
	      });
	      Interaction.signals.on('stop', function (_ref9) {
	        var interaction = _ref9.interaction;
	        interaction.dropTarget = interaction.dropElement = interaction.prevDropTarget = interaction.prevDropElement = null;
	      });
	      /**
	       * Returns or sets whether the dimensions of dropzone elements are calculated
	       * on every dragmove or only on dragstart for the default dropChecker
	       *
	       * @param {boolean} [newValue] True to check on each move. False to check only
	       * before start
	       * @return {boolean | interact} The current setting or interact
	       */

	      interact.dynamicDrop = function (newValue) {
	        if (utils.is.bool(newValue)) {
	          //if (dragging && dynamicDrop !== newValue && !newValue) {
	          //calcRects(dropzones);
	          //}
	          dynamicDrop = newValue;
	          return interact;
	        }

	        return dynamicDrop;
	      };

	      utils.merge(Interactable.eventTypes, ['dragenter', 'dragleave', 'dropactivate', 'dropdeactivate', 'dropmove', 'drop']);
	      actions.methodDict.drop = 'dropzone';
	      defaultOptions.drop = drop.defaults;
	      module.exports = drop;
	    }, {
	      "../InteractEvent": 3,
	      "../Interactable": 4,
	      "../Interaction": 5,
	      "../defaultOptions": 18,
	      "../interact": 21,
	      "../scope": 33,
	      "../utils": 44,
	      "./base": 6
	    }],
	    9: [function (require, module, exports) {

	      var actions = require('./base');

	      var utils = require('../utils');

	      var InteractEvent = require('../InteractEvent');

	      var Interactable = require('../Interactable');

	      var Interaction = require('../Interaction');

	      var defaultOptions = require('../defaultOptions');

	      var gesture = {
	        defaults: {
	          enabled: false,
	          origin: null,
	          restrict: null
	        },
	        checker: function checker(pointer, event, interactable, element, interaction) {
	          if (interaction.pointerIds.length >= 2) {
	            return {
	              name: 'gesture'
	            };
	          }

	          return null;
	        },
	        getCursor: function getCursor() {
	          return '';
	        }
	      };
	      InteractEvent.signals.on('new', function (_ref) {
	        var iEvent = _ref.iEvent,
	            interaction = _ref.interaction;

	        if (iEvent.type !== 'gesturestart') {
	          return;
	        }

	        iEvent.ds = 0;
	        interaction.gesture.startDistance = interaction.gesture.prevDistance = iEvent.distance;
	        interaction.gesture.startAngle = interaction.gesture.prevAngle = iEvent.angle;
	        interaction.gesture.scale = 1;
	      });
	      InteractEvent.signals.on('new', function (_ref2) {
	        var iEvent = _ref2.iEvent,
	            interaction = _ref2.interaction;

	        if (iEvent.type !== 'gesturemove') {
	          return;
	        }

	        iEvent.ds = iEvent.scale - interaction.gesture.scale;
	        interaction.target.fire(iEvent);
	        interaction.gesture.prevAngle = iEvent.angle;
	        interaction.gesture.prevDistance = iEvent.distance;

	        if (iEvent.scale !== Infinity && iEvent.scale !== null && iEvent.scale !== undefined && !isNaN(iEvent.scale)) {
	          interaction.gesture.scale = iEvent.scale;
	        }
	      });
	      /**
	       * ```js
	       * interact(element).gesturable({
	       *     onstart: function (event) {},
	       *     onmove : function (event) {},
	       *     onend  : function (event) {},
	       *
	       *     // limit multiple gestures.
	       *     // See the explanation in {@link Interactable.draggable} example
	       *     max: Infinity,
	       *     maxPerElement: 1,
	       * });
	       *
	       * var isGestureable = interact(element).gesturable();
	       * ```
	       *
	       * Gets or sets whether multitouch gestures can be performed on the target
	       *
	       * @param {boolean | object} [options] true/false or An object with event
	       * listeners to be fired on gesture events (makes the Interactable gesturable)
	       * @return {boolean | Interactable} A boolean indicating if this can be the
	       * target of gesture events, or this Interactable
	       */

	      Interactable.prototype.gesturable = function (options) {
	        if (utils.is.object(options)) {
	          this.options.gesture.enabled = options.enabled === false ? false : true;
	          this.setPerAction('gesture', options);
	          this.setOnEvents('gesture', options);
	          return this;
	        }

	        if (utils.is.bool(options)) {
	          this.options.gesture.enabled = options;

	          if (!options) {
	            this.ongesturestart = this.ongesturestart = this.ongestureend = null;
	          }

	          return this;
	        }

	        return this.options.gesture;
	      };

	      InteractEvent.signals.on('set-delta', function (_ref3) {
	        var interaction = _ref3.interaction,
	            iEvent = _ref3.iEvent,
	            action = _ref3.action,
	            event = _ref3.event,
	            starting = _ref3.starting,
	            ending = _ref3.ending,
	            deltaSource = _ref3.deltaSource;

	        if (action !== 'gesture') {
	          return;
	        }

	        var pointers = interaction.pointers;
	        iEvent.touches = [pointers[0], pointers[1]];

	        if (starting) {
	          iEvent.distance = utils.touchDistance(pointers, deltaSource);
	          iEvent.box = utils.touchBBox(pointers);
	          iEvent.scale = 1;
	          iEvent.ds = 0;
	          iEvent.angle = utils.touchAngle(pointers, undefined, deltaSource);
	          iEvent.da = 0;
	        } else if (ending || event instanceof InteractEvent) {
	          iEvent.distance = interaction.prevEvent.distance;
	          iEvent.box = interaction.prevEvent.box;
	          iEvent.scale = interaction.prevEvent.scale;
	          iEvent.ds = iEvent.scale - 1;
	          iEvent.angle = interaction.prevEvent.angle;
	          iEvent.da = iEvent.angle - interaction.gesture.startAngle;
	        } else {
	          iEvent.distance = utils.touchDistance(pointers, deltaSource);
	          iEvent.box = utils.touchBBox(pointers);
	          iEvent.scale = iEvent.distance / interaction.gesture.startDistance;
	          iEvent.angle = utils.touchAngle(pointers, interaction.gesture.prevAngle, deltaSource);
	          iEvent.ds = iEvent.scale - interaction.gesture.prevScale;
	          iEvent.da = iEvent.angle - interaction.gesture.prevAngle;
	        }
	      });
	      Interaction.signals.on('new', function (interaction) {
	        interaction.gesture = {
	          start: {
	            x: 0,
	            y: 0
	          },
	          startDistance: 0,
	          // distance between two touches of touchStart
	          prevDistance: 0,
	          distance: 0,
	          scale: 1,
	          // gesture.distance / gesture.startDistance
	          startAngle: 0,
	          // angle of line joining two touches
	          prevAngle: 0 // angle of the previous gesture event

	        };
	      });
	      actions.gesture = gesture;
	      actions.names.push('gesture');
	      utils.merge(Interactable.eventTypes, ['gesturestart', 'gesturemove', 'gestureend']);
	      actions.methodDict.gesture = 'gesturable';
	      defaultOptions.gesture = gesture.defaults;
	      module.exports = gesture;
	    }, {
	      "../InteractEvent": 3,
	      "../Interactable": 4,
	      "../Interaction": 5,
	      "../defaultOptions": 18,
	      "../utils": 44,
	      "./base": 6
	    }],
	    10: [function (require, module, exports) {

	      var actions = require('./base');

	      var utils = require('../utils');

	      var browser = require('../utils/browser');

	      var InteractEvent = require('../InteractEvent');
	      /** @lends Interactable */


	      var Interactable = require('../Interactable');

	      var Interaction = require('../Interaction');

	      var defaultOptions = require('../defaultOptions'); // Less Precision with touch input


	      var defaultMargin = browser.supportsTouch || browser.supportsPointerEvent ? 20 : 10;
	      var resize = {
	        defaults: {
	          enabled: false,
	          mouseButtons: null,
	          origin: null,
	          snap: null,
	          restrict: null,
	          inertia: null,
	          autoScroll: null,
	          square: false,
	          preserveAspectRatio: false,
	          axis: 'xy',
	          // use default margin
	          margin: NaN,
	          // object with props left, right, top, bottom which are
	          // true/false values to resize when the pointer is over that edge,
	          // CSS selectors to match the handles for each direction
	          // or the Elements for each handle
	          edges: null,
	          // a value of 'none' will limit the resize rect to a minimum of 0x0
	          // 'negate' will alow the rect to have negative width/height
	          // 'reposition' will keep the width/height positive by swapping
	          // the top and bottom edges and/or swapping the left and right edges
	          invert: 'none'
	        },
	        checker: function checker(pointer, event, interactable, element, interaction, rect) {
	          if (!rect) {
	            return null;
	          }

	          var page = utils.extend({}, interaction.curCoords.page);
	          var options = interactable.options;

	          if (options.resize.enabled) {
	            var resizeOptions = options.resize;
	            var resizeEdges = {
	              left: false,
	              right: false,
	              top: false,
	              bottom: false
	            }; // if using resize.edges

	            if (utils.is.object(resizeOptions.edges)) {
	              for (var edge in resizeEdges) {
	                resizeEdges[edge] = checkResizeEdge(edge, resizeOptions.edges[edge], page, interaction._eventTarget, element, rect, resizeOptions.margin || defaultMargin);
	              }

	              resizeEdges.left = resizeEdges.left && !resizeEdges.right;
	              resizeEdges.top = resizeEdges.top && !resizeEdges.bottom;

	              if (resizeEdges.left || resizeEdges.right || resizeEdges.top || resizeEdges.bottom) {
	                return {
	                  name: 'resize',
	                  edges: resizeEdges
	                };
	              }
	            } else {
	              var right = options.resize.axis !== 'y' && page.x > rect.right - defaultMargin;
	              var bottom = options.resize.axis !== 'x' && page.y > rect.bottom - defaultMargin;

	              if (right || bottom) {
	                return {
	                  name: 'resize',
	                  axes: (right ? 'x' : '') + (bottom ? 'y' : '')
	                };
	              }
	            }
	          }

	          return null;
	        },
	        cursors: browser.isIe9 ? {
	          x: 'e-resize',
	          y: 's-resize',
	          xy: 'se-resize',
	          top: 'n-resize',
	          left: 'w-resize',
	          bottom: 's-resize',
	          right: 'e-resize',
	          topleft: 'se-resize',
	          bottomright: 'se-resize',
	          topright: 'ne-resize',
	          bottomleft: 'ne-resize'
	        } : {
	          x: 'ew-resize',
	          y: 'ns-resize',
	          xy: 'nwse-resize',
	          top: 'ns-resize',
	          left: 'ew-resize',
	          bottom: 'ns-resize',
	          right: 'ew-resize',
	          topleft: 'nwse-resize',
	          bottomright: 'nwse-resize',
	          topright: 'nesw-resize',
	          bottomleft: 'nesw-resize'
	        },
	        getCursor: function getCursor(action) {
	          if (action.axis) {
	            return resize.cursors[action.name + action.axis];
	          } else if (action.edges) {
	            var cursorKey = '';
	            var edgeNames = ['top', 'bottom', 'left', 'right'];

	            for (var i = 0; i < 4; i++) {
	              if (action.edges[edgeNames[i]]) {
	                cursorKey += edgeNames[i];
	              }
	            }

	            return resize.cursors[cursorKey];
	          }
	        }
	      }; // resizestart

	      InteractEvent.signals.on('new', function (_ref) {
	        var iEvent = _ref.iEvent,
	            interaction = _ref.interaction;

	        if (iEvent.type !== 'resizestart' || !interaction.prepared.edges) {
	          return;
	        }

	        var startRect = interaction.target.getRect(interaction.element);
	        var resizeOptions = interaction.target.options.resize;
	        /*
	         * When using the `resizable.square` or `resizable.preserveAspectRatio` options, resizing from one edge
	         * will affect another. E.g. with `resizable.square`, resizing to make the right edge larger will make
	         * the bottom edge larger by the same amount. We call these 'linked' edges. Any linked edges will depend
	         * on the active edges and the edge being interacted with.
	         */

	        if (resizeOptions.square || resizeOptions.preserveAspectRatio) {
	          var linkedEdges = utils.extend({}, interaction.prepared.edges);
	          linkedEdges.top = linkedEdges.top || linkedEdges.left && !linkedEdges.bottom;
	          linkedEdges.left = linkedEdges.left || linkedEdges.top && !linkedEdges.right;
	          linkedEdges.bottom = linkedEdges.bottom || linkedEdges.right && !linkedEdges.top;
	          linkedEdges.right = linkedEdges.right || linkedEdges.bottom && !linkedEdges.left;
	          interaction.prepared._linkedEdges = linkedEdges;
	        } else {
	          interaction.prepared._linkedEdges = null;
	        } // if using `resizable.preserveAspectRatio` option, record aspect ratio at the start of the resize


	        if (resizeOptions.preserveAspectRatio) {
	          interaction.resizeStartAspectRatio = startRect.width / startRect.height;
	        }

	        interaction.resizeRects = {
	          start: startRect,
	          current: utils.extend({}, startRect),
	          inverted: utils.extend({}, startRect),
	          previous: utils.extend({}, startRect),
	          delta: {
	            left: 0,
	            right: 0,
	            width: 0,
	            top: 0,
	            bottom: 0,
	            height: 0
	          }
	        };
	        iEvent.rect = interaction.resizeRects.inverted;
	        iEvent.deltaRect = interaction.resizeRects.delta;
	      }); // resizemove

	      InteractEvent.signals.on('new', function (_ref2) {
	        var iEvent = _ref2.iEvent,
	            phase = _ref2.phase,
	            interaction = _ref2.interaction;

	        if (phase !== 'move' || !interaction.prepared.edges) {
	          return;
	        }

	        var resizeOptions = interaction.target.options.resize;
	        var invert = resizeOptions.invert;
	        var invertible = invert === 'reposition' || invert === 'negate';
	        var edges = interaction.prepared.edges;
	        var start = interaction.resizeRects.start;
	        var current = interaction.resizeRects.current;
	        var inverted = interaction.resizeRects.inverted;
	        var delta = interaction.resizeRects.delta;
	        var previous = utils.extend(interaction.resizeRects.previous, inverted);
	        var originalEdges = edges;
	        var dx = iEvent.dx;
	        var dy = iEvent.dy;

	        if (resizeOptions.preserveAspectRatio || resizeOptions.square) {
	          // `resize.preserveAspectRatio` takes precedence over `resize.square`
	          var startAspectRatio = resizeOptions.preserveAspectRatio ? interaction.resizeStartAspectRatio : 1;
	          edges = interaction.prepared._linkedEdges;

	          if (originalEdges.left && originalEdges.bottom || originalEdges.right && originalEdges.top) {
	            dy = -dx / startAspectRatio;
	          } else if (originalEdges.left || originalEdges.right) {
	            dy = dx / startAspectRatio;
	          } else if (originalEdges.top || originalEdges.bottom) {
	            dx = dy * startAspectRatio;
	          }
	        } // update the 'current' rect without modifications


	        if (edges.top) {
	          current.top += dy;
	        }

	        if (edges.bottom) {
	          current.bottom += dy;
	        }

	        if (edges.left) {
	          current.left += dx;
	        }

	        if (edges.right) {
	          current.right += dx;
	        }

	        if (invertible) {
	          // if invertible, copy the current rect
	          utils.extend(inverted, current);

	          if (invert === 'reposition') {
	            // swap edge values if necessary to keep width/height positive
	            var swap = void 0;

	            if (inverted.top > inverted.bottom) {
	              swap = inverted.top;
	              inverted.top = inverted.bottom;
	              inverted.bottom = swap;
	            }

	            if (inverted.left > inverted.right) {
	              swap = inverted.left;
	              inverted.left = inverted.right;
	              inverted.right = swap;
	            }
	          }
	        } else {
	          // if not invertible, restrict to minimum of 0x0 rect
	          inverted.top = Math.min(current.top, start.bottom);
	          inverted.bottom = Math.max(current.bottom, start.top);
	          inverted.left = Math.min(current.left, start.right);
	          inverted.right = Math.max(current.right, start.left);
	        }

	        inverted.width = inverted.right - inverted.left;
	        inverted.height = inverted.bottom - inverted.top;

	        for (var edge in inverted) {
	          delta[edge] = inverted[edge] - previous[edge];
	        }

	        iEvent.edges = interaction.prepared.edges;
	        iEvent.rect = inverted;
	        iEvent.deltaRect = delta;
	      });
	      /**
	       * ```js
	       * interact(element).resizable({
	       *   onstart: function (event) {},
	       *   onmove : function (event) {},
	       *   onend  : function (event) {},
	       *
	       *   edges: {
	       *     top   : true,       // Use pointer coords to check for resize.
	       *     left  : false,      // Disable resizing from left edge.
	       *     bottom: '.resize-s',// Resize if pointer target matches selector
	       *     right : handleEl    // Resize if pointer target is the given Element
	       *   },
	       *
	       *     // Width and height can be adjusted independently. When `true`, width and
	       *     // height are adjusted at a 1:1 ratio.
	       *     square: false,
	       *
	       *     // Width and height can be adjusted independently. When `true`, width and
	       *     // height maintain the aspect ratio they had when resizing started.
	       *     preserveAspectRatio: false,
	       *
	       *   // a value of 'none' will limit the resize rect to a minimum of 0x0
	       *   // 'negate' will allow the rect to have negative width/height
	       *   // 'reposition' will keep the width/height positive by swapping
	       *   // the top and bottom edges and/or swapping the left and right edges
	       *   invert: 'none' || 'negate' || 'reposition'
	       *
	       *   // limit multiple resizes.
	       *   // See the explanation in the {@link Interactable.draggable} example
	       *   max: Infinity,
	       *   maxPerElement: 1,
	       * });
	       *
	       * var isResizeable = interact(element).resizable();
	       * ```
	       *
	       * Gets or sets whether resize actions can be performed on the target
	       *
	       * @param {boolean | object} [options] true/false or An object with event
	       * listeners to be fired on resize events (object makes the Interactable
	       * resizable)
	       * @return {boolean | Interactable} A boolean indicating if this can be the
	       * target of resize elements, or this Interactable
	       */

	      Interactable.prototype.resizable = function (options) {
	        if (utils.is.object(options)) {
	          this.options.resize.enabled = options.enabled === false ? false : true;
	          this.setPerAction('resize', options);
	          this.setOnEvents('resize', options);

	          if (/^x$|^y$|^xy$/.test(options.axis)) {
	            this.options.resize.axis = options.axis;
	          } else if (options.axis === null) {
	            this.options.resize.axis = defaultOptions.resize.axis;
	          }

	          if (utils.is.bool(options.preserveAspectRatio)) {
	            this.options.resize.preserveAspectRatio = options.preserveAspectRatio;
	          } else if (utils.is.bool(options.square)) {
	            this.options.resize.square = options.square;
	          }

	          return this;
	        }

	        if (utils.is.bool(options)) {
	          this.options.resize.enabled = options;

	          if (!options) {
	            this.onresizestart = this.onresizestart = this.onresizeend = null;
	          }

	          return this;
	        }

	        return this.options.resize;
	      };

	      function checkResizeEdge(name, value, page, element, interactableElement, rect, margin) {
	        // false, '', undefined, null
	        if (!value) {
	          return false;
	        } // true value, use pointer coords and element rect


	        if (value === true) {
	          // if dimensions are negative, "switch" edges
	          var width = utils.is.number(rect.width) ? rect.width : rect.right - rect.left;
	          var height = utils.is.number(rect.height) ? rect.height : rect.bottom - rect.top;

	          if (width < 0) {
	            if (name === 'left') {
	              name = 'right';
	            } else if (name === 'right') {
	              name = 'left';
	            }
	          }

	          if (height < 0) {
	            if (name === 'top') {
	              name = 'bottom';
	            } else if (name === 'bottom') {
	              name = 'top';
	            }
	          }

	          if (name === 'left') {
	            return page.x < (width >= 0 ? rect.left : rect.right) + margin;
	          }

	          if (name === 'top') {
	            return page.y < (height >= 0 ? rect.top : rect.bottom) + margin;
	          }

	          if (name === 'right') {
	            return page.x > (width >= 0 ? rect.right : rect.left) - margin;
	          }

	          if (name === 'bottom') {
	            return page.y > (height >= 0 ? rect.bottom : rect.top) - margin;
	          }
	        } // the remaining checks require an element


	        if (!utils.is.element(element)) {
	          return false;
	        }

	        return utils.is.element(value) // the value is an element to use as a resize handle
	        ? value === element // otherwise check if element matches value as selector
	        : utils.matchesUpTo(element, value, interactableElement);
	      }

	      Interaction.signals.on('new', function (interaction) {
	        interaction.resizeAxes = 'xy';
	      });
	      InteractEvent.signals.on('set-delta', function (_ref3) {
	        var interaction = _ref3.interaction,
	            iEvent = _ref3.iEvent,
	            action = _ref3.action;

	        if (action !== 'resize' || !interaction.resizeAxes) {
	          return;
	        }

	        var options = interaction.target.options;

	        if (options.resize.square) {
	          if (interaction.resizeAxes === 'y') {
	            iEvent.dx = iEvent.dy;
	          } else {
	            iEvent.dy = iEvent.dx;
	          }

	          iEvent.axes = 'xy';
	        } else {
	          iEvent.axes = interaction.resizeAxes;

	          if (interaction.resizeAxes === 'x') {
	            iEvent.dy = 0;
	          } else if (interaction.resizeAxes === 'y') {
	            iEvent.dx = 0;
	          }
	        }
	      });
	      actions.resize = resize;
	      actions.names.push('resize');
	      utils.merge(Interactable.eventTypes, ['resizestart', 'resizemove', 'resizeinertiastart', 'resizeinertiaresume', 'resizeend']);
	      actions.methodDict.resize = 'resizable';
	      defaultOptions.resize = resize.defaults;
	      module.exports = resize;
	    }, {
	      "../InteractEvent": 3,
	      "../Interactable": 4,
	      "../Interaction": 5,
	      "../defaultOptions": 18,
	      "../utils": 44,
	      "../utils/browser": 36,
	      "./base": 6
	    }],
	    11: [function (require, module, exports) {

	      var raf = require('./utils/raf');

	      var getWindow = require('./utils/window').getWindow;

	      var is = require('./utils/is');

	      var domUtils = require('./utils/domUtils');

	      var Interaction = require('./Interaction');

	      var defaultOptions = require('./defaultOptions');

	      var autoScroll = {
	        defaults: {
	          enabled: false,
	          container: null,
	          // the item that is scrolled (Window or HTMLElement)
	          margin: 60,
	          speed: 300 // the scroll speed in pixels per second

	        },
	        interaction: null,
	        i: null,
	        // the handle returned by window.setInterval
	        x: 0,
	        y: 0,
	        // Direction each pulse is to scroll in
	        isScrolling: false,
	        prevTime: 0,
	        start: function start(interaction) {
	          autoScroll.isScrolling = true;
	          raf.cancel(autoScroll.i);
	          autoScroll.interaction = interaction;
	          autoScroll.prevTime = new Date().getTime();
	          autoScroll.i = raf.request(autoScroll.scroll);
	        },
	        stop: function stop() {
	          autoScroll.isScrolling = false;
	          raf.cancel(autoScroll.i);
	        },
	        // scroll the window by the values in scroll.x/y
	        scroll: function scroll() {
	          var options = autoScroll.interaction.target.options[autoScroll.interaction.prepared.name].autoScroll;
	          var container = options.container || getWindow(autoScroll.interaction.element);
	          var now = new Date().getTime(); // change in time in seconds

	          var dt = (now - autoScroll.prevTime) / 1000; // displacement

	          var s = options.speed * dt;

	          if (s >= 1) {
	            if (is.window(container)) {
	              container.scrollBy(autoScroll.x * s, autoScroll.y * s);
	            } else if (container) {
	              container.scrollLeft += autoScroll.x * s;
	              container.scrollTop += autoScroll.y * s;
	            }

	            autoScroll.prevTime = now;
	          }

	          if (autoScroll.isScrolling) {
	            raf.cancel(autoScroll.i);
	            autoScroll.i = raf.request(autoScroll.scroll);
	          }
	        },
	        check: function check(interactable, actionName) {
	          var options = interactable.options;
	          return options[actionName].autoScroll && options[actionName].autoScroll.enabled;
	        },
	        onInteractionMove: function onInteractionMove(_ref) {
	          var interaction = _ref.interaction,
	              pointer = _ref.pointer;

	          if (!(interaction.interacting() && autoScroll.check(interaction.target, interaction.prepared.name))) {
	            return;
	          }

	          if (interaction.simulation) {
	            autoScroll.x = autoScroll.y = 0;
	            return;
	          }

	          var top = void 0;
	          var right = void 0;
	          var bottom = void 0;
	          var left = void 0;
	          var options = interaction.target.options[interaction.prepared.name].autoScroll;
	          var container = options.container || getWindow(interaction.element);

	          if (is.window(container)) {
	            left = pointer.clientX < autoScroll.margin;
	            top = pointer.clientY < autoScroll.margin;
	            right = pointer.clientX > container.innerWidth - autoScroll.margin;
	            bottom = pointer.clientY > container.innerHeight - autoScroll.margin;
	          } else {
	            var rect = domUtils.getElementClientRect(container);
	            left = pointer.clientX < rect.left + autoScroll.margin;
	            top = pointer.clientY < rect.top + autoScroll.margin;
	            right = pointer.clientX > rect.right - autoScroll.margin;
	            bottom = pointer.clientY > rect.bottom - autoScroll.margin;
	          }

	          autoScroll.x = right ? 1 : left ? -1 : 0;
	          autoScroll.y = bottom ? 1 : top ? -1 : 0;

	          if (!autoScroll.isScrolling) {
	            // set the autoScroll properties to those of the target
	            autoScroll.margin = options.margin;
	            autoScroll.speed = options.speed;
	            autoScroll.start(interaction);
	          }
	        }
	      };
	      Interaction.signals.on('stop-active', function () {
	        autoScroll.stop();
	      });
	      Interaction.signals.on('action-move', autoScroll.onInteractionMove);
	      defaultOptions.perAction.autoScroll = autoScroll.defaults;
	      module.exports = autoScroll;
	    }, {
	      "./Interaction": 5,
	      "./defaultOptions": 18,
	      "./utils/domUtils": 39,
	      "./utils/is": 46,
	      "./utils/raf": 50,
	      "./utils/window": 52
	    }],
	    12: [function (require, module, exports) {
	      /** @lends Interactable */

	      var Interactable = require('../Interactable');

	      var actions = require('../actions/base');

	      var is = require('../utils/is');

	      var domUtils = require('../utils/domUtils');

	      var _require = require('../utils'),
	          warnOnce = _require.warnOnce;

	      Interactable.prototype.getAction = function (pointer, event, interaction, element) {
	        var action = this.defaultActionChecker(pointer, event, interaction, element);

	        if (this.options.actionChecker) {
	          return this.options.actionChecker(pointer, event, action, this, element, interaction);
	        }

	        return action;
	      };
	      /**
	       * ```js
	       * interact(element, { ignoreFrom: document.getElementById('no-action') });
	       * // or
	       * interact(element).ignoreFrom('input, textarea, a');
	       * ```
	       * @deprecated
	       * If the target of the `mousedown`, `pointerdown` or `touchstart` event or any
	       * of it's parents match the given CSS selector or Element, no
	       * drag/resize/gesture is started.
	       *
	       * Don't use this method. Instead set the `ignoreFrom` option for each action
	       * or for `pointerEvents`
	       *
	       * @example
	       * interact(targett)
	       *   .draggable({
	       *     ignoreFrom: 'input, textarea, a[href]'',
	       *   })
	       *   .pointerEvents({
	       *     ignoreFrom: '[no-pointer]',
	       *   });
	       *
	       * @param {string | Element | null} [newValue] a CSS selector string, an
	       * Element or `null` to not ignore any elements
	       * @return {string | Element | object} The current ignoreFrom value or this
	       * Interactable
	       */


	      Interactable.prototype.ignoreFrom = warnOnce(function (newValue) {
	        return this._backCompatOption('ignoreFrom', newValue);
	      }, 'Interactable.ignoreForm() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue}).');
	      /**
	       * ```js
	       *
	       * @deprecated
	       * A drag/resize/gesture is started only If the target of the `mousedown`,
	       * `pointerdown` or `touchstart` event or any of it's parents match the given
	       * CSS selector or Element.
	       *
	       * Don't use this method. Instead set the `allowFrom` option for each action
	       * or for `pointerEvents`
	       *
	       * @example
	       * interact(targett)
	       *   .resizable({
	       *     allowFrom: '.resize-handle',
	       *   .pointerEvents({
	       *     allowFrom: '.handle',,
	       *   });
	       *
	       * @param {string | Element | null} [newValue] a CSS selector string, an
	       * Element or `null` to allow from any element
	       * @return {string | Element | object} The current allowFrom value or this
	       * Interactable
	       */

	      Interactable.prototype.allowFrom = warnOnce(function (newValue) {
	        return this._backCompatOption('allowFrom', newValue);
	      }, 'Interactable.allowForm() has been deprecated. Use Interactble.draggable({allowFrom: newValue}).');

	      Interactable.prototype.testIgnore = function (ignoreFrom, interactableElement, element) {
	        if (!ignoreFrom || !is.element(element)) {
	          return false;
	        }

	        if (is.string(ignoreFrom)) {
	          return domUtils.matchesUpTo(element, ignoreFrom, interactableElement);
	        } else if (is.element(ignoreFrom)) {
	          return domUtils.nodeContains(ignoreFrom, element);
	        }

	        return false;
	      };

	      Interactable.prototype.testAllow = function (allowFrom, interactableElement, element) {
	        if (!allowFrom) {
	          return true;
	        }

	        if (!is.element(element)) {
	          return false;
	        }

	        if (is.string(allowFrom)) {
	          return domUtils.matchesUpTo(element, allowFrom, interactableElement);
	        } else if (is.element(allowFrom)) {
	          return domUtils.nodeContains(allowFrom, element);
	        }

	        return false;
	      };

	      Interactable.prototype.testIgnoreAllow = function (options, interactableElement, eventTarget) {
	        return !this.testIgnore(options.ignoreFrom, interactableElement, eventTarget) && this.testAllow(options.allowFrom, interactableElement, eventTarget);
	      };
	      /**
	       * ```js
	       * interact('.resize-drag')
	       *   .resizable(true)
	       *   .draggable(true)
	       *   .actionChecker(function (pointer, event, action, interactable, element, interaction) {
	       *
	       *   if (interact.matchesSelector(event.target, '.drag-handle') {
	       *     // force drag with handle target
	       *     action.name = drag;
	       *   }
	       *   else {
	       *     // resize from the top and right edges
	       *     action.name  = 'resize';
	       *     action.edges = { top: true, right: true };
	       *   }
	       *
	       *   return action;
	       * });
	       * ```
	       *
	       * Gets or sets the function used to check action to be performed on
	       * pointerDown
	       *
	       * @param {function | null} [checker] A function which takes a pointer event,
	       * defaultAction string, interactable, element and interaction as parameters
	       * and returns an object with name property 'drag' 'resize' or 'gesture' and
	       * optionally an `edges` object with boolean 'top', 'left', 'bottom' and right
	       * props.
	       * @return {Function | Interactable} The checker function or this Interactable
	       */


	      Interactable.prototype.actionChecker = function (checker) {
	        if (is.function(checker)) {
	          this.options.actionChecker = checker;
	          return this;
	        }

	        if (checker === null) {
	          delete this.options.actionChecker;
	          return this;
	        }

	        return this.options.actionChecker;
	      };
	      /**
	       * Returns or sets whether the the cursor should be changed depending on the
	       * action that would be performed if the mouse were pressed and dragged.
	       *
	       * @param {boolean} [newValue]
	       * @return {boolean | Interactable} The current setting or this Interactable
	       */


	      Interactable.prototype.styleCursor = function (newValue) {
	        if (is.bool(newValue)) {
	          this.options.styleCursor = newValue;
	          return this;
	        }

	        if (newValue === null) {
	          delete this.options.styleCursor;
	          return this;
	        }

	        return this.options.styleCursor;
	      };

	      Interactable.prototype.defaultActionChecker = function (pointer, event, interaction, element) {
	        var rect = this.getRect(element);
	        var buttons = event.buttons || {
	          0: 1,
	          1: 4,
	          3: 8,
	          4: 16
	        }[event.button];
	        var action = null;

	        for (var _i = 0; _i < actions.names.length; _i++) {
	          var _ref;

	          _ref = actions.names[_i];
	          var actionName = _ref; // check mouseButton setting if the pointer is down

	          if (interaction.pointerIsDown && /mouse|pointer/.test(interaction.pointerType) && (buttons & this.options[actionName].mouseButtons) === 0) {
	            continue;
	          }

	          action = actions[actionName].checker(pointer, event, this, element, interaction, rect);

	          if (action) {
	            return action;
	          }
	        }
	      };
	    }, {
	      "../Interactable": 4,
	      "../actions/base": 6,
	      "../utils": 44,
	      "../utils/domUtils": 39,
	      "../utils/is": 46
	    }],
	    13: [function (require, module, exports) {

	      var interact = require('../interact');

	      var Interactable = require('../Interactable');

	      var Interaction = require('../Interaction');

	      var actions = require('../actions/base');

	      var defaultOptions = require('../defaultOptions');

	      var scope = require('../scope');

	      var utils = require('../utils');

	      var signals = require('../utils/Signals').new();

	      require('./InteractableMethods');

	      var autoStart = {
	        signals: signals,
	        withinInteractionLimit: withinInteractionLimit,
	        // Allow this many interactions to happen simultaneously
	        maxInteractions: Infinity,
	        defaults: {
	          perAction: {
	            manualStart: false,
	            max: Infinity,
	            maxPerElement: 1,
	            allowFrom: null,
	            ignoreFrom: null,
	            // only allow left button by default
	            // see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#Return_value
	            mouseButtons: 1
	          }
	        },
	        setActionDefaults: function setActionDefaults(action) {
	          utils.extend(action.defaults, autoStart.defaults.perAction);
	        },
	        validateAction: validateAction
	      }; // set cursor style on mousedown

	      Interaction.signals.on('down', function (_ref) {
	        var interaction = _ref.interaction,
	            pointer = _ref.pointer,
	            event = _ref.event,
	            eventTarget = _ref.eventTarget;

	        if (interaction.interacting()) {
	          return;
	        }

	        var actionInfo = getActionInfo(interaction, pointer, event, eventTarget);
	        prepare(interaction, actionInfo);
	      }); // set cursor style on mousemove

	      Interaction.signals.on('move', function (_ref2) {
	        var interaction = _ref2.interaction,
	            pointer = _ref2.pointer,
	            event = _ref2.event,
	            eventTarget = _ref2.eventTarget;

	        if (interaction.pointerType !== 'mouse' || interaction.pointerIsDown || interaction.interacting()) {
	          return;
	        }

	        var actionInfo = getActionInfo(interaction, pointer, event, eventTarget);
	        prepare(interaction, actionInfo);
	      });
	      Interaction.signals.on('move', function (arg) {
	        var interaction = arg.interaction,
	            event = arg.event;

	        if (!interaction.pointerIsDown || interaction.interacting() || !interaction.pointerWasMoved || !interaction.prepared.name) {
	          return;
	        }

	        signals.fire('before-start', arg);
	        var target = interaction.target;

	        if (interaction.prepared.name && target) {
	          // check manualStart and interaction limit
	          if (target.options[interaction.prepared.name].manualStart || !withinInteractionLimit(target, interaction.element, interaction.prepared)) {
	            interaction.stop(event);
	          } else {
	            interaction.start(interaction.prepared, target, interaction.element);
	          }
	        }
	      }); // Check if the current target supports the action.
	      // If so, return the validated action. Otherwise, return null

	      function validateAction(action, interactable, element, eventTarget) {
	        if (utils.is.object(action) && interactable.testIgnoreAllow(interactable.options[action.name], element, eventTarget) && interactable.options[action.name].enabled && withinInteractionLimit(interactable, element, action)) {
	          return action;
	        }

	        return null;
	      }

	      function validateSelector(interaction, pointer, event, matches, matchElements, eventTarget) {
	        for (var i = 0, len = matches.length; i < len; i++) {
	          var match = matches[i];
	          var matchElement = matchElements[i];
	          var action = validateAction(match.getAction(pointer, event, interaction, matchElement), match, matchElement, eventTarget);

	          if (action) {
	            return {
	              action: action,
	              target: match,
	              element: matchElement
	            };
	          }
	        }

	        return {};
	      }

	      function getActionInfo(interaction, pointer, event, eventTarget) {
	        var matches = [];
	        var matchElements = [];
	        var element = eventTarget;

	        function pushMatches(interactable) {
	          matches.push(interactable);
	          matchElements.push(element);
	        }

	        while (utils.is.element(element)) {
	          matches = [];
	          matchElements = [];
	          scope.interactables.forEachMatch(element, pushMatches);
	          var actionInfo = validateSelector(interaction, pointer, event, matches, matchElements, eventTarget);

	          if (actionInfo.action && !actionInfo.target.options[actionInfo.action.name].manualStart) {
	            return actionInfo;
	          }

	          element = utils.parentNode(element);
	        }

	        return {};
	      }

	      function prepare(interaction, _ref3) {
	        var action = _ref3.action,
	            target = _ref3.target,
	            element = _ref3.element;
	        action = action || {};

	        if (interaction.target && interaction.target.options.styleCursor) {
	          interaction.target._doc.documentElement.style.cursor = '';
	        }

	        interaction.target = target;
	        interaction.element = element;
	        utils.copyAction(interaction.prepared, action);

	        if (target && target.options.styleCursor) {
	          var cursor = action ? actions[action.name].getCursor(action) : '';
	          interaction.target._doc.documentElement.style.cursor = cursor;
	        }

	        signals.fire('prepared', {
	          interaction: interaction
	        });
	      }

	      Interaction.signals.on('stop', function (_ref4) {
	        var interaction = _ref4.interaction;
	        var target = interaction.target;

	        if (target && target.options.styleCursor) {
	          target._doc.documentElement.style.cursor = '';
	        }
	      });

	      function withinInteractionLimit(interactable, element, action) {
	        var options = interactable.options;
	        var maxActions = options[action.name].max;
	        var maxPerElement = options[action.name].maxPerElement;
	        var activeInteractions = 0;
	        var targetCount = 0;
	        var targetElementCount = 0; // no actions if any of these values == 0

	        if (!(maxActions && maxPerElement && autoStart.maxInteractions)) {
	          return;
	        }

	        for (var _i = 0; _i < scope.interactions.length; _i++) {
	          var _ref5;

	          _ref5 = scope.interactions[_i];
	          var interaction = _ref5;
	          var otherAction = interaction.prepared.name;

	          if (!interaction.interacting()) {
	            continue;
	          }

	          activeInteractions++;

	          if (activeInteractions >= autoStart.maxInteractions) {
	            return false;
	          }

	          if (interaction.target !== interactable) {
	            continue;
	          }

	          targetCount += otherAction === action.name | 0;

	          if (targetCount >= maxActions) {
	            return false;
	          }

	          if (interaction.element === element) {
	            targetElementCount++;

	            if (otherAction !== action.name || targetElementCount >= maxPerElement) {
	              return false;
	            }
	          }
	        }

	        return autoStart.maxInteractions > 0;
	      }
	      /**
	       * Returns or sets the maximum number of concurrent interactions allowed.  By
	       * default only 1 interaction is allowed at a time (for backwards
	       * compatibility). To allow multiple interactions on the same Interactables and
	       * elements, you need to enable it in the draggable, resizable and gesturable
	       * `'max'` and `'maxPerElement'` options.
	       *
	       * @alias module:interact.maxInteractions
	       *
	       * @param {number} [newValue] Any number. newValue <= 0 means no interactions.
	       */


	      interact.maxInteractions = function (newValue) {
	        if (utils.is.number(newValue)) {
	          autoStart.maxInteractions = newValue;
	          return interact;
	        }

	        return autoStart.maxInteractions;
	      };

	      Interactable.settingsMethods.push('styleCursor');
	      Interactable.settingsMethods.push('actionChecker');
	      Interactable.settingsMethods.push('ignoreFrom');
	      Interactable.settingsMethods.push('allowFrom');
	      defaultOptions.base.actionChecker = null;
	      defaultOptions.base.styleCursor = true;
	      utils.extend(defaultOptions.perAction, autoStart.defaults.perAction);
	      module.exports = autoStart;
	    }, {
	      "../Interactable": 4,
	      "../Interaction": 5,
	      "../actions/base": 6,
	      "../defaultOptions": 18,
	      "../interact": 21,
	      "../scope": 33,
	      "../utils": 44,
	      "../utils/Signals": 34,
	      "./InteractableMethods": 12
	    }],
	    14: [function (require, module, exports) {

	      var autoStart = require('./base');

	      var scope = require('../scope');

	      var is = require('../utils/is');

	      var _require = require('../utils/domUtils'),
	          parentNode = _require.parentNode;

	      autoStart.setActionDefaults(require('../actions/drag'));
	      autoStart.signals.on('before-start', function (_ref) {
	        var interaction = _ref.interaction,
	            eventTarget = _ref.eventTarget,
	            dx = _ref.dx,
	            dy = _ref.dy;

	        if (interaction.prepared.name !== 'drag') {
	          return;
	        } // check if a drag is in the correct axis


	        var absX = Math.abs(dx);
	        var absY = Math.abs(dy);
	        var targetOptions = interaction.target.options.drag;
	        var startAxis = targetOptions.startAxis;
	        var currentAxis = absX > absY ? 'x' : absX < absY ? 'y' : 'xy';
	        interaction.prepared.axis = targetOptions.lockAxis === 'start' ? currentAxis[0] // always lock to one axis even if currentAxis === 'xy'
	        : targetOptions.lockAxis; // if the movement isn't in the startAxis of the interactable

	        if (currentAxis !== 'xy' && startAxis !== 'xy' && startAxis !== currentAxis) {
	          // cancel the prepared action
	          interaction.prepared.name = null; // then try to get a drag from another ineractable

	          var element = eventTarget;

	          var getDraggable = function getDraggable(interactable) {
	            if (interactable === interaction.target) {
	              return;
	            }

	            var options = interaction.target.options.drag;

	            if (!options.manualStart && interactable.testIgnoreAllow(options, element, eventTarget)) {
	              var action = interactable.getAction(interaction.downPointer, interaction.downEvent, interaction, element);

	              if (action && action.name === 'drag' && checkStartAxis(currentAxis, interactable) && autoStart.validateAction(action, interactable, element, eventTarget)) {
	                return interactable;
	              }
	            }
	          }; // check all interactables


	          while (is.element(element)) {
	            var interactable = scope.interactables.forEachMatch(element, getDraggable);

	            if (interactable) {
	              interaction.prepared.name = 'drag';
	              interaction.target = interactable;
	              interaction.element = element;
	              break;
	            }

	            element = parentNode(element);
	          }
	        }
	      });

	      function checkStartAxis(startAxis, interactable) {
	        if (!interactable) {
	          return false;
	        }

	        var thisAxis = interactable.options.drag.startAxis;
	        return startAxis === 'xy' || thisAxis === 'xy' || thisAxis === startAxis;
	      }
	    }, {
	      "../actions/drag": 7,
	      "../scope": 33,
	      "../utils/domUtils": 39,
	      "../utils/is": 46,
	      "./base": 13
	    }],
	    15: [function (require, module, exports) {

	      require('./base').setActionDefaults(require('../actions/gesture'));
	    }, {
	      "../actions/gesture": 9,
	      "./base": 13
	    }],
	    16: [function (require, module, exports) {

	      var autoStart = require('./base');

	      var Interaction = require('../Interaction');

	      autoStart.defaults.perAction.hold = 0;
	      autoStart.defaults.perAction.delay = 0;
	      Interaction.signals.on('new', function (interaction) {
	        interaction.autoStartHoldTimer = null;
	      });
	      autoStart.signals.on('prepared', function (_ref) {
	        var interaction = _ref.interaction;
	        var hold = getHoldDuration(interaction);

	        if (hold > 0) {
	          interaction.autoStartHoldTimer = setTimeout(function () {
	            interaction.start(interaction.prepared, interaction.target, interaction.element);
	          }, hold);
	        }
	      });
	      Interaction.signals.on('move', function (_ref2) {
	        var interaction = _ref2.interaction,
	            duplicate = _ref2.duplicate;

	        if (interaction.pointerWasMoved && !duplicate) {
	          clearTimeout(interaction.autoStartHoldTimer);
	        }
	      }); // prevent regular down->move autoStart

	      autoStart.signals.on('before-start', function (_ref3) {
	        var interaction = _ref3.interaction;
	        var hold = getHoldDuration(interaction);

	        if (hold > 0) {
	          interaction.prepared.name = null;
	        }
	      });

	      function getHoldDuration(interaction) {
	        var actionName = interaction.prepared && interaction.prepared.name;

	        if (!actionName) {
	          return null;
	        }

	        var options = interaction.target.options;
	        return options[actionName].hold || options[actionName].delay;
	      }

	      module.exports = {
	        getHoldDuration: getHoldDuration
	      };
	    }, {
	      "../Interaction": 5,
	      "./base": 13
	    }],
	    17: [function (require, module, exports) {

	      require('./base').setActionDefaults(require('../actions/resize'));
	    }, {
	      "../actions/resize": 10,
	      "./base": 13
	    }],
	    18: [function (require, module, exports) {

	      module.exports = {
	        base: {
	          accept: null,
	          preventDefault: 'auto',
	          deltaSource: 'page'
	        },
	        perAction: {
	          origin: {
	            x: 0,
	            y: 0
	          },
	          inertia: {
	            enabled: false,
	            resistance: 10,
	            // the lambda in exponential decay
	            minSpeed: 100,
	            // target speed must be above this for inertia to start
	            endSpeed: 10,
	            // the speed at which inertia is slow enough to stop
	            allowResume: true,
	            // allow resuming an action in inertia phase
	            smoothEndDuration: 300 // animate to snap/restrict endOnly if there's no inertia

	          }
	        }
	      };
	    }, {}],
	    19: [function (require, module, exports) {
	      /* browser entry point */
	      // inertia

	      require('./inertia'); // modifiers


	      require('./modifiers/snap');

	      require('./modifiers/restrict'); // pointerEvents


	      require('./pointerEvents/base');

	      require('./pointerEvents/holdRepeat');

	      require('./pointerEvents/interactableTargets'); // autoStart hold


	      require('./autoStart/hold'); // actions


	      require('./actions/gesture');

	      require('./actions/resize');

	      require('./actions/drag');

	      require('./actions/drop'); // load these modifiers after resize is loaded


	      require('./modifiers/snapSize');

	      require('./modifiers/restrictEdges');

	      require('./modifiers/restrictSize'); // autoStart actions


	      require('./autoStart/gesture');

	      require('./autoStart/resize');

	      require('./autoStart/drag'); // Interactable preventDefault setting


	      require('./interactablePreventDefault.js'); // autoScroll


	      require('./autoScroll'); // export interact


	      module.exports = require('./interact');
	    }, {
	      "./actions/drag": 7,
	      "./actions/drop": 8,
	      "./actions/gesture": 9,
	      "./actions/resize": 10,
	      "./autoScroll": 11,
	      "./autoStart/drag": 14,
	      "./autoStart/gesture": 15,
	      "./autoStart/hold": 16,
	      "./autoStart/resize": 17,
	      "./inertia": 20,
	      "./interact": 21,
	      "./interactablePreventDefault.js": 22,
	      "./modifiers/restrict": 24,
	      "./modifiers/restrictEdges": 25,
	      "./modifiers/restrictSize": 26,
	      "./modifiers/snap": 27,
	      "./modifiers/snapSize": 28,
	      "./pointerEvents/base": 30,
	      "./pointerEvents/holdRepeat": 31,
	      "./pointerEvents/interactableTargets": 32
	    }],
	    20: [function (require, module, exports) {

	      var InteractEvent = require('./InteractEvent');

	      var Interaction = require('./Interaction');

	      var modifiers = require('./modifiers/base');

	      var utils = require('./utils');

	      var animationFrame = require('./utils/raf');

	      Interaction.signals.on('new', function (interaction) {
	        interaction.inertiaStatus = {
	          active: false,
	          smoothEnd: false,
	          allowResume: false,
	          startEvent: null,
	          upCoords: {},
	          xe: 0,
	          ye: 0,
	          sx: 0,
	          sy: 0,
	          t0: 0,
	          vx0: 0,
	          vys: 0,
	          duration: 0,
	          lambda_v0: 0,
	          one_ve_v0: 0,
	          i: null
	        };

	        interaction.boundInertiaFrame = function () {
	          return inertiaFrame.apply(interaction);
	        };

	        interaction.boundSmoothEndFrame = function () {
	          return smoothEndFrame.apply(interaction);
	        };
	      });
	      Interaction.signals.on('down', function (_ref) {
	        var interaction = _ref.interaction,
	            event = _ref.event,
	            pointer = _ref.pointer,
	            eventTarget = _ref.eventTarget;
	        var status = interaction.inertiaStatus; // Check if the down event hits the current inertia target

	        if (status.active) {
	          var element = eventTarget; // climb up the DOM tree from the event target

	          while (utils.is.element(element)) {
	            // if interaction element is the current inertia target element
	            if (element === interaction.element) {
	              // stop inertia
	              animationFrame.cancel(status.i);
	              status.active = false;
	              interaction.simulation = null; // update pointers to the down event's coordinates

	              interaction.updatePointer(pointer);
	              utils.setCoords(interaction.curCoords, interaction.pointers); // fire appropriate signals

	              var signalArg = {
	                interaction: interaction
	              };
	              Interaction.signals.fire('before-action-move', signalArg);
	              Interaction.signals.fire('action-resume', signalArg); // fire a reume event

	              var resumeEvent = new InteractEvent(interaction, event, interaction.prepared.name, 'inertiaresume', interaction.element);
	              interaction.target.fire(resumeEvent);
	              interaction.prevEvent = resumeEvent;
	              modifiers.resetStatuses(interaction.modifierStatuses);
	              utils.copyCoords(interaction.prevCoords, interaction.curCoords);
	              break;
	            }

	            element = utils.parentNode(element);
	          }
	        }
	      });
	      Interaction.signals.on('up', function (_ref2) {
	        var interaction = _ref2.interaction,
	            event = _ref2.event;
	        var status = interaction.inertiaStatus;

	        if (!interaction.interacting() || status.active) {
	          return;
	        }

	        var target = interaction.target;
	        var options = target && target.options;
	        var inertiaOptions = options && interaction.prepared.name && options[interaction.prepared.name].inertia;
	        var now = new Date().getTime();
	        var statuses = {};
	        var page = utils.extend({}, interaction.curCoords.page);
	        var pointerSpeed = interaction.pointerDelta.client.speed;
	        var smoothEnd = false;
	        var modifierResult = void 0; // check if inertia should be started

	        var inertiaPossible = inertiaOptions && inertiaOptions.enabled && interaction.prepared.name !== 'gesture' && event !== status.startEvent;
	        var inertia = inertiaPossible && now - interaction.curCoords.timeStamp < 50 && pointerSpeed > inertiaOptions.minSpeed && pointerSpeed > inertiaOptions.endSpeed;
	        var modifierArg = {
	          interaction: interaction,
	          pageCoords: page,
	          statuses: statuses,
	          preEnd: true,
	          requireEndOnly: true
	        }; // smoothEnd

	        if (inertiaPossible && !inertia) {
	          modifiers.resetStatuses(statuses);
	          modifierResult = modifiers.setAll(modifierArg);

	          if (modifierResult.shouldMove && modifierResult.locked) {
	            smoothEnd = true;
	          }
	        }

	        if (!(inertia || smoothEnd)) {
	          return;
	        }

	        utils.copyCoords(status.upCoords, interaction.curCoords);
	        interaction.pointers[0] = status.startEvent = new InteractEvent(interaction, event, interaction.prepared.name, 'inertiastart', interaction.element);
	        status.t0 = now;
	        status.active = true;
	        status.allowResume = inertiaOptions.allowResume;
	        interaction.simulation = status;
	        target.fire(status.startEvent);

	        if (inertia) {
	          status.vx0 = interaction.pointerDelta.client.vx;
	          status.vy0 = interaction.pointerDelta.client.vy;
	          status.v0 = pointerSpeed;
	          calcInertia(interaction, status);
	          utils.extend(page, interaction.curCoords.page);
	          page.x += status.xe;
	          page.y += status.ye;
	          modifiers.resetStatuses(statuses);
	          modifierResult = modifiers.setAll(modifierArg);
	          status.modifiedXe += modifierResult.dx;
	          status.modifiedYe += modifierResult.dy;
	          status.i = animationFrame.request(interaction.boundInertiaFrame);
	        } else {
	          status.smoothEnd = true;
	          status.xe = modifierResult.dx;
	          status.ye = modifierResult.dy;
	          status.sx = status.sy = 0;
	          status.i = animationFrame.request(interaction.boundSmoothEndFrame);
	        }
	      });
	      Interaction.signals.on('stop-active', function (_ref3) {
	        var interaction = _ref3.interaction;
	        var status = interaction.inertiaStatus;

	        if (status.active) {
	          animationFrame.cancel(status.i);
	          status.active = false;
	          interaction.simulation = null;
	        }
	      });

	      function calcInertia(interaction, status) {
	        var inertiaOptions = interaction.target.options[interaction.prepared.name].inertia;
	        var lambda = inertiaOptions.resistance;
	        var inertiaDur = -Math.log(inertiaOptions.endSpeed / status.v0) / lambda;
	        status.x0 = interaction.prevEvent.pageX;
	        status.y0 = interaction.prevEvent.pageY;
	        status.t0 = status.startEvent.timeStamp / 1000;
	        status.sx = status.sy = 0;
	        status.modifiedXe = status.xe = (status.vx0 - inertiaDur) / lambda;
	        status.modifiedYe = status.ye = (status.vy0 - inertiaDur) / lambda;
	        status.te = inertiaDur;
	        status.lambda_v0 = lambda / status.v0;
	        status.one_ve_v0 = 1 - inertiaOptions.endSpeed / status.v0;
	      }

	      function inertiaFrame() {
	        updateInertiaCoords(this);
	        utils.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);
	        var status = this.inertiaStatus;
	        var options = this.target.options[this.prepared.name].inertia;
	        var lambda = options.resistance;
	        var t = new Date().getTime() / 1000 - status.t0;

	        if (t < status.te) {
	          var progress = 1 - (Math.exp(-lambda * t) - status.lambda_v0) / status.one_ve_v0;

	          if (status.modifiedXe === status.xe && status.modifiedYe === status.ye) {
	            status.sx = status.xe * progress;
	            status.sy = status.ye * progress;
	          } else {
	            var quadPoint = utils.getQuadraticCurvePoint(0, 0, status.xe, status.ye, status.modifiedXe, status.modifiedYe, progress);
	            status.sx = quadPoint.x;
	            status.sy = quadPoint.y;
	          }

	          this.doMove();
	          status.i = animationFrame.request(this.boundInertiaFrame);
	        } else {
	          status.sx = status.modifiedXe;
	          status.sy = status.modifiedYe;
	          this.doMove();
	          this.end(status.startEvent);
	          status.active = false;
	          this.simulation = null;
	        }

	        utils.copyCoords(this.prevCoords, this.curCoords);
	      }

	      function smoothEndFrame() {
	        updateInertiaCoords(this);
	        var status = this.inertiaStatus;
	        var t = new Date().getTime() - status.t0;
	        var duration = this.target.options[this.prepared.name].inertia.smoothEndDuration;

	        if (t < duration) {
	          status.sx = utils.easeOutQuad(t, 0, status.xe, duration);
	          status.sy = utils.easeOutQuad(t, 0, status.ye, duration);
	          this.pointerMove(status.startEvent, status.startEvent);
	          status.i = animationFrame.request(this.boundSmoothEndFrame);
	        } else {
	          status.sx = status.xe;
	          status.sy = status.ye;
	          this.pointerMove(status.startEvent, status.startEvent);
	          this.end(status.startEvent);
	          status.smoothEnd = status.active = false;
	          this.simulation = null;
	        }
	      }

	      function updateInertiaCoords(interaction) {
	        var status = interaction.inertiaStatus; // return if inertia isn't running

	        if (!status.active) {
	          return;
	        }

	        var pageUp = status.upCoords.page;
	        var clientUp = status.upCoords.client;
	        utils.setCoords(interaction.curCoords, [{
	          pageX: pageUp.x + status.sx,
	          pageY: pageUp.y + status.sy,
	          clientX: clientUp.x + status.sx,
	          clientY: clientUp.y + status.sy
	        }]);
	      }
	    }, {
	      "./InteractEvent": 3,
	      "./Interaction": 5,
	      "./modifiers/base": 23,
	      "./utils": 44,
	      "./utils/raf": 50
	    }],
	    21: [function (require, module, exports) {
	      /** @module interact */

	      var browser = require('./utils/browser');

	      var events = require('./utils/events');

	      var utils = require('./utils');

	      var scope = require('./scope');

	      var Interactable = require('./Interactable');

	      var Interaction = require('./Interaction');

	      var globalEvents = {};
	      /**
	       * ```js
	       * interact('#draggable').draggable(true);
	       *
	       * var rectables = interact('rect');
	       * rectables
	       *   .gesturable(true)
	       *   .on('gesturemove', function (event) {
	       *       // ...
	       *   });
	       * ```
	       *
	       * The methods of this variable can be used to set elements as interactables
	       * and also to change various default settings.
	       *
	       * Calling it as a function and passing an element or a valid CSS selector
	       * string returns an Interactable object which has various methods to configure
	       * it.
	       *
	       * @global
	       *
	       * @param {Element | string} element The HTML or SVG Element to interact with
	       * or CSS selector
	       * @return {Interactable}
	       */

	      function interact(element, options) {
	        var interactable = scope.interactables.get(element, options);

	        if (!interactable) {
	          interactable = new Interactable(element, options);
	          interactable.events.global = globalEvents;
	        }

	        return interactable;
	      }
	      /**
	       * Check if an element or selector has been set with the {@link interact}
	       * function
	       *
	       * @alias module:interact.isSet
	       *
	       * @param {Element} element The Element being searched for
	       * @return {boolean} Indicates if the element or CSS selector was previously
	       * passed to interact
	      */


	      interact.isSet = function (element, options) {
	        return scope.interactables.indexOfElement(element, options && options.context) !== -1;
	      };
	      /**
	       * Add a global listener for an InteractEvent or adds a DOM event to `document`
	       *
	       * @alias module:interact.on
	       *
	       * @param {string | array | object} type The types of events to listen for
	       * @param {function} listener The function event (s)
	       * @param {object | boolean} [options] object or useCapture flag for
	       * addEventListener
	       * @return {object} interact
	       */


	      interact.on = function (type, listener, options) {
	        if (utils.is.string(type) && type.search(' ') !== -1) {
	          type = type.trim().split(/ +/);
	        }

	        if (utils.is.array(type)) {
	          for (var _i = 0; _i < type.length; _i++) {
	            var _ref;

	            _ref = type[_i];
	            var eventType = _ref;
	            interact.on(eventType, listener, options);
	          }

	          return interact;
	        }

	        if (utils.is.object(type)) {
	          for (var prop in type) {
	            interact.on(prop, type[prop], listener);
	          }

	          return interact;
	        } // if it is an InteractEvent type, add listener to globalEvents


	        if (utils.contains(Interactable.eventTypes, type)) {
	          // if this type of event was never bound
	          if (!globalEvents[type]) {
	            globalEvents[type] = [listener];
	          } else {
	            globalEvents[type].push(listener);
	          }
	        } // If non InteractEvent type, addEventListener to document
	        else {
	            events.add(scope.document, type, listener, {
	              options: options
	            });
	          }

	        return interact;
	      };
	      /**
	       * Removes a global InteractEvent listener or DOM event from `document`
	       *
	       * @alias module:interact.off
	       *
	       * @param {string | array | object} type The types of events that were listened
	       * for
	       * @param {function} listener The listener function to be removed
	       * @param {object | boolean} options [options] object or useCapture flag for
	       * removeEventListener
	       * @return {object} interact
	       */


	      interact.off = function (type, listener, options) {
	        if (utils.is.string(type) && type.search(' ') !== -1) {
	          type = type.trim().split(/ +/);
	        }

	        if (utils.is.array(type)) {
	          for (var _i2 = 0; _i2 < type.length; _i2++) {
	            var _ref2;

	            _ref2 = type[_i2];
	            var eventType = _ref2;
	            interact.off(eventType, listener, options);
	          }

	          return interact;
	        }

	        if (utils.is.object(type)) {
	          for (var prop in type) {
	            interact.off(prop, type[prop], listener);
	          }

	          return interact;
	        }

	        if (!utils.contains(Interactable.eventTypes, type)) {
	          events.remove(scope.document, type, listener, options);
	        } else {
	          var index = void 0;

	          if (type in globalEvents && (index = globalEvents[type].indexOf(listener)) !== -1) {
	            globalEvents[type].splice(index, 1);
	          }
	        }

	        return interact;
	      };
	      /**
	       * Returns an object which exposes internal data
	      
	       * @alias module:interact.debug
	       *
	       * @return {object} An object with properties that outline the current state
	       * and expose internal functions and variables
	       */


	      interact.debug = function () {
	        return scope;
	      }; // expose the functions used to calculate multi-touch properties


	      interact.getPointerAverage = utils.pointerAverage;
	      interact.getTouchBBox = utils.touchBBox;
	      interact.getTouchDistance = utils.touchDistance;
	      interact.getTouchAngle = utils.touchAngle;
	      interact.getElementRect = utils.getElementRect;
	      interact.getElementClientRect = utils.getElementClientRect;
	      interact.matchesSelector = utils.matchesSelector;
	      interact.closest = utils.closest;
	      /**
	       * @alias module:interact.supportsTouch
	       *
	       * @return {boolean} Whether or not the browser supports touch input
	       */

	      interact.supportsTouch = function () {
	        return browser.supportsTouch;
	      };
	      /**
	       * @alias module:interact.supportsPointerEvent
	       *
	       * @return {boolean} Whether or not the browser supports PointerEvents
	       */


	      interact.supportsPointerEvent = function () {
	        return browser.supportsPointerEvent;
	      };
	      /**
	       * Cancels all interactions (end events are not fired)
	       *
	       * @alias module:interact.stop
	       *
	       * @param {Event} event An event on which to call preventDefault()
	       * @return {object} interact
	       */


	      interact.stop = function (event) {
	        for (var i = scope.interactions.length - 1; i >= 0; i--) {
	          scope.interactions[i].stop(event);
	        }

	        return interact;
	      };
	      /**
	       * Returns or sets the distance the pointer must be moved before an action
	       * sequence occurs. This also affects tolerance for tap events.
	       *
	       * @alias module:interact.pointerMoveTolerance
	       *
	       * @param {number} [newValue] The movement from the start position must be greater than this value
	       * @return {interact | number}
	       */


	      interact.pointerMoveTolerance = function (newValue) {
	        if (utils.is.number(newValue)) {
	          Interaction.pointerMoveTolerance = newValue;
	          return interact;
	        }

	        return Interaction.pointerMoveTolerance;
	      };

	      interact.addDocument = scope.addDocument;
	      interact.removeDocument = scope.removeDocument;
	      scope.interact = interact;
	      module.exports = interact;
	    }, {
	      "./Interactable": 4,
	      "./Interaction": 5,
	      "./scope": 33,
	      "./utils": 44,
	      "./utils/browser": 36,
	      "./utils/events": 40
	    }],
	    22: [function (require, module, exports) {

	      var Interactable = require('./Interactable');

	      var Interaction = require('./Interaction');

	      var scope = require('./scope');

	      var is = require('./utils/is');

	      var events = require('./utils/events');

	      var browser = require('./utils/browser');

	      var _require = require('./utils/domUtils'),
	          nodeContains = _require.nodeContains,
	          matchesSelector = _require.matchesSelector;
	      /**
	       * Returns or sets whether to prevent the browser's default behaviour in
	       * response to pointer events. Can be set to:
	       *  - `'always'` to always prevent
	       *  - `'never'` to never prevent
	       *  - `'auto'` to let interact.js try to determine what would be best
	       *
	       * @param {string} [newValue] `true`, `false` or `'auto'`
	       * @return {string | Interactable} The current setting or this Interactable
	       */


	      Interactable.prototype.preventDefault = function (newValue) {
	        if (/^(always|never|auto)$/.test(newValue)) {
	          this.options.preventDefault = newValue;
	          return this;
	        }

	        if (is.bool(newValue)) {
	          this.options.preventDefault = newValue ? 'always' : 'never';
	          return this;
	        }

	        return this.options.preventDefault;
	      };

	      Interactable.prototype.checkAndPreventDefault = function (event) {
	        var setting = this.options.preventDefault;

	        if (setting === 'never') {
	          return;
	        }

	        if (setting === 'always') {
	          event.preventDefault();
	          return;
	        } // setting === 'auto'
	        // don't preventDefault of touch{start,move} events if the browser supports passive
	        // events listeners. CSS touch-action and user-selecct should be used instead


	        if (events.supportsPassive && /^touch(start|move)$/.test(event.type) && !browser.isIOS) {
	          return;
	        } // don't preventDefault of pointerdown events


	        if (/^(mouse|pointer|touch)*(down|start)/i.test(event.type)) {
	          return;
	        } // don't preventDefault on editable elements


	        if (is.element(event.target) && matchesSelector(event.target, 'input,select,textarea,[contenteditable=true],[contenteditable=true] *')) {
	          return;
	        }

	        event.preventDefault();
	      };

	      function onInteractionEvent(_ref) {
	        var interaction = _ref.interaction,
	            event = _ref.event;

	        if (interaction.target) {
	          interaction.target.checkAndPreventDefault(event);
	        }
	      }

	      var _arr = ['down', 'move', 'up', 'cancel'];

	      for (var _i = 0; _i < _arr.length; _i++) {
	        var eventSignal = _arr[_i];
	        Interaction.signals.on(eventSignal, onInteractionEvent);
	      } // prevent native HTML5 drag on interact.js target elements


	      Interaction.docEvents.dragstart = function preventNativeDrag(event) {
	        for (var _i2 = 0; _i2 < scope.interactions.length; _i2++) {
	          var _ref2;

	          _ref2 = scope.interactions[_i2];
	          var interaction = _ref2;

	          if (interaction.element && (interaction.element === event.target || nodeContains(interaction.element, event.target))) {
	            interaction.target.checkAndPreventDefault(event);
	            return;
	          }
	        }
	      };
	    }, {
	      "./Interactable": 4,
	      "./Interaction": 5,
	      "./scope": 33,
	      "./utils/browser": 36,
	      "./utils/domUtils": 39,
	      "./utils/events": 40,
	      "./utils/is": 46
	    }],
	    23: [function (require, module, exports) {

	      var InteractEvent = require('../InteractEvent');

	      var Interaction = require('../Interaction');

	      var extend = require('../utils/extend');

	      var modifiers = {
	        names: [],
	        setOffsets: function setOffsets(arg) {
	          var interaction = arg.interaction,
	              page = arg.pageCoords;
	          var target = interaction.target,
	              element = interaction.element,
	              startOffset = interaction.startOffset;
	          var rect = target.getRect(element);

	          if (rect) {
	            startOffset.left = page.x - rect.left;
	            startOffset.top = page.y - rect.top;
	            startOffset.right = rect.right - page.x;
	            startOffset.bottom = rect.bottom - page.y;

	            if (!('width' in rect)) {
	              rect.width = rect.right - rect.left;
	            }

	            if (!('height' in rect)) {
	              rect.height = rect.bottom - rect.top;
	            }
	          } else {
	            startOffset.left = startOffset.top = startOffset.right = startOffset.bottom = 0;
	          }

	          arg.rect = rect;
	          arg.interactable = target;
	          arg.element = element;

	          for (var _i = 0; _i < modifiers.names.length; _i++) {
	            var _ref;

	            _ref = modifiers.names[_i];
	            var modifierName = _ref;
	            arg.options = target.options[interaction.prepared.name][modifierName];

	            if (!arg.options) {
	              continue;
	            }

	            interaction.modifierOffsets[modifierName] = modifiers[modifierName].setOffset(arg);
	          }
	        },
	        setAll: function setAll(arg) {
	          var interaction = arg.interaction,
	              statuses = arg.statuses,
	              preEnd = arg.preEnd,
	              requireEndOnly = arg.requireEndOnly;
	          var result = {
	            dx: 0,
	            dy: 0,
	            changed: false,
	            locked: false,
	            shouldMove: true
	          };
	          arg.modifiedCoords = extend({}, arg.pageCoords);

	          for (var _i2 = 0; _i2 < modifiers.names.length; _i2++) {
	            var _ref2;

	            _ref2 = modifiers.names[_i2];
	            var modifierName = _ref2;
	            var modifier = modifiers[modifierName];
	            var options = interaction.target.options[interaction.prepared.name][modifierName];

	            if (!shouldDo(options, preEnd, requireEndOnly)) {
	              continue;
	            }

	            arg.status = arg.status = statuses[modifierName];
	            arg.options = options;
	            arg.offset = arg.interaction.modifierOffsets[modifierName];
	            modifier.set(arg);

	            if (arg.status.locked) {
	              arg.modifiedCoords.x += arg.status.dx;
	              arg.modifiedCoords.y += arg.status.dy;
	              result.dx += arg.status.dx;
	              result.dy += arg.status.dy;
	              result.locked = true;
	            }
	          } // a move should be fired if:
	          //  - there are no modifiers enabled,
	          //  - no modifiers are "locked" i.e. have changed the pointer's coordinates, or
	          //  - the locked coords have changed since the last pointer move


	          result.shouldMove = !arg.status || !result.locked || arg.status.changed;
	          return result;
	        },
	        resetStatuses: function resetStatuses(statuses) {
	          for (var _i3 = 0; _i3 < modifiers.names.length; _i3++) {
	            var _ref3;

	            _ref3 = modifiers.names[_i3];
	            var modifierName = _ref3;
	            var status = statuses[modifierName] || {};
	            status.dx = status.dy = 0;
	            status.modifiedX = status.modifiedY = NaN;
	            status.locked = false;
	            status.changed = true;
	            statuses[modifierName] = status;
	          }

	          return statuses;
	        },
	        start: function start(_ref4, signalName) {
	          var interaction = _ref4.interaction;
	          var arg = {
	            interaction: interaction,
	            pageCoords: (signalName === 'action-resume' ? interaction.curCoords : interaction.startCoords).page,
	            startOffset: interaction.startOffset,
	            statuses: interaction.modifierStatuses,
	            preEnd: false,
	            requireEndOnly: false
	          };
	          modifiers.setOffsets(arg);
	          modifiers.resetStatuses(arg.statuses);
	          arg.pageCoords = extend({}, interaction.startCoords.page);
	          interaction.modifierResult = modifiers.setAll(arg);
	        },
	        beforeMove: function beforeMove(_ref5) {
	          var interaction = _ref5.interaction,
	              preEnd = _ref5.preEnd,
	              interactingBeforeMove = _ref5.interactingBeforeMove;
	          var modifierResult = modifiers.setAll({
	            interaction: interaction,
	            preEnd: preEnd,
	            pageCoords: interaction.curCoords.page,
	            statuses: interaction.modifierStatuses,
	            requireEndOnly: false
	          }); // don't fire an action move if a modifier would keep the event in the same
	          // cordinates as before

	          if (!modifierResult.shouldMove && interactingBeforeMove) {
	            interaction._dontFireMove = true;
	          }

	          interaction.modifierResult = modifierResult;
	        },
	        end: function end(_ref6) {
	          var interaction = _ref6.interaction,
	              event = _ref6.event;

	          for (var _i4 = 0; _i4 < modifiers.names.length; _i4++) {
	            var _ref7;

	            _ref7 = modifiers.names[_i4];
	            var modifierName = _ref7;
	            var options = interaction.target.options[interaction.prepared.name][modifierName]; // if the endOnly option is true for any modifier

	            if (shouldDo(options, true, true)) {
	              // fire a move event at the modified coordinates
	              interaction.doMove({
	                event: event,
	                preEnd: true
	              });
	              break;
	            }
	          }
	        },
	        setXY: function setXY(arg) {
	          var iEvent = arg.iEvent,
	              interaction = arg.interaction;
	          var modifierArg = extend({}, arg);

	          for (var i = 0; i < modifiers.names.length; i++) {
	            var modifierName = modifiers.names[i];
	            modifierArg.options = interaction.target.options[interaction.prepared.name][modifierName];

	            if (!modifierArg.options) {
	              continue;
	            }

	            var modifier = modifiers[modifierName];
	            modifierArg.status = interaction.modifierStatuses[modifierName];
	            iEvent[modifierName] = modifier.modifyCoords(modifierArg);
	          }
	        }
	      };
	      Interaction.signals.on('new', function (interaction) {
	        interaction.startOffset = {
	          left: 0,
	          right: 0,
	          top: 0,
	          bottom: 0
	        };
	        interaction.modifierOffsets = {};
	        interaction.modifierStatuses = modifiers.resetStatuses({});
	        interaction.modifierResult = null;
	      });
	      Interaction.signals.on('action-start', modifiers.start);
	      Interaction.signals.on('action-resume', modifiers.start);
	      Interaction.signals.on('before-action-move', modifiers.beforeMove);
	      Interaction.signals.on('action-end', modifiers.end);
	      InteractEvent.signals.on('set-xy', modifiers.setXY);

	      function shouldDo(options, preEnd, requireEndOnly) {
	        return options && options.enabled && (preEnd || !options.endOnly) && (!requireEndOnly || options.endOnly);
	      }

	      module.exports = modifiers;
	    }, {
	      "../InteractEvent": 3,
	      "../Interaction": 5,
	      "../utils/extend": 41
	    }],
	    24: [function (require, module, exports) {

	      var modifiers = require('./base');

	      var utils = require('../utils');

	      var defaultOptions = require('../defaultOptions');

	      var restrict = {
	        defaults: {
	          enabled: false,
	          endOnly: false,
	          restriction: null,
	          elementRect: null
	        },
	        setOffset: function setOffset(_ref) {
	          var rect = _ref.rect,
	              startOffset = _ref.startOffset,
	              options = _ref.options;
	          var elementRect = options && options.elementRect;
	          var offset = {};

	          if (rect && elementRect) {
	            offset.left = startOffset.left - rect.width * elementRect.left;
	            offset.top = startOffset.top - rect.height * elementRect.top;
	            offset.right = startOffset.right - rect.width * (1 - elementRect.right);
	            offset.bottom = startOffset.bottom - rect.height * (1 - elementRect.bottom);
	          } else {
	            offset.left = offset.top = offset.right = offset.bottom = 0;
	          }

	          return offset;
	        },
	        set: function set(_ref2) {
	          var modifiedCoords = _ref2.modifiedCoords,
	              interaction = _ref2.interaction,
	              status = _ref2.status,
	              options = _ref2.options;

	          if (!options) {
	            return status;
	          }

	          var page = status.useStatusXY ? {
	            x: status.x,
	            y: status.y
	          } : utils.extend({}, modifiedCoords);
	          var restriction = getRestrictionRect(options.restriction, interaction, page);

	          if (!restriction) {
	            return status;
	          }

	          status.dx = 0;
	          status.dy = 0;
	          status.locked = false;
	          var rect = restriction;
	          var modifiedX = page.x;
	          var modifiedY = page.y;
	          var offset = interaction.modifierOffsets.restrict; // object is assumed to have
	          // x, y, width, height or
	          // left, top, right, bottom

	          if ('x' in restriction && 'y' in restriction) {
	            modifiedX = Math.max(Math.min(rect.x + rect.width - offset.right, page.x), rect.x + offset.left);
	            modifiedY = Math.max(Math.min(rect.y + rect.height - offset.bottom, page.y), rect.y + offset.top);
	          } else {
	            modifiedX = Math.max(Math.min(rect.right - offset.right, page.x), rect.left + offset.left);
	            modifiedY = Math.max(Math.min(rect.bottom - offset.bottom, page.y), rect.top + offset.top);
	          }

	          status.dx = modifiedX - page.x;
	          status.dy = modifiedY - page.y;
	          status.changed = status.modifiedX !== modifiedX || status.modifiedY !== modifiedY;
	          status.locked = !!(status.dx || status.dy);
	          status.modifiedX = modifiedX;
	          status.modifiedY = modifiedY;
	        },
	        modifyCoords: function modifyCoords(_ref3) {
	          var page = _ref3.page,
	              client = _ref3.client,
	              status = _ref3.status,
	              phase = _ref3.phase,
	              options = _ref3.options;
	          var elementRect = options && options.elementRect;

	          if (options && options.enabled && !(phase === 'start' && elementRect && status.locked)) {
	            if (status.locked) {
	              page.x += status.dx;
	              page.y += status.dy;
	              client.x += status.dx;
	              client.y += status.dy;
	              return {
	                dx: status.dx,
	                dy: status.dy
	              };
	            }
	          }
	        },
	        getRestrictionRect: getRestrictionRect
	      };

	      function getRestrictionRect(value, interaction, page) {
	        if (utils.is.function(value)) {
	          return utils.resolveRectLike(value, interaction.target, interaction.element, [page.x, page.y, interaction]);
	        } else {
	          return utils.resolveRectLike(value, interaction.target, interaction.element);
	        }
	      }

	      modifiers.restrict = restrict;
	      modifiers.names.push('restrict');
	      defaultOptions.perAction.restrict = restrict.defaults;
	      module.exports = restrict;
	    }, {
	      "../defaultOptions": 18,
	      "../utils": 44,
	      "./base": 23
	    }],
	    25: [function (require, module, exports) {
	      // max for the top, left, bottom and right edges of the target being resized.
	      //
	      // interact(target).resize({
	      //   edges: { top: true, left: true },
	      //   restrictEdges: {
	      //     inner: { top: 200, left: 200, right: 400, bottom: 400 },
	      //     outer: { top:   0, left:   0, right: 600, bottom: 600 },
	      //   },
	      // });

	      var modifiers = require('./base');

	      var utils = require('../utils');

	      var rectUtils = require('../utils/rect');

	      var defaultOptions = require('../defaultOptions');

	      var resize = require('../actions/resize');

	      var _require = require('./restrict'),
	          getRestrictionRect = _require.getRestrictionRect;

	      var noInner = {
	        top: +Infinity,
	        left: +Infinity,
	        bottom: -Infinity,
	        right: -Infinity
	      };
	      var noOuter = {
	        top: -Infinity,
	        left: -Infinity,
	        bottom: +Infinity,
	        right: +Infinity
	      };
	      var restrictEdges = {
	        defaults: {
	          enabled: false,
	          endOnly: false,
	          min: null,
	          max: null,
	          offset: null
	        },
	        setOffset: function setOffset(_ref) {
	          var interaction = _ref.interaction,
	              startOffset = _ref.startOffset,
	              options = _ref.options;

	          if (!options) {
	            return utils.extend({}, startOffset);
	          }

	          var offset = getRestrictionRect(options.offset, interaction, interaction.startCoords.page);

	          if (offset) {
	            return {
	              top: startOffset.top + offset.y,
	              left: startOffset.left + offset.x,
	              bottom: startOffset.bottom + offset.y,
	              right: startOffset.right + offset.x
	            };
	          }

	          return startOffset;
	        },
	        set: function set(_ref2) {
	          var modifiedCoords = _ref2.modifiedCoords,
	              interaction = _ref2.interaction,
	              status = _ref2.status,
	              offset = _ref2.offset,
	              options = _ref2.options;
	          var edges = interaction.prepared.linkedEdges || interaction.prepared.edges;

	          if (!interaction.interacting() || !edges) {
	            return;
	          }

	          var page = status.useStatusXY ? {
	            x: status.x,
	            y: status.y
	          } : utils.extend({}, modifiedCoords);
	          var inner = rectUtils.xywhToTlbr(getRestrictionRect(options.inner, interaction, page)) || noInner;
	          var outer = rectUtils.xywhToTlbr(getRestrictionRect(options.outer, interaction, page)) || noOuter;
	          var modifiedX = page.x;
	          var modifiedY = page.y;
	          status.dx = 0;
	          status.dy = 0;
	          status.locked = false;

	          if (edges.top) {
	            modifiedY = Math.min(Math.max(outer.top + offset.top, page.y), inner.top + offset.top);
	          } else if (edges.bottom) {
	            modifiedY = Math.max(Math.min(outer.bottom - offset.bottom, page.y), inner.bottom - offset.bottom);
	          }

	          if (edges.left) {
	            modifiedX = Math.min(Math.max(outer.left + offset.left, page.x), inner.left + offset.left);
	          } else if (edges.right) {
	            modifiedX = Math.max(Math.min(outer.right - offset.right, page.x), inner.right - offset.right);
	          }

	          status.dx = modifiedX - page.x;
	          status.dy = modifiedY - page.y;
	          status.changed = status.modifiedX !== modifiedX || status.modifiedY !== modifiedY;
	          status.locked = !!(status.dx || status.dy);
	          status.modifiedX = modifiedX;
	          status.modifiedY = modifiedY;
	        },
	        modifyCoords: function modifyCoords(_ref3) {
	          var page = _ref3.page,
	              client = _ref3.client,
	              status = _ref3.status,
	              phase = _ref3.phase,
	              options = _ref3.options;

	          if (options && options.enabled && !(phase === 'start' && status.locked)) {
	            if (status.locked) {
	              page.x += status.dx;
	              page.y += status.dy;
	              client.x += status.dx;
	              client.y += status.dy;
	              return {
	                dx: status.dx,
	                dy: status.dy
	              };
	            }
	          }
	        },
	        noInner: noInner,
	        noOuter: noOuter,
	        getRestrictionRect: getRestrictionRect
	      };
	      modifiers.restrictEdges = restrictEdges;
	      modifiers.names.push('restrictEdges');
	      defaultOptions.perAction.restrictEdges = restrictEdges.defaults;
	      resize.defaults.restrictEdges = restrictEdges.defaults;
	      module.exports = restrictEdges;
	    }, {
	      "../actions/resize": 10,
	      "../defaultOptions": 18,
	      "../utils": 44,
	      "../utils/rect": 51,
	      "./base": 23,
	      "./restrict": 24
	    }],
	    26: [function (require, module, exports) {
	      // max width and height for the target being resized.
	      //
	      // interact(target).resize({
	      //   edges: { top: true, left: true },
	      //   restrictSize: {
	      //     min: { width: -600, height: -600 },
	      //     max: { width:  600, height:  600 },
	      //   },
	      // });

	      var modifiers = require('./base');

	      var restrictEdges = require('./restrictEdges');

	      var utils = require('../utils');

	      var rectUtils = require('../utils/rect');

	      var defaultOptions = require('../defaultOptions');

	      var resize = require('../actions/resize');

	      var noMin = {
	        width: -Infinity,
	        height: -Infinity
	      };
	      var noMax = {
	        width: +Infinity,
	        height: +Infinity
	      };
	      var restrictSize = {
	        defaults: {
	          enabled: false,
	          endOnly: false,
	          min: null,
	          max: null
	        },
	        setOffset: function setOffset(_ref) {
	          var interaction = _ref.interaction;
	          return interaction.startOffset;
	        },
	        set: function set(arg) {
	          var interaction = arg.interaction,
	              options = arg.options;
	          var edges = interaction.prepared.linkedEdges || interaction.prepared.edges;

	          if (!interaction.interacting() || !edges) {
	            return;
	          }

	          var rect = rectUtils.xywhToTlbr(interaction.resizeRects.inverted);
	          var minSize = rectUtils.tlbrToXywh(restrictEdges.getRestrictionRect(options.min, interaction)) || noMin;
	          var maxSize = rectUtils.tlbrToXywh(restrictEdges.getRestrictionRect(options.max, interaction)) || noMax;
	          arg.options = {
	            enabled: options.enabled,
	            endOnly: options.endOnly,
	            inner: utils.extend({}, restrictEdges.noInner),
	            outer: utils.extend({}, restrictEdges.noOuter)
	          };

	          if (edges.top) {
	            arg.options.inner.top = rect.bottom - minSize.height;
	            arg.options.outer.top = rect.bottom - maxSize.height;
	          } else if (edges.bottom) {
	            arg.options.inner.bottom = rect.top + minSize.height;
	            arg.options.outer.bottom = rect.top + maxSize.height;
	          }

	          if (edges.left) {
	            arg.options.inner.left = rect.right - minSize.width;
	            arg.options.outer.left = rect.right - maxSize.width;
	          } else if (edges.right) {
	            arg.options.inner.right = rect.left + minSize.width;
	            arg.options.outer.right = rect.left + maxSize.width;
	          }

	          restrictEdges.set(arg);
	        },
	        modifyCoords: restrictEdges.modifyCoords
	      };
	      modifiers.restrictSize = restrictSize;
	      modifiers.names.push('restrictSize');
	      defaultOptions.perAction.restrictSize = restrictSize.defaults;
	      resize.defaults.restrictSize = restrictSize.defaults;
	      module.exports = restrictSize;
	    }, {
	      "../actions/resize": 10,
	      "../defaultOptions": 18,
	      "../utils": 44,
	      "../utils/rect": 51,
	      "./base": 23,
	      "./restrictEdges": 25
	    }],
	    27: [function (require, module, exports) {

	      var modifiers = require('./base');

	      var interact = require('../interact');

	      var utils = require('../utils');

	      var defaultOptions = require('../defaultOptions');

	      var snap = {
	        defaults: {
	          enabled: false,
	          endOnly: false,
	          range: Infinity,
	          targets: null,
	          offsets: null,
	          relativePoints: null
	        },
	        setOffset: function setOffset(_ref) {
	          var interaction = _ref.interaction,
	              interactable = _ref.interactable,
	              element = _ref.element,
	              rect = _ref.rect,
	              startOffset = _ref.startOffset,
	              options = _ref.options;
	          var offsets = [];
	          var optionsOrigin = utils.rectToXY(utils.resolveRectLike(options.origin));
	          var origin = optionsOrigin || utils.getOriginXY(interactable, element, interaction.prepared.name);
	          options = options || interactable.options[interaction.prepared.name].snap || {};
	          var snapOffset = void 0;

	          if (options.offset === 'startCoords') {
	            snapOffset = {
	              x: interaction.startCoords.page.x - origin.x,
	              y: interaction.startCoords.page.y - origin.y
	            };
	          } else {
	            var offsetRect = utils.resolveRectLike(options.offset, interactable, element, [interaction]);
	            snapOffset = utils.rectToXY(offsetRect) || {
	              x: 0,
	              y: 0
	            };
	          }

	          if (rect && options.relativePoints && options.relativePoints.length) {
	            for (var _i = 0; _i < options.relativePoints.length; _i++) {
	              var _ref3;

	              _ref3 = options.relativePoints[_i];
	              var _ref2 = _ref3;
	              var relativeX = _ref2.x;
	              var relativeY = _ref2.y;
	              offsets.push({
	                x: startOffset.left - rect.width * relativeX + snapOffset.x,
	                y: startOffset.top - rect.height * relativeY + snapOffset.y
	              });
	            }
	          } else {
	            offsets.push(snapOffset);
	          }

	          return offsets;
	        },
	        set: function set(_ref4) {
	          var interaction = _ref4.interaction,
	              modifiedCoords = _ref4.modifiedCoords,
	              status = _ref4.status,
	              options = _ref4.options,
	              offsets = _ref4.offset;
	          var targets = [];
	          var target = void 0;
	          var page = void 0;
	          var i = void 0;

	          if (status.useStatusXY) {
	            page = {
	              x: status.x,
	              y: status.y
	            };
	          } else {
	            var origin = utils.getOriginXY(interaction.target, interaction.element, interaction.prepared.name);
	            page = utils.extend({}, modifiedCoords);
	            page.x -= origin.x;
	            page.y -= origin.y;
	          }

	          status.realX = page.x;
	          status.realY = page.y;
	          var len = options.targets ? options.targets.length : 0;

	          for (var _i2 = 0; _i2 < offsets.length; _i2++) {
	            var _ref6;

	            _ref6 = offsets[_i2];
	            var _ref5 = _ref6;
	            var offsetX = _ref5.x;
	            var offsetY = _ref5.y;
	            var relativeX = page.x - offsetX;
	            var relativeY = page.y - offsetY;

	            for (var _i3 = 0; _i3 < (options.targets || []).length; _i3++) {
	              var _ref7;

	              _ref7 = (options.targets || [])[_i3];
	              var snapTarget = _ref7;

	              if (utils.is.function(snapTarget)) {
	                target = snapTarget(relativeX, relativeY, interaction);
	              } else {
	                target = snapTarget;
	              }

	              if (!target) {
	                continue;
	              }

	              targets.push({
	                x: utils.is.number(target.x) ? target.x + offsetX : relativeX,
	                y: utils.is.number(target.y) ? target.y + offsetY : relativeY,
	                range: utils.is.number(target.range) ? target.range : options.range
	              });
	            }
	          }

	          var closest = {
	            target: null,
	            inRange: false,
	            distance: 0,
	            range: 0,
	            dx: 0,
	            dy: 0
	          };

	          for (i = 0, len = targets.length; i < len; i++) {
	            target = targets[i];
	            var range = target.range;
	            var dx = target.x - page.x;
	            var dy = target.y - page.y;
	            var distance = utils.hypot(dx, dy);
	            var inRange = distance <= range; // Infinite targets count as being out of range
	            // compared to non infinite ones that are in range

	            if (range === Infinity && closest.inRange && closest.range !== Infinity) {
	              inRange = false;
	            }

	            if (!closest.target || (inRange // is the closest target in range?
	            ? closest.inRange && range !== Infinity // the pointer is relatively deeper in this target
	            ? distance / range < closest.distance / closest.range // this target has Infinite range and the closest doesn't
	            : range === Infinity && closest.range !== Infinity || // OR this target is closer that the previous closest
	            distance < closest.distance : // The other is not in range and the pointer is closer to this target
	            !closest.inRange && distance < closest.distance)) {
	              closest.target = target;
	              closest.distance = distance;
	              closest.range = range;
	              closest.inRange = inRange;
	              closest.dx = dx;
	              closest.dy = dy;
	              status.range = range;
	            }
	          }

	          var snapChanged = void 0;

	          if (closest.target) {
	            snapChanged = status.modifiedX !== closest.target.x || status.modifiedY !== closest.target.y;
	            status.modifiedX = closest.target.x;
	            status.modifiedY = closest.target.y;
	          } else {
	            snapChanged = true;
	            status.modifiedX = NaN;
	            status.modifiedY = NaN;
	          }

	          status.dx = closest.dx;
	          status.dy = closest.dy;
	          status.changed = snapChanged || closest.inRange && !status.locked;
	          status.locked = closest.inRange;
	        },
	        modifyCoords: function modifyCoords(_ref8) {
	          var page = _ref8.page,
	              client = _ref8.client,
	              status = _ref8.status,
	              phase = _ref8.phase,
	              options = _ref8.options;
	          var relativePoints = options && options.relativePoints;

	          if (options && options.enabled && !(phase === 'start' && relativePoints && relativePoints.length)) {
	            if (status.locked) {
	              page.x += status.dx;
	              page.y += status.dy;
	              client.x += status.dx;
	              client.y += status.dy;
	            }

	            return {
	              range: status.range,
	              locked: status.locked,
	              x: status.modifiedX,
	              y: status.modifiedY,
	              realX: status.realX,
	              realY: status.realY,
	              dx: status.dx,
	              dy: status.dy
	            };
	          }
	        }
	      };

	      interact.createSnapGrid = function (grid) {
	        return function (x, y) {
	          var limits = grid.limits || {
	            left: -Infinity,
	            right: Infinity,
	            top: -Infinity,
	            bottom: Infinity
	          };
	          var offsetX = 0;
	          var offsetY = 0;

	          if (utils.is.object(grid.offset)) {
	            offsetX = grid.offset.x;
	            offsetY = grid.offset.y;
	          }

	          var gridx = Math.round((x - offsetX) / grid.x);
	          var gridy = Math.round((y - offsetY) / grid.y);
	          var newX = Math.max(limits.left, Math.min(limits.right, gridx * grid.x + offsetX));
	          var newY = Math.max(limits.top, Math.min(limits.bottom, gridy * grid.y + offsetY));
	          return {
	            x: newX,
	            y: newY,
	            range: grid.range
	          };
	        };
	      };

	      modifiers.snap = snap;
	      modifiers.names.push('snap');
	      defaultOptions.perAction.snap = snap.defaults;
	      module.exports = snap;
	    }, {
	      "../defaultOptions": 18,
	      "../interact": 21,
	      "../utils": 44,
	      "./base": 23
	    }],
	    28: [function (require, module, exports) {
	      // interactions.

	      var modifiers = require('./base');

	      var snap = require('./snap');

	      var defaultOptions = require('../defaultOptions');

	      var resize = require('../actions/resize');

	      var utils = require('../utils/');

	      var snapSize = {
	        defaults: {
	          enabled: false,
	          endOnly: false,
	          range: Infinity,
	          targets: null,
	          offsets: null
	        },
	        setOffset: function setOffset(arg) {
	          var interaction = arg.interaction,
	              options = arg.options;
	          var edges = interaction.prepared.edges;

	          if (!edges) {
	            return;
	          }

	          arg.options = {
	            relativePoints: [{
	              x: edges.left ? 0 : 1,
	              y: edges.top ? 0 : 1
	            }],
	            origin: {
	              x: 0,
	              y: 0
	            },
	            offset: 'self',
	            range: options.range
	          };
	          var offsets = snap.setOffset(arg);
	          arg.options = options;
	          return offsets;
	        },
	        set: function set(arg) {
	          var interaction = arg.interaction,
	              options = arg.options,
	              offset = arg.offset,
	              modifiedCoords = arg.modifiedCoords;
	          var page = utils.extend({}, modifiedCoords);
	          var relativeX = page.x - offset[0].x;
	          var relativeY = page.y - offset[0].y;
	          arg.options = utils.extend({}, options);
	          arg.options.targets = [];

	          for (var _i = 0; _i < (options.targets || []).length; _i++) {
	            var _ref;

	            _ref = (options.targets || [])[_i];
	            var snapTarget = _ref;
	            var target = void 0;

	            if (utils.is.function(snapTarget)) {
	              target = snapTarget(relativeX, relativeY, interaction);
	            } else {
	              target = snapTarget;
	            }

	            if (!target) {
	              continue;
	            }

	            if ('width' in target && 'height' in target) {
	              target.x = target.width;
	              target.y = target.height;
	            }

	            arg.options.targets.push(target);
	          }

	          snap.set(arg);
	        },
	        modifyCoords: function modifyCoords(arg) {
	          var options = arg.options;
	          arg.options = utils.extend({}, options);
	          arg.options.enabled = options.enabled;
	          arg.options.relativePoints = [null];
	          snap.modifyCoords(arg);
	        }
	      };
	      modifiers.snapSize = snapSize;
	      modifiers.names.push('snapSize');
	      defaultOptions.perAction.snapSize = snapSize.defaults;
	      resize.defaults.snapSize = snapSize.defaults;
	      module.exports = snapSize;
	    }, {
	      "../actions/resize": 10,
	      "../defaultOptions": 18,
	      "../utils/": 44,
	      "./base": 23,
	      "./snap": 27
	    }],
	    29: [function (require, module, exports) {

	      function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	          throw new TypeError("Cannot call a class as a function");
	        }
	      }

	      var pointerUtils = require('../utils/pointerUtils');

	      module.exports = function () {
	        /** */
	        function PointerEvent(type, pointer, event, eventTarget, interaction) {
	          _classCallCheck(this, PointerEvent);

	          pointerUtils.pointerExtend(this, event);

	          if (event !== pointer) {
	            pointerUtils.pointerExtend(this, pointer);
	          }

	          this.interaction = interaction;
	          this.timeStamp = new Date().getTime();
	          this.originalEvent = event;
	          this.type = type;
	          this.pointerId = pointerUtils.getPointerId(pointer);
	          this.pointerType = pointerUtils.getPointerType(pointer);
	          this.target = eventTarget;
	          this.currentTarget = null;

	          if (type === 'tap') {
	            var pointerIndex = interaction.getPointerIndex(pointer);
	            this.dt = this.timeStamp - interaction.downTimes[pointerIndex];
	            var interval = this.timeStamp - interaction.tapTime;
	            this.double = !!(interaction.prevTap && interaction.prevTap.type !== 'doubletap' && interaction.prevTap.target === this.target && interval < 500);
	          } else if (type === 'doubletap') {
	            this.dt = pointer.timeStamp - interaction.tapTime;
	          }
	        }

	        PointerEvent.prototype.subtractOrigin = function subtractOrigin(_ref) {
	          var originX = _ref.x,
	              originY = _ref.y;
	          this.pageX -= originX;
	          this.pageY -= originY;
	          this.clientX -= originX;
	          this.clientY -= originY;
	          return this;
	        };

	        PointerEvent.prototype.addOrigin = function addOrigin(_ref2) {
	          var originX = _ref2.x,
	              originY = _ref2.y;
	          this.pageX += originX;
	          this.pageY += originY;
	          this.clientX += originX;
	          this.clientY += originY;
	          return this;
	        };
	        /** */


	        PointerEvent.prototype.preventDefault = function preventDefault() {
	          this.originalEvent.preventDefault();
	        };
	        /** */


	        PointerEvent.prototype.stopPropagation = function stopPropagation() {
	          this.propagationStopped = true;
	        };
	        /** */


	        PointerEvent.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
	          this.immediatePropagationStopped = this.propagationStopped = true;
	        };

	        return PointerEvent;
	      }();
	    }, {
	      "../utils/pointerUtils": 49
	    }],
	    30: [function (require, module, exports) {

	      var PointerEvent = require('./PointerEvent');

	      var Interaction = require('../Interaction');

	      var utils = require('../utils');

	      var defaults = require('../defaultOptions');

	      var signals = require('../utils/Signals').new();

	      var simpleSignals = ['down', 'up', 'cancel'];
	      var simpleEvents = ['down', 'up', 'cancel'];
	      var pointerEvents = {
	        PointerEvent: PointerEvent,
	        fire: fire,
	        collectEventTargets: collectEventTargets,
	        signals: signals,
	        defaults: {
	          holdDuration: 600,
	          ignoreFrom: null,
	          allowFrom: null,
	          origin: {
	            x: 0,
	            y: 0
	          }
	        },
	        types: ['down', 'move', 'up', 'cancel', 'tap', 'doubletap', 'hold']
	      };

	      function fire(arg) {
	        var interaction = arg.interaction,
	            pointer = arg.pointer,
	            event = arg.event,
	            eventTarget = arg.eventTarget,
	            _arg$type = arg.type,
	            type = _arg$type === undefined ? arg.pointerEvent.type : _arg$type,
	            _arg$targets = arg.targets,
	            targets = _arg$targets === undefined ? collectEventTargets(arg) : _arg$targets,
	            _arg$pointerEvent = arg.pointerEvent,
	            pointerEvent = _arg$pointerEvent === undefined ? new PointerEvent(type, pointer, event, eventTarget, interaction) : _arg$pointerEvent;
	        var signalArg = {
	          interaction: interaction,
	          pointer: pointer,
	          event: event,
	          eventTarget: eventTarget,
	          targets: targets,
	          type: type,
	          pointerEvent: pointerEvent
	        };

	        for (var i = 0; i < targets.length; i++) {
	          var target = targets[i];

	          for (var prop in target.props || {}) {
	            pointerEvent[prop] = target.props[prop];
	          }

	          var origin = utils.getOriginXY(target.eventable, target.element);
	          pointerEvent.subtractOrigin(origin);
	          pointerEvent.eventable = target.eventable;
	          pointerEvent.currentTarget = target.element;
	          target.eventable.fire(pointerEvent);
	          pointerEvent.addOrigin(origin);

	          if (pointerEvent.immediatePropagationStopped || pointerEvent.propagationStopped && i + 1 < targets.length && targets[i + 1].element !== pointerEvent.currentTarget) {
	            break;
	          }
	        }

	        signals.fire('fired', signalArg);

	        if (type === 'tap') {
	          // if pointerEvent should make a double tap, create and fire a doubletap
	          // PointerEvent and use that as the prevTap
	          var prevTap = pointerEvent.double ? fire({
	            interaction: interaction,
	            pointer: pointer,
	            event: event,
	            eventTarget: eventTarget,
	            type: 'doubletap'
	          }) : pointerEvent;
	          interaction.prevTap = prevTap;
	          interaction.tapTime = prevTap.timeStamp;
	        }

	        return pointerEvent;
	      }

	      function collectEventTargets(_ref) {
	        var interaction = _ref.interaction,
	            pointer = _ref.pointer,
	            event = _ref.event,
	            eventTarget = _ref.eventTarget,
	            type = _ref.type;
	        var pointerIndex = interaction.getPointerIndex(pointer); // do not fire a tap event if the pointer was moved before being lifted

	        if (type === 'tap' && (interaction.pointerWasMoved // or if the pointerup target is different to the pointerdown target
	        || !(interaction.downTargets[pointerIndex] && interaction.downTargets[pointerIndex] === eventTarget))) {
	          return [];
	        }

	        var path = utils.getPath(eventTarget);
	        var signalArg = {
	          interaction: interaction,
	          pointer: pointer,
	          event: event,
	          eventTarget: eventTarget,
	          type: type,
	          path: path,
	          targets: [],
	          element: null
	        };

	        for (var _i = 0; _i < path.length; _i++) {
	          var _ref2;

	          _ref2 = path[_i];
	          var element = _ref2;
	          signalArg.element = element;
	          signals.fire('collect-targets', signalArg);
	        }

	        if (type === 'hold') {
	          signalArg.targets = signalArg.targets.filter(function (target) {
	            return target.eventable.options.holdDuration === interaction.holdTimers[pointerIndex].duration;
	          });
	        }

	        return signalArg.targets;
	      }

	      Interaction.signals.on('update-pointer-down', function (_ref3) {
	        var interaction = _ref3.interaction,
	            pointerIndex = _ref3.pointerIndex;
	        interaction.holdTimers[pointerIndex] = {
	          duration: Infinity,
	          timeout: null
	        };
	      });
	      Interaction.signals.on('remove-pointer', function (_ref4) {
	        var interaction = _ref4.interaction,
	            pointerIndex = _ref4.pointerIndex;
	        interaction.holdTimers.splice(pointerIndex, 1);
	      });
	      Interaction.signals.on('move', function (_ref5) {
	        var interaction = _ref5.interaction,
	            pointer = _ref5.pointer,
	            event = _ref5.event,
	            eventTarget = _ref5.eventTarget,
	            duplicateMove = _ref5.duplicateMove;
	        var pointerIndex = interaction.getPointerIndex(pointer);

	        if (!duplicateMove && (!interaction.pointerIsDown || interaction.pointerWasMoved)) {
	          if (interaction.pointerIsDown) {
	            clearTimeout(interaction.holdTimers[pointerIndex].timeout);
	          }

	          fire({
	            interaction: interaction,
	            pointer: pointer,
	            event: event,
	            eventTarget: eventTarget,
	            type: 'move'
	          });
	        }
	      });
	      Interaction.signals.on('down', function (_ref6) {
	        var interaction = _ref6.interaction,
	            pointer = _ref6.pointer,
	            event = _ref6.event,
	            eventTarget = _ref6.eventTarget,
	            pointerIndex = _ref6.pointerIndex;
	        var timer = interaction.holdTimers[pointerIndex];
	        var path = utils.getPath(eventTarget);
	        var signalArg = {
	          interaction: interaction,
	          pointer: pointer,
	          event: event,
	          eventTarget: eventTarget,
	          type: 'hold',
	          targets: [],
	          path: path,
	          element: null
	        };

	        for (var _i2 = 0; _i2 < path.length; _i2++) {
	          var _ref7;

	          _ref7 = path[_i2];
	          var element = _ref7;
	          signalArg.element = element;
	          signals.fire('collect-targets', signalArg);
	        }

	        if (!signalArg.targets.length) {
	          return;
	        }

	        var minDuration = Infinity;

	        for (var _i3 = 0; _i3 < signalArg.targets.length; _i3++) {
	          var _ref8;

	          _ref8 = signalArg.targets[_i3];
	          var target = _ref8;
	          var holdDuration = target.eventable.options.holdDuration;

	          if (holdDuration < minDuration) {
	            minDuration = holdDuration;
	          }
	        }

	        timer.duration = minDuration;
	        timer.timeout = setTimeout(function () {
	          fire({
	            interaction: interaction,
	            eventTarget: eventTarget,
	            pointer: pointer,
	            event: event,
	            type: 'hold'
	          });
	        }, minDuration);
	      });
	      Interaction.signals.on('up', function (_ref9) {
	        var interaction = _ref9.interaction,
	            pointer = _ref9.pointer,
	            event = _ref9.event,
	            eventTarget = _ref9.eventTarget;

	        if (!interaction.pointerWasMoved) {
	          fire({
	            interaction: interaction,
	            eventTarget: eventTarget,
	            pointer: pointer,
	            event: event,
	            type: 'tap'
	          });
	        }
	      });
	      var _arr = ['up', 'cancel'];

	      for (var _i4 = 0; _i4 < _arr.length; _i4++) {
	        var signalName = _arr[_i4];
	        Interaction.signals.on(signalName, function (_ref11) {
	          var interaction = _ref11.interaction,
	              pointerIndex = _ref11.pointerIndex;

	          if (interaction.holdTimers[pointerIndex]) {
	            clearTimeout(interaction.holdTimers[pointerIndex].timeout);
	          }
	        });
	      }

	      function createSignalListener(type) {
	        return function (_ref10) {
	          var interaction = _ref10.interaction,
	              pointer = _ref10.pointer,
	              event = _ref10.event,
	              eventTarget = _ref10.eventTarget;
	          fire({
	            interaction: interaction,
	            eventTarget: eventTarget,
	            pointer: pointer,
	            event: event,
	            type: type
	          });
	        };
	      }

	      for (var i = 0; i < simpleSignals.length; i++) {
	        Interaction.signals.on(simpleSignals[i], createSignalListener(simpleEvents[i]));
	      }

	      Interaction.signals.on('new', function (interaction) {
	        interaction.prevTap = null; // the most recent tap event on this interaction

	        interaction.tapTime = 0; // time of the most recent tap event

	        interaction.holdTimers = []; // [{ duration, timeout }]
	      });
	      defaults.pointerEvents = pointerEvents.defaults;
	      module.exports = pointerEvents;
	    }, {
	      "../Interaction": 5,
	      "../defaultOptions": 18,
	      "../utils": 44,
	      "../utils/Signals": 34,
	      "./PointerEvent": 29
	    }],
	    31: [function (require, module, exports) {

	      var pointerEvents = require('./base');

	      var Interaction = require('../Interaction');

	      pointerEvents.signals.on('new', onNew);
	      pointerEvents.signals.on('fired', onFired);
	      var _arr = ['move', 'up', 'cancel', 'endall'];

	      for (var _i = 0; _i < _arr.length; _i++) {
	        var signal = _arr[_i];
	        Interaction.signals.on(signal, endHoldRepeat);
	      }

	      function onNew(_ref) {
	        var pointerEvent = _ref.pointerEvent;

	        if (pointerEvent.type !== 'hold') {
	          return;
	        }

	        pointerEvent.count = (pointerEvent.count || 0) + 1;
	      }

	      function onFired(_ref2) {
	        var interaction = _ref2.interaction,
	            pointerEvent = _ref2.pointerEvent,
	            eventTarget = _ref2.eventTarget,
	            targets = _ref2.targets;

	        if (pointerEvent.type !== 'hold' || !targets.length) {
	          return;
	        } // get the repeat interval from the first eventable


	        var interval = targets[0].eventable.options.holdRepeatInterval; // don't repeat if the interval is 0 or less

	        if (interval <= 0) {
	          return;
	        } // set a timeout to fire the holdrepeat event


	        interaction.holdIntervalHandle = setTimeout(function () {
	          pointerEvents.fire({
	            interaction: interaction,
	            eventTarget: eventTarget,
	            type: 'hold',
	            pointer: pointerEvent,
	            event: pointerEvent
	          });
	        }, interval);
	      }

	      function endHoldRepeat(_ref3) {
	        var interaction = _ref3.interaction; // set the interaction's holdStopTime property
	        // to stop further holdRepeat events

	        if (interaction.holdIntervalHandle) {
	          clearInterval(interaction.holdIntervalHandle);
	          interaction.holdIntervalHandle = null;
	        }
	      } // don't repeat by default


	      pointerEvents.defaults.holdRepeatInterval = 0;
	      pointerEvents.types.push('holdrepeat');
	      module.exports = {
	        onNew: onNew,
	        onFired: onFired,
	        endHoldRepeat: endHoldRepeat
	      };
	    }, {
	      "../Interaction": 5,
	      "./base": 30
	    }],
	    32: [function (require, module, exports) {

	      var pointerEvents = require('./base');

	      var Interactable = require('../Interactable');

	      var is = require('../utils/is');

	      var scope = require('../scope');

	      var extend = require('../utils/extend');

	      var _require = require('../utils/arr'),
	          merge = _require.merge;

	      pointerEvents.signals.on('collect-targets', function (_ref) {
	        var targets = _ref.targets,
	            element = _ref.element,
	            type = _ref.type,
	            eventTarget = _ref.eventTarget;
	        scope.interactables.forEachMatch(element, function (interactable) {
	          var eventable = interactable.events;
	          var options = eventable.options;

	          if (eventable[type] && is.element(element) && interactable.testIgnoreAllow(options, element, eventTarget)) {
	            targets.push({
	              element: element,
	              eventable: eventable,
	              props: {
	                interactable: interactable
	              }
	            });
	          }
	        });
	      });
	      Interactable.signals.on('new', function (_ref2) {
	        var interactable = _ref2.interactable;

	        interactable.events.getRect = function (element) {
	          return interactable.getRect(element);
	        };
	      });
	      Interactable.signals.on('set', function (_ref3) {
	        var interactable = _ref3.interactable,
	            options = _ref3.options;
	        extend(interactable.events.options, pointerEvents.defaults);
	        extend(interactable.events.options, options);
	      });
	      merge(Interactable.eventTypes, pointerEvents.types);

	      Interactable.prototype.pointerEvents = function (options) {
	        extend(this.events.options, options);
	        return this;
	      };

	      var __backCompatOption = Interactable.prototype._backCompatOption;

	      Interactable.prototype._backCompatOption = function (optionName, newValue) {
	        var ret = __backCompatOption.call(this, optionName, newValue);

	        if (ret === this) {
	          this.events.options[optionName] = newValue;
	        }

	        return ret;
	      };

	      Interactable.settingsMethods.push('pointerEvents');
	    }, {
	      "../Interactable": 4,
	      "../scope": 33,
	      "../utils/arr": 35,
	      "../utils/extend": 41,
	      "../utils/is": 46,
	      "./base": 30
	    }],
	    33: [function (require, module, exports) {

	      var utils = require('./utils');

	      var events = require('./utils/events');

	      var signals = require('./utils/Signals').new();

	      var _require = require('./utils/window'),
	          getWindow = _require.getWindow;

	      var scope = {
	        signals: signals,
	        events: events,
	        utils: utils,
	        // main document
	        document: require('./utils/domObjects').document,
	        // all documents being listened to
	        documents: [],
	        addDocument: function addDocument(doc, win) {
	          // do nothing if document is already known
	          if (utils.contains(scope.documents, doc)) {
	            return false;
	          }

	          win = win || getWindow(doc);
	          scope.documents.push(doc);
	          events.documents.push(doc); // don't add an unload event for the main document
	          // so that the page may be cached in browser history

	          if (doc !== scope.document) {
	            events.add(win, 'unload', scope.onWindowUnload);
	          }

	          signals.fire('add-document', {
	            doc: doc,
	            win: win
	          });
	        },
	        removeDocument: function removeDocument(doc, win) {
	          var index = scope.documents.indexOf(doc);
	          win = win || getWindow(doc);
	          events.remove(win, 'unload', scope.onWindowUnload);
	          scope.documents.splice(index, 1);
	          events.documents.splice(index, 1);
	          signals.fire('remove-document', {
	            win: win,
	            doc: doc
	          });
	        },
	        onWindowUnload: function onWindowUnload() {
	          scope.removeDocument(this.document, this);
	        }
	      };
	      module.exports = scope;
	    }, {
	      "./utils": 44,
	      "./utils/Signals": 34,
	      "./utils/domObjects": 38,
	      "./utils/events": 40,
	      "./utils/window": 52
	    }],
	    34: [function (require, module, exports) {

	      function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	          throw new TypeError("Cannot call a class as a function");
	        }
	      }

	      var Signals = function () {
	        function Signals() {
	          _classCallCheck(this, Signals);

	          this.listeners = {// signalName: [listeners],
	          };
	        }

	        Signals.prototype.on = function on(name, listener) {
	          if (!this.listeners[name]) {
	            this.listeners[name] = [listener];
	            return;
	          }

	          this.listeners[name].push(listener);
	        };

	        Signals.prototype.off = function off(name, listener) {
	          if (!this.listeners[name]) {
	            return;
	          }

	          var index = this.listeners[name].indexOf(listener);

	          if (index !== -1) {
	            this.listeners[name].splice(index, 1);
	          }
	        };

	        Signals.prototype.fire = function fire(name, arg) {
	          var targetListeners = this.listeners[name];

	          if (!targetListeners) {
	            return;
	          }

	          for (var _i = 0; _i < targetListeners.length; _i++) {
	            var _ref;

	            _ref = targetListeners[_i];
	            var listener = _ref;

	            if (listener(arg, name) === false) {
	              return;
	            }
	          }
	        };

	        return Signals;
	      }();

	      Signals.new = function () {
	        return new Signals();
	      };

	      module.exports = Signals;
	    }, {}],
	    35: [function (require, module, exports) {

	      function contains(array, target) {
	        return array.indexOf(target) !== -1;
	      }

	      function merge(target, source) {
	        for (var _i = 0; _i < source.length; _i++) {
	          var _ref;

	          _ref = source[_i];
	          var item = _ref;
	          target.push(item);
	        }

	        return target;
	      }

	      module.exports = {
	        contains: contains,
	        merge: merge
	      };
	    }, {}],
	    36: [function (require, module, exports) {

	      var _require = require('./window'),
	          window = _require.window;

	      var is = require('./is');

	      var domObjects = require('./domObjects');

	      var Element = domObjects.Element;
	      var navigator = window.navigator;
	      var browser = {
	        // Does the browser support touch input?
	        supportsTouch: !!('ontouchstart' in window || is.function(window.DocumentTouch) && domObjects.document instanceof window.DocumentTouch),
	        // Does the browser support PointerEvents
	        supportsPointerEvent: !!domObjects.PointerEvent,
	        isIOS: /iP(hone|od|ad)/.test(navigator.platform),
	        // scrolling doesn't change the result of getClientRects on iOS 7
	        isIOS7: /iP(hone|od|ad)/.test(navigator.platform) && /OS 7[^\d]/.test(navigator.appVersion),
	        isIe9: /MSIE 9/.test(navigator.userAgent),
	        // prefix matchesSelector
	        prefixedMatchesSelector: 'matches' in Element.prototype ? 'matches' : 'webkitMatchesSelector' in Element.prototype ? 'webkitMatchesSelector' : 'mozMatchesSelector' in Element.prototype ? 'mozMatchesSelector' : 'oMatchesSelector' in Element.prototype ? 'oMatchesSelector' : 'msMatchesSelector',
	        pEventTypes: domObjects.PointerEvent ? domObjects.PointerEvent === window.MSPointerEvent ? {
	          up: 'MSPointerUp',
	          down: 'MSPointerDown',
	          over: 'mouseover',
	          out: 'mouseout',
	          move: 'MSPointerMove',
	          cancel: 'MSPointerCancel'
	        } : {
	          up: 'pointerup',
	          down: 'pointerdown',
	          over: 'pointerover',
	          out: 'pointerout',
	          move: 'pointermove',
	          cancel: 'pointercancel'
	        } : null,
	        // because Webkit and Opera still use 'mousewheel' event type
	        wheelEvent: 'onmousewheel' in domObjects.document ? 'mousewheel' : 'wheel'
	      }; // Opera Mobile must be handled differently

	      browser.isOperaMobile = navigator.appName === 'Opera' && browser.supportsTouch && navigator.userAgent.match('Presto');
	      module.exports = browser;
	    }, {
	      "./domObjects": 38,
	      "./is": 46,
	      "./window": 52
	    }],
	    37: [function (require, module, exports) {

	      var is = require('./is');

	      module.exports = function clone(source) {
	        var dest = {};

	        for (var prop in source) {
	          if (is.plainObject(source[prop])) {
	            dest[prop] = clone(source[prop]);
	          } else {
	            dest[prop] = source[prop];
	          }
	        }

	        return dest;
	      };
	    }, {
	      "./is": 46
	    }],
	    38: [function (require, module, exports) {

	      var domObjects = {};

	      var win = require('./window').window;

	      function blank() {}

	      domObjects.document = win.document;
	      domObjects.DocumentFragment = win.DocumentFragment || blank;
	      domObjects.SVGElement = win.SVGElement || blank;
	      domObjects.SVGSVGElement = win.SVGSVGElement || blank;
	      domObjects.SVGElementInstance = win.SVGElementInstance || blank;
	      domObjects.Element = win.Element || blank;
	      domObjects.HTMLElement = win.HTMLElement || domObjects.Element;
	      domObjects.Event = win.Event;
	      domObjects.Touch = win.Touch || blank;
	      domObjects.PointerEvent = win.PointerEvent || win.MSPointerEvent;
	      module.exports = domObjects;
	    }, {
	      "./window": 52
	    }],
	    39: [function (require, module, exports) {

	      var win = require('./window');

	      var browser = require('./browser');

	      var is = require('./is');

	      var domObjects = require('./domObjects');

	      var domUtils = {
	        nodeContains: function nodeContains(parent, child) {
	          while (child) {
	            if (child === parent) {
	              return true;
	            }

	            child = child.parentNode;
	          }

	          return false;
	        },
	        closest: function closest(element, selector) {
	          while (is.element(element)) {
	            if (domUtils.matchesSelector(element, selector)) {
	              return element;
	            }

	            element = domUtils.parentNode(element);
	          }

	          return null;
	        },
	        parentNode: function parentNode(node) {
	          var parent = node.parentNode;

	          if (is.docFrag(parent)) {
	            // skip past #shado-root fragments
	            while ((parent = parent.host) && is.docFrag(parent)) {
	              continue;
	            }

	            return parent;
	          }

	          return parent;
	        },
	        matchesSelector: function matchesSelector(element, selector) {
	          // remove /deep/ from selectors if shadowDOM polyfill is used
	          if (win.window !== win.realWindow) {
	            selector = selector.replace(/\/deep\//g, ' ');
	          }

	          return element[browser.prefixedMatchesSelector](selector);
	        },
	        // Test for the element that's "above" all other qualifiers
	        indexOfDeepestElement: function indexOfDeepestElement(elements) {
	          var deepestZoneParents = [];
	          var dropzoneParents = [];
	          var dropzone = void 0;
	          var deepestZone = elements[0];
	          var index = deepestZone ? 0 : -1;
	          var parent = void 0;
	          var child = void 0;
	          var i = void 0;
	          var n = void 0;

	          for (i = 1; i < elements.length; i++) {
	            dropzone = elements[i]; // an element might belong to multiple selector dropzones

	            if (!dropzone || dropzone === deepestZone) {
	              continue;
	            }

	            if (!deepestZone) {
	              deepestZone = dropzone;
	              index = i;
	              continue;
	            } // check if the deepest or current are document.documentElement or document.rootElement
	            // - if the current dropzone is, do nothing and continue


	            if (dropzone.parentNode === dropzone.ownerDocument) {
	              continue;
	            } // - if deepest is, update with the current dropzone and continue to next
	            else if (deepestZone.parentNode === dropzone.ownerDocument) {
	                deepestZone = dropzone;
	                index = i;
	                continue;
	              }

	            if (!deepestZoneParents.length) {
	              parent = deepestZone;

	              while (parent.parentNode && parent.parentNode !== parent.ownerDocument) {
	                deepestZoneParents.unshift(parent);
	                parent = parent.parentNode;
	              }
	            } // if this element is an svg element and the current deepest is
	            // an HTMLElement


	            if (deepestZone instanceof domObjects.HTMLElement && dropzone instanceof domObjects.SVGElement && !(dropzone instanceof domObjects.SVGSVGElement)) {
	              if (dropzone === deepestZone.parentNode) {
	                continue;
	              }

	              parent = dropzone.ownerSVGElement;
	            } else {
	              parent = dropzone;
	            }

	            dropzoneParents = [];

	            while (parent.parentNode !== parent.ownerDocument) {
	              dropzoneParents.unshift(parent);
	              parent = parent.parentNode;
	            }

	            n = 0; // get (position of last common ancestor) + 1

	            while (dropzoneParents[n] && dropzoneParents[n] === deepestZoneParents[n]) {
	              n++;
	            }

	            var parents = [dropzoneParents[n - 1], dropzoneParents[n], deepestZoneParents[n]];
	            child = parents[0].lastChild;

	            while (child) {
	              if (child === parents[1]) {
	                deepestZone = dropzone;
	                index = i;
	                deepestZoneParents = [];
	                break;
	              } else if (child === parents[2]) {
	                break;
	              }

	              child = child.previousSibling;
	            }
	          }

	          return index;
	        },
	        matchesUpTo: function matchesUpTo(element, selector, limit) {
	          while (is.element(element)) {
	            if (domUtils.matchesSelector(element, selector)) {
	              return true;
	            }

	            element = domUtils.parentNode(element);

	            if (element === limit) {
	              return domUtils.matchesSelector(element, selector);
	            }
	          }

	          return false;
	        },
	        getActualElement: function getActualElement(element) {
	          return element instanceof domObjects.SVGElementInstance ? element.correspondingUseElement : element;
	        },
	        getScrollXY: function getScrollXY(relevantWindow) {
	          relevantWindow = relevantWindow || win.window;
	          return {
	            x: relevantWindow.scrollX || relevantWindow.document.documentElement.scrollLeft,
	            y: relevantWindow.scrollY || relevantWindow.document.documentElement.scrollTop
	          };
	        },
	        getElementClientRect: function getElementClientRect(element) {
	          var clientRect = element instanceof domObjects.SVGElement ? element.getBoundingClientRect() : element.getClientRects()[0];
	          return clientRect && {
	            left: clientRect.left,
	            right: clientRect.right,
	            top: clientRect.top,
	            bottom: clientRect.bottom,
	            width: clientRect.width || clientRect.right - clientRect.left,
	            height: clientRect.height || clientRect.bottom - clientRect.top
	          };
	        },
	        getElementRect: function getElementRect(element) {
	          var clientRect = domUtils.getElementClientRect(element);

	          if (!browser.isIOS7 && clientRect) {
	            var scroll = domUtils.getScrollXY(win.getWindow(element));
	            clientRect.left += scroll.x;
	            clientRect.right += scroll.x;
	            clientRect.top += scroll.y;
	            clientRect.bottom += scroll.y;
	          }

	          return clientRect;
	        },
	        getPath: function getPath(element) {
	          var path = [];

	          while (element) {
	            path.push(element);
	            element = domUtils.parentNode(element);
	          }

	          return path;
	        },
	        trySelector: function trySelector(value) {
	          if (!is.string(value)) {
	            return false;
	          } // an exception will be raised if it is invalid


	          domObjects.document.querySelector(value);
	          return true;
	        }
	      };
	      module.exports = domUtils;
	    }, {
	      "./browser": 36,
	      "./domObjects": 38,
	      "./is": 46,
	      "./window": 52
	    }],
	    40: [function (require, module, exports) {

	      var is = require('./is');

	      var domUtils = require('./domUtils');

	      var pointerUtils = require('./pointerUtils');

	      var pExtend = require('./pointerExtend');

	      var _require = require('./window'),
	          window = _require.window;

	      var _require2 = require('./arr'),
	          contains = _require2.contains;

	      var elements = [];
	      var targets = []; // {
	      //   type: {
	      //     selectors: ['selector', ...],
	      //     contexts : [document, ...],
	      //     listeners: [[listener, capture, passive], ...]
	      //   }
	      //  }

	      var delegatedEvents = {};
	      var documents = [];

	      var supportsOptions = function () {
	        var supported = false;
	        window.document.createElement('div').addEventListener('test', null, {
	          get capture() {
	            supported = true;
	          }

	        });
	        return supported;
	      }();

	      function add(element, type, listener, optionalArg) {
	        var options = getOptions(optionalArg);
	        var elementIndex = elements.indexOf(element);
	        var target = targets[elementIndex];

	        if (!target) {
	          target = {
	            events: {},
	            typeCount: 0
	          };
	          elementIndex = elements.push(element) - 1;
	          targets.push(target);
	        }

	        if (!target.events[type]) {
	          target.events[type] = [];
	          target.typeCount++;
	        }

	        if (!contains(target.events[type], listener)) {
	          element.addEventListener(type, listener, supportsOptions ? options : !!options.capture);
	          target.events[type].push(listener);
	        }
	      }

	      function remove(element, type, listener, optionalArg) {
	        var options = getOptions(optionalArg);
	        var elementIndex = elements.indexOf(element);
	        var target = targets[elementIndex];

	        if (!target || !target.events) {
	          return;
	        }

	        if (type === 'all') {
	          for (type in target.events) {
	            if (target.events.hasOwnProperty(type)) {
	              remove(element, type, 'all');
	            }
	          }

	          return;
	        }

	        if (target.events[type]) {
	          var len = target.events[type].length;

	          if (listener === 'all') {
	            for (var i = 0; i < len; i++) {
	              remove(element, type, target.events[type][i], options);
	            }

	            return;
	          } else {
	            for (var _i = 0; _i < len; _i++) {
	              if (target.events[type][_i] === listener) {
	                element.removeEventListener('on' + type, listener, supportsOptions ? options : !!options.capture);
	                target.events[type].splice(_i, 1);
	                break;
	              }
	            }
	          }

	          if (target.events[type] && target.events[type].length === 0) {
	            target.events[type] = null;
	            target.typeCount--;
	          }
	        }

	        if (!target.typeCount) {
	          targets.splice(elementIndex, 1);
	          elements.splice(elementIndex, 1);
	        }
	      }

	      function addDelegate(selector, context, type, listener, optionalArg) {
	        var options = getOptions(optionalArg);

	        if (!delegatedEvents[type]) {
	          delegatedEvents[type] = {
	            selectors: [],
	            contexts: [],
	            listeners: []
	          }; // add delegate listener functions

	          for (var _i2 = 0; _i2 < documents.length; _i2++) {
	            var doc = documents[_i2];
	            add(doc, type, delegateListener);
	            add(doc, type, delegateUseCapture, true);
	          }
	        }

	        var delegated = delegatedEvents[type];
	        var index = void 0;

	        for (index = delegated.selectors.length - 1; index >= 0; index--) {
	          if (delegated.selectors[index] === selector && delegated.contexts[index] === context) {
	            break;
	          }
	        }

	        if (index === -1) {
	          index = delegated.selectors.length;
	          delegated.selectors.push(selector);
	          delegated.contexts.push(context);
	          delegated.listeners.push([]);
	        } // keep listener and capture and passive flags


	        delegated.listeners[index].push([listener, !!options.capture, options.passive]);
	      }

	      function removeDelegate(selector, context, type, listener, optionalArg) {
	        var options = getOptions(optionalArg);
	        var delegated = delegatedEvents[type];
	        var matchFound = false;
	        var index = void 0;

	        if (!delegated) {
	          return;
	        } // count from last index of delegated to 0


	        for (index = delegated.selectors.length - 1; index >= 0; index--) {
	          // look for matching selector and context Node
	          if (delegated.selectors[index] === selector && delegated.contexts[index] === context) {
	            var listeners = delegated.listeners[index]; // each item of the listeners array is an array: [function, capture, passive]

	            for (var i = listeners.length - 1; i >= 0; i--) {
	              var _listeners$i = listeners[i],
	                  fn = _listeners$i[0],
	                  capture = _listeners$i[1],
	                  passive = _listeners$i[2]; // check if the listener functions and capture and passive flags match

	              if (fn === listener && capture === !!options.capture && passive === options.passive) {
	                // remove the listener from the array of listeners
	                listeners.splice(i, 1); // if all listeners for this interactable have been removed
	                // remove the interactable from the delegated arrays

	                if (!listeners.length) {
	                  delegated.selectors.splice(index, 1);
	                  delegated.contexts.splice(index, 1);
	                  delegated.listeners.splice(index, 1); // remove delegate function from context

	                  remove(context, type, delegateListener);
	                  remove(context, type, delegateUseCapture, true); // remove the arrays if they are empty

	                  if (!delegated.selectors.length) {
	                    delegatedEvents[type] = null;
	                  }
	                } // only remove one listener


	                matchFound = true;
	                break;
	              }
	            }

	            if (matchFound) {
	              break;
	            }
	          }
	        }
	      } // bound to the interactable context when a DOM event
	      // listener is added to a selector interactable


	      function delegateListener(event, optionalArg) {
	        var options = getOptions(optionalArg);
	        var fakeEvent = {};
	        var delegated = delegatedEvents[event.type];

	        var _pointerUtils$getEven = pointerUtils.getEventTargets(event),
	            eventTarget = _pointerUtils$getEven[0];

	        var element = eventTarget; // duplicate the event so that currentTarget can be changed

	        pExtend(fakeEvent, event);
	        fakeEvent.originalEvent = event;
	        fakeEvent.preventDefault = preventOriginalDefault; // climb up document tree looking for selector matches

	        while (is.element(element)) {
	          for (var i = 0; i < delegated.selectors.length; i++) {
	            var selector = delegated.selectors[i];
	            var context = delegated.contexts[i];

	            if (domUtils.matchesSelector(element, selector) && domUtils.nodeContains(context, eventTarget) && domUtils.nodeContains(context, element)) {
	              var listeners = delegated.listeners[i];
	              fakeEvent.currentTarget = element;

	              for (var j = 0; j < listeners.length; j++) {
	                var _listeners$j = listeners[j],
	                    fn = _listeners$j[0],
	                    capture = _listeners$j[1],
	                    passive = _listeners$j[2];

	                if (capture === !!options.capture && passive === options.passive) {
	                  fn(fakeEvent);
	                }
	              }
	            }
	          }

	          element = domUtils.parentNode(element);
	        }
	      }

	      function delegateUseCapture(event) {
	        return delegateListener.call(this, event, true);
	      }

	      function preventOriginalDefault() {
	        this.originalEvent.preventDefault();
	      }

	      function getOptions(param) {
	        return is.object(param) ? param : {
	          capture: param
	        };
	      }

	      module.exports = {
	        add: add,
	        remove: remove,
	        addDelegate: addDelegate,
	        removeDelegate: removeDelegate,
	        delegateListener: delegateListener,
	        delegateUseCapture: delegateUseCapture,
	        delegatedEvents: delegatedEvents,
	        documents: documents,
	        supportsOptions: supportsOptions,
	        _elements: elements,
	        _targets: targets
	      };
	    }, {
	      "./arr": 35,
	      "./domUtils": 39,
	      "./is": 46,
	      "./pointerExtend": 48,
	      "./pointerUtils": 49,
	      "./window": 52
	    }],
	    41: [function (require, module, exports) {

	      module.exports = function extend(dest, source) {
	        for (var prop in source) {
	          dest[prop] = source[prop];
	        }

	        return dest;
	      };
	    }, {}],
	    42: [function (require, module, exports) {

	      var _require = require('./rect'),
	          resolveRectLike = _require.resolveRectLike,
	          rectToXY = _require.rectToXY;

	      module.exports = function (target, element, action) {
	        var actionOptions = target.options[action];
	        var actionOrigin = actionOptions && actionOptions.origin;
	        var origin = actionOrigin || target.options.origin;
	        var originRect = resolveRectLike(origin, target, element, [target && element]);
	        return rectToXY(originRect) || {
	          x: 0,
	          y: 0
	        };
	      };
	    }, {
	      "./rect": 51
	    }],
	    43: [function (require, module, exports) {

	      module.exports = function (x, y) {
	        return Math.sqrt(x * x + y * y);
	      };
	    }, {}],
	    44: [function (require, module, exports) {

	      var extend = require('./extend');

	      var win = require('./window');

	      var utils = {
	        warnOnce: function warnOnce(method, message) {
	          var warned = false;
	          return function () {
	            if (!warned) {
	              win.window.console.warn(message);
	              warned = true;
	            }

	            return method.apply(this, arguments);
	          };
	        },
	        // http://stackoverflow.com/a/5634528/2280888
	        _getQBezierValue: function _getQBezierValue(t, p1, p2, p3) {
	          var iT = 1 - t;
	          return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
	        },
	        getQuadraticCurvePoint: function getQuadraticCurvePoint(startX, startY, cpX, cpY, endX, endY, position) {
	          return {
	            x: utils._getQBezierValue(position, startX, cpX, endX),
	            y: utils._getQBezierValue(position, startY, cpY, endY)
	          };
	        },
	        // http://gizma.com/easing/
	        easeOutQuad: function easeOutQuad(t, b, c, d) {
	          t /= d;
	          return -c * t * (t - 2) + b;
	        },
	        copyAction: function copyAction(dest, src) {
	          dest.name = src.name;
	          dest.axis = src.axis;
	          dest.edges = src.edges;
	          return dest;
	        },
	        is: require('./is'),
	        extend: extend,
	        hypot: require('./hypot'),
	        getOriginXY: require('./getOriginXY')
	      };
	      extend(utils, require('./arr'));
	      extend(utils, require('./domUtils'));
	      extend(utils, require('./pointerUtils'));
	      extend(utils, require('./rect'));
	      module.exports = utils;
	    }, {
	      "./arr": 35,
	      "./domUtils": 39,
	      "./extend": 41,
	      "./getOriginXY": 42,
	      "./hypot": 43,
	      "./is": 46,
	      "./pointerUtils": 49,
	      "./rect": 51,
	      "./window": 52
	    }],
	    45: [function (require, module, exports) {

	      var scope = require('../scope');

	      var utils = require('./index');

	      var finder = {
	        methodOrder: ['simulationResume', 'mouseOrPen', 'hasPointer', 'idle'],
	        search: function search(pointer, eventType, eventTarget) {
	          var pointerType = utils.getPointerType(pointer);
	          var pointerId = utils.getPointerId(pointer);
	          var details = {
	            pointer: pointer,
	            pointerId: pointerId,
	            pointerType: pointerType,
	            eventType: eventType,
	            eventTarget: eventTarget
	          };

	          for (var _i = 0; _i < finder.methodOrder.length; _i++) {
	            var _ref;

	            _ref = finder.methodOrder[_i];
	            var method = _ref;
	            var interaction = finder[method](details);

	            if (interaction) {
	              return interaction;
	            }
	          }
	        },
	        // try to resume simulation with a new pointer
	        simulationResume: function simulationResume(_ref2) {
	          var pointerType = _ref2.pointerType,
	              eventType = _ref2.eventType,
	              eventTarget = _ref2.eventTarget;

	          if (!/down|start/i.test(eventType)) {
	            return null;
	          }

	          for (var _i2 = 0; _i2 < scope.interactions.length; _i2++) {
	            var _ref3;

	            _ref3 = scope.interactions[_i2];
	            var interaction = _ref3;
	            var element = eventTarget;

	            if (interaction.simulation && interaction.simulation.allowResume && interaction.pointerType === pointerType) {
	              while (element) {
	                // if the element is the interaction element
	                if (element === interaction.element) {
	                  return interaction;
	                }

	                element = utils.parentNode(element);
	              }
	            }
	          }

	          return null;
	        },
	        // if it's a mouse or pen interaction
	        mouseOrPen: function mouseOrPen(_ref4) {
	          var pointerId = _ref4.pointerId,
	              pointerType = _ref4.pointerType,
	              eventType = _ref4.eventType;

	          if (pointerType !== 'mouse' && pointerType !== 'pen') {
	            return null;
	          }

	          var firstNonActive = void 0;

	          for (var _i3 = 0; _i3 < scope.interactions.length; _i3++) {
	            var _ref5;

	            _ref5 = scope.interactions[_i3];
	            var interaction = _ref5;

	            if (interaction.pointerType === pointerType) {
	              // if it's a down event, skip interactions with running simulations
	              if (interaction.simulation && !utils.contains(interaction.pointerIds, pointerId)) {
	                continue;
	              } // if the interaction is active, return it immediately


	              if (interaction.interacting()) {
	                return interaction;
	              } // otherwise save it and look for another active interaction
	              else if (!firstNonActive) {
	                  firstNonActive = interaction;
	                }
	            }
	          } // if no active mouse interaction was found use the first inactive mouse
	          // interaction


	          if (firstNonActive) {
	            return firstNonActive;
	          } // find any mouse or pen interaction.
	          // ignore the interaction if the eventType is a *down, and a simulation
	          // is active


	          for (var _i4 = 0; _i4 < scope.interactions.length; _i4++) {
	            var _ref6;

	            _ref6 = scope.interactions[_i4];
	            var _interaction = _ref6;

	            if (_interaction.pointerType === pointerType && !(/down/i.test(eventType) && _interaction.simulation)) {
	              return _interaction;
	            }
	          }

	          return null;
	        },
	        // get interaction that has this pointer
	        hasPointer: function hasPointer(_ref7) {
	          var pointerId = _ref7.pointerId;

	          for (var _i5 = 0; _i5 < scope.interactions.length; _i5++) {
	            var _ref8;

	            _ref8 = scope.interactions[_i5];
	            var interaction = _ref8;

	            if (utils.contains(interaction.pointerIds, pointerId)) {
	              return interaction;
	            }
	          }
	        },
	        // get first idle interaction with a matching pointerType
	        idle: function idle(_ref9) {
	          var pointerType = _ref9.pointerType;

	          for (var _i6 = 0; _i6 < scope.interactions.length; _i6++) {
	            var _ref10;

	            _ref10 = scope.interactions[_i6];
	            var interaction = _ref10; // if there's already a pointer held down

	            if (interaction.pointerIds.length === 1) {
	              var target = interaction.target; // don't add this pointer if there is a target interactable and it
	              // isn't gesturable

	              if (target && !target.options.gesture.enabled) {
	                continue;
	              }
	            } // maximum of 2 pointers per interaction
	            else if (interaction.pointerIds.length >= 2) {
	                continue;
	              }

	            if (!interaction.interacting() && pointerType === interaction.pointerType) {
	              return interaction;
	            }
	          }

	          return null;
	        }
	      };
	      module.exports = finder;
	    }, {
	      "../scope": 33,
	      "./index": 44
	    }],
	    46: [function (require, module, exports) {

	      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	        return typeof obj;
	      } : function (obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	      };

	      var win = require('./window');

	      var isWindow = require('./isWindow');

	      var is = {
	        array: function array() {},
	        window: function window(thing) {
	          return thing === win.window || isWindow(thing);
	        },
	        docFrag: function docFrag(thing) {
	          return is.object(thing) && thing.nodeType === 11;
	        },
	        object: function object(thing) {
	          return !!thing && (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === 'object';
	        },
	        function: function _function(thing) {
	          return typeof thing === 'function';
	        },
	        number: function number(thing) {
	          return typeof thing === 'number';
	        },
	        bool: function bool(thing) {
	          return typeof thing === 'boolean';
	        },
	        string: function string(thing) {
	          return typeof thing === 'string';
	        },
	        element: function element(thing) {
	          if (!thing || (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) !== 'object') {
	            return false;
	          }

	          var _window = win.getWindow(thing) || win.window;

	          return /object|function/.test(_typeof(_window.Element)) ? thing instanceof _window.Element //DOM2
	          : thing.nodeType === 1 && typeof thing.nodeName === 'string';
	        },
	        plainObject: function plainObject(thing) {
	          return is.object(thing) && thing.constructor.name === 'Object';
	        }
	      };

	      is.array = function (thing) {
	        return is.object(thing) && typeof thing.length !== 'undefined' && is.function(thing.splice);
	      };

	      module.exports = is;
	    }, {
	      "./isWindow": 47,
	      "./window": 52
	    }],
	    47: [function (require, module, exports) {

	      module.exports = function (thing) {
	        return !!(thing && thing.Window) && thing instanceof thing.Window;
	      };
	    }, {}],
	    48: [function (require, module, exports) {

	      function pointerExtend(dest, source) {
	        for (var prop in source) {
	          var prefixedPropREs = module.exports.prefixedPropREs;
	          var deprecated = false; // skip deprecated prefixed properties

	          for (var vendor in prefixedPropREs) {
	            if (prop.indexOf(vendor) === 0 && prefixedPropREs[vendor].test(prop)) {
	              deprecated = true;
	              break;
	            }
	          }

	          if (!deprecated && typeof source[prop] !== 'function') {
	            dest[prop] = source[prop];
	          }
	        }

	        return dest;
	      }

	      pointerExtend.prefixedPropREs = {
	        webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/
	      };
	      module.exports = pointerExtend;
	    }, {}],
	    49: [function (require, module, exports) {

	      var hypot = require('./hypot');

	      var browser = require('./browser');

	      var dom = require('./domObjects');

	      var domUtils = require('./domUtils');

	      var domObjects = require('./domObjects');

	      var is = require('./is');

	      var pointerExtend = require('./pointerExtend');

	      var pointerUtils = {
	        copyCoords: function copyCoords(dest, src) {
	          dest.page = dest.page || {};
	          dest.page.x = src.page.x;
	          dest.page.y = src.page.y;
	          dest.client = dest.client || {};
	          dest.client.x = src.client.x;
	          dest.client.y = src.client.y;
	          dest.timeStamp = src.timeStamp;
	        },
	        setCoordDeltas: function setCoordDeltas(targetObj, prev, cur) {
	          targetObj.page.x = cur.page.x - prev.page.x;
	          targetObj.page.y = cur.page.y - prev.page.y;
	          targetObj.client.x = cur.client.x - prev.client.x;
	          targetObj.client.y = cur.client.y - prev.client.y;
	          targetObj.timeStamp = cur.timeStamp - prev.timeStamp; // set pointer velocity

	          var dt = Math.max(targetObj.timeStamp / 1000, 0.001);
	          targetObj.page.speed = hypot(targetObj.page.x, targetObj.page.y) / dt;
	          targetObj.page.vx = targetObj.page.x / dt;
	          targetObj.page.vy = targetObj.page.y / dt;
	          targetObj.client.speed = hypot(targetObj.client.x, targetObj.page.y) / dt;
	          targetObj.client.vx = targetObj.client.x / dt;
	          targetObj.client.vy = targetObj.client.y / dt;
	        },
	        isNativePointer: function isNativePointer(pointer) {
	          return pointer instanceof dom.Event || pointer instanceof dom.Touch;
	        },
	        // Get specified X/Y coords for mouse or event.touches[0]
	        getXY: function getXY(type, pointer, xy) {
	          xy = xy || {};
	          type = type || 'page';
	          xy.x = pointer[type + 'X'];
	          xy.y = pointer[type + 'Y'];
	          return xy;
	        },
	        getPageXY: function getPageXY(pointer, page) {
	          page = page || {}; // Opera Mobile handles the viewport and scrolling oddly

	          if (browser.isOperaMobile && pointerUtils.isNativePointer(pointer)) {
	            pointerUtils.getXY('screen', pointer, page);
	            page.x += window.scrollX;
	            page.y += window.scrollY;
	          } else {
	            pointerUtils.getXY('page', pointer, page);
	          }

	          return page;
	        },
	        getClientXY: function getClientXY(pointer, client) {
	          client = client || {};

	          if (browser.isOperaMobile && pointerUtils.isNativePointer(pointer)) {
	            // Opera Mobile handles the viewport and scrolling oddly
	            pointerUtils.getXY('screen', pointer, client);
	          } else {
	            pointerUtils.getXY('client', pointer, client);
	          }

	          return client;
	        },
	        getPointerId: function getPointerId(pointer) {
	          return is.number(pointer.pointerId) ? pointer.pointerId : pointer.identifier;
	        },
	        setCoords: function setCoords(targetObj, pointers, timeStamp) {
	          var pointer = pointers.length > 1 ? pointerUtils.pointerAverage(pointers) : pointers[0];
	          var tmpXY = {};
	          pointerUtils.getPageXY(pointer, tmpXY);
	          targetObj.page.x = tmpXY.x;
	          targetObj.page.y = tmpXY.y;
	          pointerUtils.getClientXY(pointer, tmpXY);
	          targetObj.client.x = tmpXY.x;
	          targetObj.client.y = tmpXY.y;
	          targetObj.timeStamp = is.number(timeStamp) ? timeStamp : new Date().getTime();
	        },
	        pointerExtend: pointerExtend,
	        getTouchPair: function getTouchPair(event) {
	          var touches = []; // array of touches is supplied

	          if (is.array(event)) {
	            touches[0] = event[0];
	            touches[1] = event[1];
	          } // an event
	          else {
	              if (event.type === 'touchend') {
	                if (event.touches.length === 1) {
	                  touches[0] = event.touches[0];
	                  touches[1] = event.changedTouches[0];
	                } else if (event.touches.length === 0) {
	                  touches[0] = event.changedTouches[0];
	                  touches[1] = event.changedTouches[1];
	                }
	              } else {
	                touches[0] = event.touches[0];
	                touches[1] = event.touches[1];
	              }
	            }

	          return touches;
	        },
	        pointerAverage: function pointerAverage(pointers) {
	          var average = {
	            pageX: 0,
	            pageY: 0,
	            clientX: 0,
	            clientY: 0,
	            screenX: 0,
	            screenY: 0
	          };

	          for (var _i = 0; _i < pointers.length; _i++) {
	            var _ref;

	            _ref = pointers[_i];
	            var pointer = _ref;

	            for (var _prop in average) {
	              average[_prop] += pointer[_prop];
	            }
	          }

	          for (var prop in average) {
	            average[prop] /= pointers.length;
	          }

	          return average;
	        },
	        touchBBox: function touchBBox(event) {
	          if (!event.length && !(event.touches && event.touches.length > 1)) {
	            return;
	          }

	          var touches = pointerUtils.getTouchPair(event);
	          var minX = Math.min(touches[0].pageX, touches[1].pageX);
	          var minY = Math.min(touches[0].pageY, touches[1].pageY);
	          var maxX = Math.max(touches[0].pageX, touches[1].pageX);
	          var maxY = Math.max(touches[0].pageY, touches[1].pageY);
	          return {
	            x: minX,
	            y: minY,
	            left: minX,
	            top: minY,
	            width: maxX - minX,
	            height: maxY - minY
	          };
	        },
	        touchDistance: function touchDistance(event, deltaSource) {
	          var sourceX = deltaSource + 'X';
	          var sourceY = deltaSource + 'Y';
	          var touches = pointerUtils.getTouchPair(event);
	          var dx = touches[0][sourceX] - touches[1][sourceX];
	          var dy = touches[0][sourceY] - touches[1][sourceY];
	          return hypot(dx, dy);
	        },
	        touchAngle: function touchAngle(event, prevAngle, deltaSource) {
	          var sourceX = deltaSource + 'X';
	          var sourceY = deltaSource + 'Y';
	          var touches = pointerUtils.getTouchPair(event);
	          var dx = touches[1][sourceX] - touches[0][sourceX];
	          var dy = touches[1][sourceY] - touches[0][sourceY];
	          var angle = 180 * Math.atan2(dy, dx) / Math.PI;
	          return angle;
	        },
	        getPointerType: function getPointerType(pointer) {
	          return is.string(pointer.pointerType) ? pointer.pointerType : is.number(pointer.pointerType) ? [undefined, undefined, 'touch', 'pen', 'mouse'][pointer.pointerType] // if the PointerEvent API isn't available, then the "pointer" must
	          // be either a MouseEvent, TouchEvent, or Touch object
	          : /touch/.test(pointer.type) || pointer instanceof domObjects.Touch ? 'touch' : 'mouse';
	        },
	        // [ event.target, event.currentTarget ]
	        getEventTargets: function getEventTargets(event) {
	          var path = is.function(event.composedPath) ? event.composedPath() : event.path;
	          return [domUtils.getActualElement(path ? path[0] : event.target), domUtils.getActualElement(event.currentTarget)];
	        }
	      };
	      module.exports = pointerUtils;
	    }, {
	      "./browser": 36,
	      "./domObjects": 38,
	      "./domUtils": 39,
	      "./hypot": 43,
	      "./is": 46,
	      "./pointerExtend": 48
	    }],
	    50: [function (require, module, exports) {

	      var _require = require('./window'),
	          window = _require.window;

	      var vendors = ['ms', 'moz', 'webkit', 'o'];
	      var lastTime = 0;
	      var request = void 0;
	      var cancel = void 0;

	      for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
	        request = window[vendors[x] + 'RequestAnimationFrame'];
	        cancel = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	      }

	      if (!request) {
	        request = function request(callback) {
	          var currTime = new Date().getTime();
	          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	          var id = setTimeout(function () {
	            callback(currTime + timeToCall);
	          }, timeToCall);
	          lastTime = currTime + timeToCall;
	          return id;
	        };
	      }

	      if (!cancel) {
	        cancel = function cancel(id) {
	          clearTimeout(id);
	        };
	      }

	      module.exports = {
	        request: request,
	        cancel: cancel
	      };
	    }, {
	      "./window": 52
	    }],
	    51: [function (require, module, exports) {

	      var extend = require('./extend');

	      var is = require('./is');

	      var _require = require('./domUtils'),
	          closest = _require.closest,
	          parentNode = _require.parentNode,
	          getElementRect = _require.getElementRect;

	      var rectUtils = {
	        getStringOptionResult: function getStringOptionResult(value, interactable, element) {
	          if (!is.string(value)) {
	            return null;
	          }

	          if (value === 'parent') {
	            value = parentNode(element);
	          } else if (value === 'self') {
	            value = interactable.getRect(element);
	          } else {
	            value = closest(element, value);
	          }

	          return value;
	        },
	        resolveRectLike: function resolveRectLike(value, interactable, element, functionArgs) {
	          value = rectUtils.getStringOptionResult(value, interactable, element) || value;

	          if (is.function(value)) {
	            value = value.apply(null, functionArgs);
	          }

	          if (is.element(value)) {
	            value = getElementRect(value);
	          }

	          return value;
	        },
	        rectToXY: function rectToXY(rect) {
	          return rect && {
	            x: 'x' in rect ? rect.x : rect.left,
	            y: 'y' in rect ? rect.y : rect.top
	          };
	        },
	        xywhToTlbr: function xywhToTlbr(rect) {
	          if (rect && !('left' in rect && 'top' in rect)) {
	            rect = extend({}, rect);
	            rect.left = rect.x || 0;
	            rect.top = rect.y || 0;
	            rect.right = rect.right || rect.left + rect.width;
	            rect.bottom = rect.bottom || rect.top + rect.height;
	          }

	          return rect;
	        },
	        tlbrToXywh: function tlbrToXywh(rect) {
	          if (rect && !('x' in rect && 'y' in rect)) {
	            rect = extend({}, rect);
	            rect.x = rect.left || 0;
	            rect.top = rect.top || 0;
	            rect.width = rect.width || rect.right - rect.x;
	            rect.height = rect.height || rect.bottom - rect.y;
	          }

	          return rect;
	        }
	      };
	      module.exports = rectUtils;
	    }, {
	      "./domUtils": 39,
	      "./extend": 41,
	      "./is": 46
	    }],
	    52: [function (require, module, exports) {

	      var win = module.exports;

	      var isWindow = require('./isWindow');

	      function init(window) {
	        // get wrapped window if using Shadow DOM polyfill
	        win.realWindow = window; // create a TextNode

	        var el = window.document.createTextNode(''); // check if it's wrapped by a polyfill

	        if (el.ownerDocument !== window.document && typeof window.wrap === 'function' && window.wrap(el) === el) {
	          // use wrapped window
	          window = window.wrap(window);
	        }

	        win.window = window;
	      }

	      if (typeof window === 'undefined') {
	        win.window = undefined;
	        win.realWindow = undefined;
	      } else {
	        init(window);
	      }

	      win.getWindow = function getWindow(node) {
	        if (isWindow(node)) {
	          return node;
	        }

	        var rootNode = node.ownerDocument || node;
	        return rootNode.defaultView || rootNode.parentWindow || win.window;
	      };

	      win.init = init;
	    }, {
	      "./isWindow": 47
	    }]
	  }, {}, [1])(1);
	});
	});

	var rafThrottle_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var rafThrottle = function rafThrottle(callback) {
	  var requestId = void 0;

	  var later = function later(context, args) {
	    return function () {
	      requestId = null;
	      callback.apply(context, args);
	    };
	  };

	  var throttled = function throttled() {
	    if (requestId === null || requestId === undefined) {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      requestId = requestAnimationFrame(later(this, args));
	    }
	  };

	  throttled.cancel = function () {
	    return cancelAnimationFrame(requestId);
	  };

	  return throttled;
	};

	exports.default = rafThrottle;
	});

	var rafThrottle = unwrapExports(rafThrottle_1);

	const editor = Symbol();

	class Timeline extends engine_5 {
	  constructor(...args) {
	    super(...args);
	    this.ticks = [];

	    this.onDragStart = () => {
	      this.dragging = true;
	      const customEvent = new CustomEvent('timelinedragstart');
	      this.dispatchEvent(customEvent);
	    };

	    this.onDrag = rafThrottle(evt => {
	      const time = this.editor.pixelToTime(evt.dx);
	      const updated = new Time(this.editor.visibleRange.start.milliseconds - time.milliseconds);

	      if (updated.milliseconds < 0) {
	        return setVisibleRangeStart(new Time(0));
	      }

	      setVisibleRangeStart(updated);
	    });

	    this.onDragEnd = () => {
	      this.dragging = false;
	      const customEvent = new CustomEvent('timelinedragend');
	      this.dispatchEvent(customEvent);
	    };
	  }

	  /*
	   *
	   * Editor
	   *
	  */
	  editorWireCallback(editor) {
	    if (editor.data.frame) {
	      this.editor = editor.data;
	    }
	  }

	  get editor() {
	    return this[editor];
	  }

	  set editor(value) {
	    this[editor] = value;
	    this.updateTicks(value);
	  }
	  /*
	   *
	   * Ticks
	   *
	  */


	  getTickValues(range) {
	    const tickDistanceMs = 1000;
	    const remainder = range.start.milliseconds % tickDistanceMs;
	    const lower = remainder === 0 ? range.start.milliseconds : range.start.milliseconds + (tickDistanceMs - range.start.milliseconds % tickDistanceMs);
	    const upper = Math.floor(range.start.milliseconds + range.duration.milliseconds);
	    const numberOfTicks = (upper - lower) / tickDistanceMs;
	    const values = [];

	    for (let i = 0; i < numberOfTicks; i += 1) {
	      values.push(lower + i * tickDistanceMs);
	    }

	    return values;
	  }

	  updateTicks(editor) {
	    this.ticks = [];
	    const {
	      visibleRange
	    } = editor;
	    const {
	      width
	    } = editor.frame;
	    const startMS = visibleRange.start.milliseconds;
	    const tickValues = this.getTickValues(visibleRange);
	    const tickWidth = width / tickValues.length;
	    const startOffsetMS = tickValues[0] - startMS;
	    const offsetPx = tickWidth * (startOffsetMS / 1000);

	    for (let i = 0; i < tickValues.length; i += 1) {
	      const millisecond = tickValues[i];
	      const evenHalfSecond = millisecond % 500 === 0;
	      const evenSecond = millisecond % 1000 === 0;
	      const indicatorClassName = evenSecond ? 'tick-indicator--second' : '';
	      const translateX = offsetPx + tickWidth * i;
	      this.ticks.push({
	        renderLabel: evenHalfSecond,
	        time: new Time(millisecond),
	        style: `transform: translateX(${translateX}px)`,
	        indicatorClassName: `tick-indicator ${indicatorClassName}`
	      });
	    }
	  }
	  /*
	   *
	   * Dragging
	   *
	  */


	  /*
	   *
	   * Lifecycle
	   *
	  */
	  connectedCallback() {
	    this.interact = interact(this.template.host).draggable({
	      inertia: true,
	      axis: 'y',
	      onstart: this.onDragStart,
	      onmove: this.onDrag,
	      onend: this.onDragEnd
	    });
	  }

	}

	engine_11(Timeline, {
	  wire: {
	    editorWireCallback: {
	      adapter: editorSym,
	      params: {},
	      static: {},
	      method: 1
	    }
	  },
	  track: {
	    ticks: 1
	  }
	});

	var _ffmpegTimeline = engine_10(Timeline, {
	  tmpl: _tmpl$1
	});

	function stylesheet$2(hostSelector, shadowSelector, nativeShadow) {
	  return "\n" + (nativeShadow ? (":host {overflow: hidden;display: block;height: 100%;position: relative;z-index: 1;}") : (hostSelector + " {overflow: hidden;display: block;height: 100%;position: relative;z-index: 1;}")) + "\nffmpeg-audiotracksegment" + shadowSelector + " {position: absolute;left: 0;top: 0;bottom: 0;z-index: 1;}\n";
	}
	var _implicitStylesheets$2 = [stylesheet$2];

	function stylesheet$3(hostSelector, shadowSelector, nativeShadow) {
	  return "\n" + (nativeShadow ? (":host {display: block;}") : (hostSelector + " {display: block;}")) + "\n";
	}
	var _implicitStylesheets$3 = [stylesheet$3];

	function stylesheet$4(hostSelector, shadowSelector, nativeShadow) {
	  return "\n" + (nativeShadow ? (":host {display: block;background: #aaa;overflow: hidden;height: 100%;}") : (hostSelector + " {display: block;background: #aaa;overflow: hidden;height: 100%;}")) + "\nimg" + shadowSelector + " {height: 100%;}\n";
	}
	var _implicitStylesheets$4 = [stylesheet$4];

	function tmpl$2($api, $cmp, $slotset, $ctx) {
	  const {
	    t: api_text,
	    h: api_element
	  } = $api;
	  return [$cmp.hasWaveform ? !$cmp.waveformReady ? api_text("Loading Waveform") : null : null, $cmp.hasWaveform ? $cmp.waveformReady ? api_element("img", {
	    style: $cmp.waveformStyle,
	    attrs: {
	      "src": $cmp.waveform.url
	    },
	    key: 5
	  }, []) : null : null];
	}

	var _tmpl$3 = engine_8(tmpl$2);
	tmpl$2.stylesheets = [];

	if (_implicitStylesheets$4) {
	  tmpl$2.stylesheets.push.apply(tmpl$2.stylesheets, _implicitStylesheets$4);
	}
	tmpl$2.stylesheetTokens = {
	  hostAttribute: "ffmpeg-waveform_waveform-host",
	  shadowAttribute: "ffmpeg-waveform_waveform"
	};

	class Process {
	  constructor(worker, pid, args, files) {
	    this.pid = pid;
	    this.worker = worker;
	    this.args = args;
	    this.files = files;
	  }

	  execute() {
	    return new Promise(res => {
	      const {
	        worker
	      } = this;

	      const onMessage = evt => {
	        const {
	          data
	        } = evt;

	        if (data.pid === this.pid) {
	          if (data.type == 'stdout' && this.stdout) {
	            this.stdout(data);
	          } else if (data.type === 'done') {
	            worker.removeEventListener('message', onMessage);
	            res(data);
	          }
	        }
	      };

	      worker.addEventListener('message', onMessage);
	      worker.postMessage({
	        type: 'command',
	        pid: this.pid,
	        arguments: this.args,
	        files: this.files
	      });
	    });
	  }

	}

	class FFMPEG {
	  constructor(worker) {
	    this.worker = worker;
	    this.pid = 0;
	  }

	  createProcess(args, files) {
	    if (!this.worker) {
	      throw new Error(`cannot create process. FFMPEG worker hasn't been created yet`);
	    }

	    return new Process(this.worker, this.pid += 1, args, files);
	  }

	}
	function getFFMPEG() {
	  return new Promise(res => {
	    const worker = new Worker('/ffmpeg-worker.js');

	    const onReady = event => {
	      const {
	        data: message
	      } = event;

	      if (message.type == "ready") {
	        worker.removeEventListener('message', onReady);
	        const ffmpeg = new FFMPEG(worker);
	        res(ffmpeg);
	      }
	    };

	    worker.addEventListener('message', onReady);
	  });
	}
	wire_2(getFFMPEG, function (wiredEventTarget) {
	  wiredEventTarget.dispatchEvent(new wire_3({
	    data: undefined,
	    error: undefined
	  }));
	  getFFMPEG().then(ffmpeg => {
	    wiredEventTarget.dispatchEvent(new wire_3({
	      data: ffmpeg,
	      error: undefined
	    }));
	  });
	});

	/**
	 * Segments are an easy way to keep track of portions of the described
	 * audio file.
	 *
	 * They return values based on the actual offset. Which means if you change your
	 * offset and:
	 *
	 * * a segment becomes **out of scope**, no data will be returned;
	 * * a segment is only **partially included in the offset**, only the visible
	 *   parts will be returned;
	 * * a segment is **fully included in the offset**, its whole content will be
	 *   returned.
	 *
	 * Segments are created with the `WaveformData.set_segment(from, to, name?)`
	 * method.
	 *
	 * @see WaveformData.prototype.set_segment
	 * @param {WaveformData} context WaveformData instance
	 * @param {Integer} start Initial start index
	 * @param {Integer} end Initial end index
	 * @constructor
	 */

	function WaveformDataSegment(context, start, end) {
	  this.context = context;
	  /**
	   * Start index.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   * waveform.set_segment(10, 50, "example");
	   *
	   * console.log(waveform.segments.example.start);  // -> 10
	   *
	   * waveform.offset(20, 50);
	   * console.log(waveform.segments.example.start);  // -> 10
	   *
	   * waveform.offset(70, 100);
	   * console.log(waveform.segments.example.start);  // -> 10
	   * ```
	   * @type {Integer} Initial starting point of the segment.
	   */

	  this.start = start;
	  /**
	   * End index.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   * waveform.set_segment(10, 50, "example");
	   *
	   * console.log(waveform.segments.example.end);  // -> 50
	   *
	   * waveform.offset(20, 50);
	   * console.log(waveform.segments.example.end);  // -> 50
	   *
	   * waveform.offset(70, 100);
	   * console.log(waveform.segments.example.end);  // -> 50
	   * ```
	   * @type {Integer} Initial ending point of the segment.
	   */

	  this.end = end;
	}
	/**
	 * @namespace WaveformDataSegment
	 */


	WaveformDataSegment.prototype = {
	  /**
	   * Dynamic starting point based on the WaveformData instance offset.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   * waveform.set_segment(10, 50, "example");
	   *
	   * console.log(waveform.segments.example.offset_start);  // -> 10
	   *
	   * waveform.offset(20, 50);
	   * console.log(waveform.segments.example.offset_start);  // -> 20
	   *
	   * waveform.offset(70, 100);
	   * console.log(waveform.segments.example.offset_start);  // -> null
	   * ```
	   *
	   * @return {number} Starting point of the segment within the waveform offset. (inclusive)
	   */
	  get offset_start() {
	    if (this.start < this.context.offset_start && this.end > this.context.offset_start) {
	      return this.context.offset_start;
	    }

	    if (this.start >= this.context.offset_start && this.start < this.context.offset_end) {
	      return this.start;
	    }

	    return null;
	  },

	  /**
	   * Dynamic ending point based on the WaveformData instance offset.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   * waveform.set_segment(10, 50, "example");
	   *
	   * console.log(waveform.segments.example.offset_end);  // -> 50
	   *
	   * waveform.offset(20, 50);
	   * console.log(waveform.segments.example.offset_end);  // -> 50
	   *
	   * waveform.offset(70, 100);
	   * console.log(waveform.segments.example.offset_end);  // -> null
	   * ```
	   *
	   * @return {number} Ending point of the segment within the waveform offset. (exclusive)
	   */
	  get offset_end() {
	    if (this.end > this.context.offset_start && this.end <= this.context.offset_end) {
	      return this.end;
	    }

	    if (this.end > this.context.offset_end && this.start < this.context.offset_end) {
	      return this.context.offset_end;
	    }

	    return null;
	  },

	  /**
	   * Dynamic segment length based on the WaveformData instance offset.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   * waveform.set_segment(10, 50, "example");
	   *
	   * console.log(waveform.segments.example.offset_length);  // -> 40
	   *
	   * waveform.offset(20, 50);
	   * console.log(waveform.segments.example.offset_length);  // -> 30
	   *
	   * waveform.offset(70, 100);
	   * console.log(waveform.segments.example.offset_length);  // -> 0
	   * ```
	   *
	   * @return {number} Visible length of the segment within the waveform offset.
	   */
	  get offset_length() {
	    return this.offset_end - this.offset_start;
	  },

	  /**
	   * Initial length of the segment.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   * waveform.set_segment(10, 50, "example");
	   *
	   * console.log(waveform.segments.example.length);  // -> 40
	   *
	   * waveform.offset(20, 50);
	   * console.log(waveform.segments.example.length);  // -> 40
	   *
	   * waveform.offset(70, 100);
	   * console.log(waveform.segments.example.length);  // -> 40
	   * ```
	   *
	   * @return {number} Initial length of the segment.
	   */
	  get length() {
	    return this.end - this.start;
	  },

	  /**
	   * Indicates if the segment has some visible part in the actual WaveformData offset.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   * waveform.set_segment(10, 50, "example");
	   *
	   * console.log(waveform.segments.example.visible);        // -> true
	   *
	   * waveform.offset(20, 50);
	   * console.log(waveform.segments.example.visible);        // -> true
	   *
	   * waveform.offset(70, 100);
	   * console.log(waveform.segments.example.visible);        // -> false
	   * ```
	   *
	   * @return {Boolean} True if at least partly visible, false otherwise.
	   */
	  get visible() {
	    return this.context.in_offset(this.start) || this.context.in_offset(this.end) || this.context.offset_start > this.start && this.context.offset_start < this.end;
	  },

	  /**
	   * Return the minimum values for the segment.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   * waveform.set_segment(10, 50, "example");
	   *
	   * console.log(waveform.segments.example.min.length);        // -> 40
	   * console.log(waveform.segments.example.min.offset_length); // -> 40
	   * console.log(waveform.segments.example.min[0]);            // -> -12
	   *
	   * waveform.offset(20, 50);
	   *
	   * console.log(waveform.segments.example.min.length);        // -> 40
	   * console.log(waveform.segments.example.min.offset_length); // -> 30
	   * console.log(waveform.segments.example.min[0]);            // -> -5
	   * ```
	   *
	   * @return {Array.<Integer>} Min values of the segment.
	   */
	  get min() {
	    return this.visible ? this.context.offsetValues(this.offset_start, this.offset_length, 0) : [];
	  },

	  /**
	   * Return the maximum values for the segment.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   * waveform.set_segment(10, 50, "example");
	   *
	   * console.log(waveform.segments.example.max.length);        // -> 40
	   * console.log(waveform.segments.example.max.offset_length); // -> 40
	   * console.log(waveform.segments.example.max[0]);            // -> 5
	   *
	   * waveform.offset(20, 50);
	   *
	   * console.log(waveform.segments.example.max.length);        // -> 40
	   * console.log(waveform.segments.example.max.offset_length); // -> 30
	   * console.log(waveform.segments.example.max[0]);            // -> 11
	   * ```
	   *
	   * @return {Array.<Integer>} Max values of the segment.
	   */
	  get max() {
	    return this.visible ? this.context.offsetValues(this.offset_start, this.offset_length, 1) : [];
	  }

	};
	var segment = WaveformDataSegment;

	/**
	 * Points are an easy way to keep track bookmarks of the described audio file.
	 *
	 * They return values based on the actual offset. Which means if you change your offset and:
	 *
	 * * a point becomes **out of scope**, no data will be returned;
	 * * a point is **fully included in the offset**, its whole content will be returned.
	 *
	 * Points are created with the `WaveformData.set_point(timeStamp, name?)` method.
	 *
	 * @see WaveformData.prototype.set_point
	 * @param {WaveformData} context WaveformData instance
	 * @param {Integer} start Initial start index
	 * @param {Integer} end Initial end index
	 * @constructor
	 */

	function WaveformDataPoint(context, timeStamp) {
	  this.context = context;
	  /**
	   * Start index.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   * waveform.set_point(10, "example");
	   *
	   * console.log(waveform.points.example.timeStamp);  // -> 10
	   *
	   * waveform.offset(20, 50);
	   * console.log(waveform.points.example.timeStamp);  // -> 10
	   *
	   * waveform.offset(70, 100);
	   * console.log(waveform.points.example.timeStamp);  // -> 10
	   * ```
	   * @type {Integer} Time Stamp of the point
	   */

	  this.timeStamp = timeStamp;
	}
	/**
	 * @namespace WaveformDataPoint
	 */


	WaveformDataPoint.prototype = {
	  /**
	   * Indicates if the point has some visible part in the actual WaveformData offset.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   * waveform.set_point(10, "example");
	   *
	   * console.log(waveform.points.example.visible);        // -> true
	   *
	   * waveform.offset(0, 50);
	   * console.log(waveform.points.example.visible);        // -> true
	   *
	   * waveform.offset(70, 100);
	   * console.log(waveform.points.example.visible);        // -> false
	   * ```
	   *
	   * @return {Boolean} True if visible, false otherwise.
	   */
	  get visible() {
	    return this.context.in_offset(this.timeStamp);
	  }

	};
	var point = WaveformDataPoint;

	/**
	 * Facade to iterate on audio waveform response.
	 *
	 * ```javascript
	 * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	 *
	 * var json_waveform = new WaveformData(xhr.responseText, WaveformData.adapters.object);
	 *
	 * var arraybuff_waveform = new WaveformData(
	 *   getArrayBufferData(),
	 *   WaveformData.adapters.arraybuffer
	 * );
	 * ```
	 *
	 * ## Offsets
	 *
	 * An **offset** is a non-destructive way to iterate on a subset of data.
	 *
	 * It is the easiest way to **navigate** through data without having to deal
	 * with complex calculations. Simply iterate over the data to display them.
	 *
	 * *Notice*: the default offset is the entire set of data.
	 *
	 * @param {String|ArrayBuffer|Mixed} response_data Waveform data,
	 *   to be consumed by the related adapter.
	 * @param {WaveformData.adapter|Function} adapter Backend adapter used to manage
	 *   access to the data.
	 * @constructor
	 */


	function WaveformData(response_data, adapter) {
	  /**
	   * Backend adapter used to manage access to the data.
	   *
	   * @type {Object}
	   */
	  this.adapter = adapter.fromResponseData(response_data);
	  /**
	   * Defined segments.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   *
	   * console.log(waveform.segments.speakerA); // -> undefined
	   *
	   * waveform.set_segment(30, 90, "speakerA");
	   *
	   * console.log(waveform.segments.speakerA.start); // -> 30
	   * ```
	   *
	   * @type {Object} A hash of `WaveformDataSegment` objects.
	   */

	  this.segments = {};
	  /**
	   * Defined points.
	   *
	   * ```javascript
	   * var waveform = new WaveformData({ ... }, WaveformData.adapters.object);
	   *
	   * console.log(waveform.points.speakerA); // -> undefined
	   *
	   * waveform.set_point(30, "speakerA");
	   *
	   * console.log(waveform.points.speakerA.timeStamp); // -> 30
	   * ```
	   *
	   * @type {Object} A hash of `WaveformDataPoint` objects.
	   */

	  this.points = {};
	  this.offset(0, this.adapter.length);
	}
	/**
	 * Creates an instance of WaveformData by guessing the adapter from the
	 * data type. It can also accept an XMLHttpRequest response.
	 *
	 * ```javascript
	 * var xhr = new XMLHttpRequest();
	 * xhr.open("GET", "http://example.com/waveforms/track.dat");
	 * xhr.responseType = "arraybuffer";
	 *
	 * xhr.addEventListener("load", function onResponse(progressEvent) {
	 *   var waveform = WaveformData.create(progressEvent.target);
	 *
	 *   console.log(waveform.duration);
	 * });
	 *
	 * xhr.send();
	 * ```
	 *
	 * @static
	 * @throws TypeError
	 * @param {XMLHttpRequest|Mixed} data
	 * @return {WaveformData}
	 */


	WaveformData.create = function createFromResponseData(data) {
	  var adapter = null;
	  var xhrData = null;

	  if (data && typeof data === "object" && ("responseText" in data || "response" in data)) {
	    xhrData = "responseType" in data ? data.response : data.responseText || data.response;
	  }

	  Object.keys(WaveformData.adapters).some(function (adapter_id) {
	    if (WaveformData.adapters[adapter_id].isCompatible(xhrData || data)) {
	      adapter = WaveformData.adapters[adapter_id];
	      return true;
	    }
	  });

	  if (adapter === null) {
	    throw new TypeError("Could not detect a WaveformData adapter from the input.");
	  }

	  return new WaveformData(xhrData || data, adapter);
	};
	/**
	 * Public API for the Waveform Data manager.
	 *
	 * @namespace WaveformData
	 */


	WaveformData.prototype = {
	  /**
	   * Clamp an offset of data upon the whole response body.
	   * Pros: it's just a reference, not a new array. So it's fast.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.offset_length);   // -> 150
	   * console.log(waveform.min[0]);          // -> -12
	   *
	   * waveform.offset(20, 50);
	   *
	   * console.log(waveform.min.length);      // -> 30
	   * console.log(waveform.min[0]);          // -> -9
	   * ```
	   *
	   * @param {Integer} start New beginning of the offset. (inclusive)
	   * @param {Integer} end New ending of the offset (exclusive)
	   */
	  offset: function (start, end) {
	    var data_length = this.adapter.length;

	    if (end < 0) {
	      throw new RangeError("End point must be non-negative [" + Number(end) + " < 0]");
	    }

	    if (end < start) {
	      throw new RangeError("End point must not be before the start point [" + Number(end) + " < " + Number(start) + "]");
	    }

	    if (start < 0) {
	      throw new RangeError("Start point must be non-negative [" + Number(start) + " < 0]");
	    }

	    if (start >= data_length) {
	      throw new RangeError("Start point must be within range [" + Number(start) + " >= " + data_length + "]");
	    }

	    if (end > data_length) {
	      end = data_length;
	    }

	    this.offset_start = start;
	    this.offset_end = end;
	    this.offset_length = end - start;
	  },

	  /**
	   * Creates a new segment of data.
	   * Pretty handy if you need to bookmark a duration and display it according
	   * to the current offset.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(Object.keys(waveform.segments));          // -> []
	   *
	   * waveform.set_segment(10, 120);
	   * waveform.set_segment(30, 90, "speakerA");
	   *
	   * console.log(Object.keys(waveform.segments));          // -> ['default', 'speakerA']
	   * console.log(waveform.segments.default.min.length);    // -> 110
	   * console.log(waveform.segments.speakerA.min.length);   // -> 60
	   * ```
	   *
	   * @param {Integer} start Beginning of the segment (inclusive)
	   * @param {Integer} end Ending of the segment (exclusive)
	   * @param {String*} identifier Unique identifier. If nothing is specified,
	   *   *default* will be used as a value.
	   * @return {WaveformDataSegment}
	   */
	  set_segment: function setSegment(start, end, identifier) {
	    if (identifier === undefined || identifier === null || identifier.length === 0) {
	      identifier = "default";
	    }

	    this.segments[identifier] = new segment(this, start, end);
	    return this.segments[identifier];
	  },

	  /**
	   * Creates a new point of data.
	   * Pretty handy if you need to bookmark a specific point and display it
	   * according to the current offset.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(Object.keys(waveform.points)); // -> []
	   *
	   * waveform.set_point(10);
	   * waveform.set_point(30, "speakerA");
	   *
	   * console.log(Object.keys(waveform.points)); // -> ['default', 'speakerA']
	   * ```
	   *
	   * @param {Integer} timeStamp the time to place the bookmark
	   * @param {String*} identifier Unique identifier. If nothing is specified,
	   *   *default* will be used as a value.
	   * @return {WaveformDataPoint}
	   */
	  set_point: function setPoint(timeStamp, identifier) {
	    if (identifier === undefined || identifier === null || identifier.length === 0) {
	      identifier = "default";
	    }

	    this.points[identifier] = new point(this, timeStamp);
	    return this.points[identifier];
	  },

	  /**
	   * Removes a point of data.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(Object.keys(waveform.points));          // -> []
	   *
	   * waveform.set_point(30, "speakerA");
	   * console.log(Object.keys(waveform.points));          // -> ['speakerA']
	   * waveform.remove_point("speakerA");
	   * console.log(Object.keys(waveform.points));          // -> []
	   * ```
	   *
	   * @param {String*} identifier Unique identifier. If nothing is specified,
	   *   *default* will be used as a value.
	   * @return null
	   */
	  remove_point: function removePoint(identifier) {
	    if (this.points[identifier]) {
	      delete this.points[identifier];
	    }
	  },

	  /**
	   * Creates a new WaveformData object with resampled data.
	   * Returns a rescaled waveform, to either fit the waveform to a specific
	   * width, or to a specific zoom level.
	   *
	   * **Note**: You may specify either the *width* or the *scale*, but not both.
	   * The `scale` will be deduced from the `width` you want to fit the data into.
	   *
	   * Adapted from Sequence::GetWaveDisplay in Audacity, with permission.
	   *
	   * ```javascript
	   * // ...
	   * var waveform = WaveformData.create({ ... });
	   *
	   * // fitting the data in a 500px wide canvas
	   * var resampled_waveform = waveform.resample({ width: 500 });
	   *
	   * console.log(resampled_waveform.min.length);   // -> 500
	   *
	   * // zooming out on a 3 times less precise scale
	   * var resampled_waveform = waveform.resample({ scale: waveform.adapter.scale * 3 });
	   *
	   * // partial resampling (to perform fast animations involving a resampling
	   * // per animation frame)
	   * var partially_resampled_waveform = waveform.resample({ width: 500, from: 0, to: 500 });
	   *
	   * // ...
	   * ```
	   *
	   * @see https://code.google.com/p/audacity/source/browse/audacity-src/trunk/src/Sequence.cpp
	   * @param {Number|{width: Number, scale: Number}} options Either a constraint width or a constraint sample rate
	   * @return {WaveformData} New resampled object
	   */
	  resample: function (options) {
	    if (typeof options === "number") {
	      options = {
	        width: options
	      };
	    }

	    options.input_index = typeof options.input_index === "number" ? options.input_index : null;
	    options.output_index = typeof options.output_index === "number" ? options.output_index : null;
	    options.scale = typeof options.scale === "number" ? options.scale : null;
	    options.width = typeof options.width === "number" ? options.width : null;
	    var is_partial_resampling = Boolean(options.input_index) || Boolean(options.output_index);

	    if (options.input_index != null && options.input_index < 0) {
	      throw new RangeError("options.input_index should be a positive integer value. [" + options.input_index + "]");
	    }

	    if (options.output_index != null && options.output_index < 0) {
	      throw new RangeError("options.output_index should be a positive integer value. [" + options.output_index + "]");
	    }

	    if (options.width != null && options.width <= 0) {
	      throw new RangeError("options.width should be a strictly positive integer value. [" + options.width + "]");
	    }

	    if (options.scale != null && options.scale <= 0) {
	      throw new RangeError("options.scale should be a strictly positive integer value. [" + options.scale + "]");
	    }

	    if (!options.scale && !options.width) {
	      throw new RangeError("You should provide either a resampling scale or a width in pixel the data should fit in.");
	    }

	    var definedPartialOptionsCount = ["width", "scale", "output_index", "input_index"].reduce(function (count, key) {
	      return count + (options[key] === null ? 0 : 1);
	    }, 0);

	    if (is_partial_resampling && definedPartialOptionsCount !== 4) {
	      throw new Error("Some partial resampling options are missing. You provided " + definedPartialOptionsCount + " of them over 4.");
	    }

	    var output_data = [];
	    var samples_per_pixel = options.scale || Math.floor(this.duration * this.adapter.sample_rate / options.width); // scale we want to reach

	    var scale = this.adapter.scale; // scale we are coming from

	    var channel_count = 2;
	    var input_buffer_size = this.adapter.length; // the amount of data we want to resample i.e. final zoom want to resample all data but for intermediate zoom we want to resample subset

	    var input_index = options.input_index || 0; // is this start point? or is this the index at current scale

	    var output_index = options.output_index || 0; // is this end point? or is this the index at scale we want to be?

	    var min = input_buffer_size ? this.min_sample(input_index) : 0; // min value for peak in waveform

	    var max = input_buffer_size ? this.max_sample(input_index) : 0; // max value for peak in waveform

	    var min_value = -128;
	    var max_value = 127;

	    if (samples_per_pixel < scale) {
	      throw new Error("Zoom level " + samples_per_pixel + " too low, minimum: " + scale);
	    }

	    var where, prev_where, stop, value, last_input_index;

	    function sample_at_pixel(x) {
	      return Math.floor(x * samples_per_pixel);
	    }

	    function add_sample(min, max) {
	      output_data.push(min, max);
	    }

	    while (input_index < input_buffer_size) {
	      while (Math.floor(sample_at_pixel(output_index) / scale) <= input_index) {
	        if (output_index) {
	          add_sample(min, max);
	        }

	        last_input_index = input_index;
	        output_index++;
	        where = sample_at_pixel(output_index);
	        prev_where = sample_at_pixel(output_index - 1);

	        if (where !== prev_where) {
	          min = max_value;
	          max = min_value;
	        }
	      }

	      where = sample_at_pixel(output_index);
	      stop = Math.floor(where / scale);

	      if (stop > input_buffer_size) {
	        stop = input_buffer_size;
	      }

	      while (input_index < stop) {
	        value = this.min_sample(input_index);

	        if (value < min) {
	          min = value;
	        }

	        value = this.max_sample(input_index);

	        if (value > max) {
	          max = value;
	        }

	        input_index++;
	      }

	      if (is_partial_resampling && output_data.length / channel_count >= options.width) {
	        break;
	      }
	    }

	    if (is_partial_resampling) {
	      if (output_data.length / channel_count > options.width && input_index !== last_input_index) {
	        add_sample(min, max);
	      }
	    } else if (input_index !== last_input_index) {
	      add_sample(min, max);
	    }

	    return new WaveformData({
	      version: this.adapter.version,
	      samples_per_pixel: samples_per_pixel,
	      length: output_data.length / channel_count,
	      data: output_data,
	      sample_rate: this.adapter.sample_rate
	    }, WaveformData.adapters.object);
	  },

	  /**
	   * Returns all the min peaks values.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.min.length);      // -> 150
	   * console.log(waveform.min[0]);          // -> -12
	   *
	   * waveform.offset(20, 50);
	   *
	   * console.log(waveform.min.length);      // -> 30
	   * console.log(waveform.min[0]);          // -> -9
	   * ```
	   *
	   * @api
	   * @return {Array.<Integer>} Min values contained in the offset.
	   */
	  get min() {
	    return this.offsetValues(this.offset_start, this.offset_length, 0);
	  },

	  /**
	   * Returns all the max peaks values.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.max.length);      // -> 150
	   * console.log(waveform.max[0]);          // -> 12
	   *
	   * waveform.offset(20, 50);
	   *
	   * console.log(waveform.max.length);      // -> 30
	   * console.log(waveform.max[0]);          // -> 5
	   * ```
	   *
	   * @api
	   * @return {Array.<Integer>} Max values contained in the offset.
	   */
	  get max() {
	    return this.offsetValues(this.offset_start, this.offset_length, 1);
	  },

	  /**
	   * Return the unpacked values for a particular offset.
	   *
	   * @param {Integer} start
	   * @param {Integer} length
	   * @param {Integer} correction The step to skip for each iteration
	   *   (as the response body is [min, max, min, max...])
	   * @return {Array.<Integer>}
	   */
	  offsetValues: function getOffsetValues(start, length, correction) {
	    var adapter = this.adapter;
	    var values = [];
	    correction += start * 2; // offset the positioning query

	    for (var i = 0; i < length; i++) {
	      values.push(adapter.at(i * 2 + correction));
	    }

	    return values;
	  },

	  /**
	   * Compute the duration in seconds of the audio file.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   * console.log(waveform.duration);    // -> 10.33333333333
	   *
	   * waveform.offset(20, 50);
	   * console.log(waveform.duration);    // -> 10.33333333333
	   * ```
	   *
	   * @api
	   * @return {number} Duration of the audio waveform, in seconds.
	   */
	  get duration() {
	    return this.adapter.length * this.adapter.scale / this.adapter.sample_rate;
	  },

	  /**
	   * Return the duration in seconds of the current offset.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.offset_duration);    // -> 10.33333333333
	   *
	   * waveform.offset(20, 50);
	   *
	   * console.log(waveform.offset_duration);    // -> 2.666666666667
	   * ```
	   *
	   * @api
	   * @return {number} Duration of the offset, in seconds.
	   */
	  get offset_duration() {
	    return this.offset_length * this.adapter.scale / this.adapter.sample_rate;
	  },

	  /**
	   * Return the number of pixels per second.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.pixels_per_second);       // -> 93.75
	   * ```
	   *
	   * @api
	   * @return {number} Number of pixels per second.
	   */
	  get pixels_per_second() {
	    return this.adapter.sample_rate / this.adapter.scale;
	  },

	  /**
	   * Return the amount of time represented by a single pixel.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.seconds_per_pixel);       // -> 0.010666666666666666
	   * ```
	   *
	   * @return {number} Amount of time (in seconds) contained in a pixel.
	   */
	  get seconds_per_pixel() {
	    return this.adapter.scale / this.adapter.sample_rate;
	  },

	  /**
	   * Returns a value at a specific offset.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.at(20));              // -> -7
	   * console.log(waveform.at(21));              // -> 12
	   * ```
	   *
	   * @proxy
	   * @param {Integer} index
	   * @return {number} Offset value
	   */
	  at: function at_sample_proxy(index) {
	    return this.adapter.at(index);
	  },

	  /**
	   * Return the pixel location for a certain time.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.at_time(0.0000000023));       // -> 10
	   * ```
	   * @param {number} time
	   * @return {integer} Index location for a specific time.
	   */
	  at_time: function at_time(time) {
	    return Math.floor(time * this.adapter.sample_rate / this.adapter.scale);
	  },

	  /**
	   * Returns the time in seconds for a particular index
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.time(10));                    // -> 0.0000000023
	   * ```
	   *
	   * @param {Integer} index
	   * @return {number}
	   */
	  time: function time(index) {
	    return index * this.adapter.scale / this.adapter.sample_rate;
	  },

	  /**
	   * Return if a pixel lies within the current offset.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.in_offset(50));      // -> true
	   * console.log(waveform.in_offset(120));     // -> true
	   *
	   * waveform.offset(100, 150);
	   *
	   * console.log(waveform.in_offset(50));      // -> false
	   * console.log(waveform.in_offset(120));     // -> true
	   * ```
	   *
	   * @param {number} pixel
	   * @return {boolean} True if the pixel lies in the current offset, false otherwise.
	   */
	  in_offset: function isInOffset(pixel) {
	    return pixel >= this.offset_start && pixel < this.offset_end;
	  },

	  /**
	   * Returns a min value for a specific offset.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.min_sample(10));      // -> -7
	   * ```
	   *
	   * @param {Integer} offset
	   * @return {Number} Offset min value
	   */
	  min_sample: function getMinValue(offset) {
	    return this.adapter.at(offset * 2);
	  },

	  /**
	   * Returns a max value for a specific offset.
	   *
	   * ```javascript
	   * var waveform = WaveformData.create({ ... });
	   *
	   * console.log(waveform.max_sample(10));      // -> 12
	   * ```
	   *
	   * @param {Integer} offset
	   * @return {Number} Offset max value
	   */
	  max_sample: function getMaxValue(offset) {
	    return this.adapter.at(offset * 2 + 1);
	  }
	};
	/**
	 * Available adapters to manage the data backends.
	 *
	 * @type {Object}
	 */

	WaveformData.adapters = {};
	/**
	 * WaveformData Adapter Structure
	 *
	 * @typedef {{from: Number, to: Number, platforms: {}}}
	 */

	WaveformData.adapter = function WaveformDataAdapter(response_data) {
	  this.data = response_data;
	};

	var core = WaveformData;

	/**
	 * ArrayBuffer adapter consumes binary waveform data (data format version 1).
	 * It is used as a data abstraction layer by `WaveformData`.
	 *
	 * This is supposed to be the fastest adapter ever:
	 * * **Pros**: working directly in memory, everything is done by reference
	 *   (including the offsetting)
	 * * **Cons**: binary data are hardly readable without data format knowledge
	 *   (and this is why this adapter exists).
	 *
	 * Also, it is recommended to use the `fromResponseData` factory.
	 *
	 * @see WaveformDataArrayBufferAdapter.fromResponseData
	 * @param {DataView} response_data
	 * @constructor
	 */

	function WaveformDataArrayBufferAdapter(response_data) {
	  this.data = response_data;
	}
	/**
	 * Detects if a set of data is suitable for the ArrayBuffer adapter.
	 * It is used internally by `WaveformData.create` so you should not bother using it.
	 *
	 * @static
	 * @param {Mixed} data
	 * @returns {boolean}
	 */


	WaveformDataArrayBufferAdapter.isCompatible = function isCompatible(data) {
	  return data && typeof data === "object" && "byteLength" in data;
	};
	/**
	 * Setup factory to create an adapter based on heterogeneous input formats.
	 *
	 * It is the preferred way to build an adapter instance.
	 *
	 * ```javascript
	 * var arrayBufferAdapter = WaveformData.adapters.arraybuffer;
	 * var xhr = new XMLHttpRequest();
	 *
	 * // .dat file generated by audiowaveform program
	 * xhr.open("GET", "http://example.com/waveforms/track.dat");
	 * xhr.responseType = "arraybuffer";
	 * xhr.addEventListener("load", function onResponse(progressEvent){
	 *  var responseData = progressEvent.target.response;
	 *
	 *  // doing stuff with the raw data ...
	 *  // you only have access to WaveformDataArrayBufferAdapter API
	 *  var adapter = arrayBufferAdapter.fromResponseData(responseData);
	 *
	 *  // or making things easy by using WaveformData ...
	 *  // you have access WaveformData API
	 *  var waveform = new WaveformData(responseData, arrayBufferAdapter);
	 * });
	 *
	 * xhr.send();
	 * ```

	 * @static
	 * @param {ArrayBuffer} response_data
	 * @return {WaveformDataArrayBufferAdapter}
	 */


	WaveformDataArrayBufferAdapter.fromResponseData = function fromArrayBufferResponseData(response_data) {
	  return new WaveformDataArrayBufferAdapter(new DataView(response_data));
	};
	/**
	 * @namespace WaveformDataArrayBufferAdapter
	 */


	WaveformDataArrayBufferAdapter.prototype = {
	  /**
	   * Returns the data format version number.
	   *
	   * @return {Integer} Version number of the consumed data format.
	   */
	  get version() {
	    return this.data.getInt32(0, true);
	  },

	  /**
	   * Indicates if the response body is encoded in 8bits.
	   *
	   * **Notice**: currently the adapter only deals with 8bits encoded data.
	   * You should favor that too because of the smaller data network fingerprint.
	   *
	   * @return {boolean} True if data are declared to be 8bits encoded.
	   */
	  get is_8_bit() {
	    return Boolean(this.data.getUint32(4, true));
	  },

	  /**
	   * Indicates if the response body is encoded in 16bits.
	   *
	   * @return {boolean} True if data are declared to be 16bits encoded.
	   */
	  get is_16_bit() {
	    return !this.is_8_bit;
	  },

	  /**
	   * Returns the number of samples per second.
	   *
	   * @return {Integer} Number of samples per second.
	   */
	  get sample_rate() {
	    return this.data.getInt32(8, true);
	  },

	  /**
	   * Returns the scale (number of samples per pixel).
	   *
	   * @return {Integer} Number of samples per pixel.
	   */
	  get scale() {
	    return this.data.getInt32(12, true);
	  },

	  /**
	   * Returns the length of the waveform data (number of data points).
	   *
	   * @return {Integer} Length of the waveform data.
	   */
	  get length() {
	    return this.data.getUint32(16, true);
	  },

	  /**
	   * Returns a value at a specific offset.
	   *
	   * @param {Integer} index
	   * @return {number} waveform value
	   */
	  at: function at_sample(index) {
	    return this.data.getInt8(20 + index);
	  }
	};
	var arraybuffer = WaveformDataArrayBufferAdapter;

	/**
	 * Object adapter consumes stringified JSON or JSON waveform data (data format version 1).
	 * It is used as a data abstraction layer by `WaveformData`.
	 *
	 * This is supposed to be a fallback for browsers not supporting ArrayBuffer:
	 * * **Pros**: easy to debug response_data and quite self describing.
	 * * **Cons**: slower than ArrayBuffer, more memory consumption.
	 *
	 * Also, it is recommended to use the `fromResponseData` factory.
	 *
	 * @see WaveformDataObjectAdapter.fromResponseData
	 * @param {String|Object} response_data JSON or stringified JSON
	 * @constructor
	 */

	function WaveformDataObjectAdapter(response_data) {
	  this.data = response_data;
	}
	/**
	 * Detects if a set of data is suitable for the Object adapter.
	 * It is used internally by `WaveformData.create` so you should not bother using it.
	 *
	 * @static
	 * @param {Mixed} data
	 * @returns {boolean}
	 */


	WaveformDataObjectAdapter.isCompatible = function isCompatible(data) {
	  return data && (typeof data === "object" && "sample_rate" in data || typeof data === "string" && "sample_rate" in JSON.parse(data));
	};
	/**
	 * Setup factory to create an adapter based on heterogeneous input formats.
	 *
	 * It is the preferred way to build an adapter instance.
	 *
	 * ```javascript
	 * var objectAdapter = WaveformData.adapters.object;
	 * var xhr = new XMLHttpRequest();
	 *
	 * // .dat file generated by audiowaveform program
	 * xhr.open("GET", "http://example.com/waveforms/track.json");
	 * xhr.responseType = "json";
	 * xhr.addEventListener("load", function onResponse(progressEvent){
	 *  var responseData = progressEvent.target.response;
	 *
	 *  // doing stuff with the raw data ...
	 *  // you only have access to WaveformDataObjectAdapter API
	 *  var adapter = objectAdapter.fromResponseData(responseData);
	 *
	 *  // or making things easy by using WaveformData ...
	 *  // you have access WaveformData API
	 *  var waveform = new WaveformData(responseData, objectAdapter);
	 * });
	 *
	 * xhr.send();
	 * ```

	 * @static
	 * @param {String|Object} response_data JSON or stringified JSON
	 * @return {WaveformDataObjectAdapter}
	 */


	WaveformDataObjectAdapter.fromResponseData = function fromJSONResponseData(response_data) {
	  if (typeof response_data === "string") {
	    return new WaveformDataObjectAdapter(JSON.parse(response_data));
	  } else {
	    return new WaveformDataObjectAdapter(response_data);
	  }
	};
	/**
	 * @namespace WaveformDataObjectAdapter
	 */


	WaveformDataObjectAdapter.prototype = {
	  /**
	   * Returns the data format version number.
	   *
	   * @return {Integer} Version number of the consumed data format.
	   */
	  get version() {
	    return this.data.version || 1;
	  },

	  /**
	   * Indicates if the response body is encoded in 8bits.
	   *
	   * **Notice**: currently the adapter only deals with 8bits encoded data.
	   * You should favor that too because of the smaller data network fingerprint.
	   *
	   * @return {boolean} True if data are declared to be 8bits encoded.
	   */
	  get is_8_bit() {
	    return this.data.bits === 8;
	  },

	  /**
	   * Indicates if the response body is encoded in 16bits.
	   *
	   * @return {boolean} True if data are declared to be 16bits encoded.
	   */
	  get is_16_bit() {
	    return !this.is_8_bit;
	  },

	  /**
	   * Returns the number of samples per second.
	   *
	   * @return {Integer} Number of samples per second.
	   */
	  get sample_rate() {
	    return this.data.sample_rate;
	  },

	  /**
	   * Returns the scale (number of samples per pixel).
	   *
	   * @return {Integer} Number of samples per pixel.
	   */
	  get scale() {
	    return this.data.samples_per_pixel;
	  },

	  /**
	   * Returns the length of the waveform data (number of data points).
	   *
	   * @return {Integer} Length of the waveform data.
	   */
	  get length() {
	    return this.data.length;
	  },

	  /**
	   * Returns a value at a specific offset.
	   *
	   * @param {Integer} index
	   * @return {number} waveform value
	   */
	  at: function at_sample(index) {
	    return this.data.data[index];
	  }
	};
	var object = WaveformDataObjectAdapter;

	var adapters = {
	  arraybuffer: arraybuffer,
	  object: object
	};

	core.adapters = adapters;
	var waveformData = core;

	const audioContext = new AudioContext();
	const audioSourcesSubject = new BehaviorSubject(new Map$1());
	const stream = audioSourcesSubject.asObservable();
	const AudioSourceState = {
	  LOADING: 'LOADING',
	  READY: 'READY'
	};

	class AudioSource extends Record({
	  title: null,
	  id: null,
	  data: null,
	  audio: null,
	  duration: null,
	  state: null
	}) {}

	function createAudioSourceFromFile(id, file) {
	  const source = new AudioSource({
	    title: file.name,
	    id,
	    state: AudioSourceState.LOADING
	  });
	  audioSourcesSubject.next(audioSourcesSubject.value.set(id, source));
	  return new Promise(res => {
	    const reader = new FileReader();

	    reader.onload = () => {
	      const clone = reader.result.slice(0);
	      audioContext.decodeAudioData(reader.result, audioBuffer => {
	        const duration = Time.fromSeconds(audioBuffer.duration);
	        const ready = audioSourcesSubject.value.mergeIn([id], {
	          duration,
	          data: clone,
	          audio: audioBuffer,
	          state: AudioSourceState.READY
	        });
	        audioSourcesSubject.next(ready);
	        res(ready.get(id));
	      });
	    };

	    reader.readAsArrayBuffer(file);
	  });
	}
	const audioSources = Symbol();
	wire_2(audioSources, wireObservable(stream));

	var WORKER_ENABLED = !!(commonjsGlobal === commonjsGlobal.window && commonjsGlobal.URL && commonjsGlobal.Blob && commonjsGlobal.Worker);

	function InlineWorker(func, self) {
	  var _this = this;

	  var functionBody;
	  self = self || {};

	  if (WORKER_ENABLED) {
	    functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
	    return new commonjsGlobal.Worker(commonjsGlobal.URL.createObjectURL(new commonjsGlobal.Blob([functionBody], {
	      type: "text/javascript"
	    })));
	  }

	  function postMessage(data) {
	    setTimeout(function () {
	      _this.onmessage({
	        data: data
	      });
	    }, 0);
	  }

	  this.self = self;
	  this.self.postMessage = postMessage;
	  setTimeout(func.bind(self, self), 0);
	}

	InlineWorker.prototype.postMessage = function postMessage(data) {
	  var _this = this;

	  setTimeout(function () {
	    _this.self.onmessage({
	      data: data
	    });
	  }, 0);
	};

	var inlineWorker = InlineWorker;

	/**
	 * This callback is executed once the audio has been decoded by the browser and
	 * resampled by waveform-data.
	 *
	 * @callback onAudioResampled
	 * @param {WaveformData} waveform_data Waveform instance of the browser decoded audio
	 * @param {AudioBuffer} audio_buffer Decoded audio buffer
	 */

	/**
	 * AudioBuffer-based WaveformData generator
	 *
	 * Adapted from BlockFile::CalcSummary in Audacity, with permission.
	 * @see https://code.google.com/p/audacity/source/browse/audacity-src/trunk/src/BlockFile.cpp
	 *
	 * @param {Object.<{scale: Number, amplitude_scale: Number}>} options
	 * @param {onAudioResampled} callback
	 * @returns {Function.<AudioBuffer>}
	 */


	function getAudioDecoder(options, callback) {
	  return function onAudioDecoded(audio_buffer) {
	    var worker = new inlineWorker(function () {
	      var INT8_MAX = 127;
	      var INT8_MIN = -128;

	      function calculateWaveformDataLength(audio_sample_count, scale) {
	        var data_length = Math.floor(audio_sample_count / scale);
	        var samples_remaining = audio_sample_count - data_length * scale;

	        if (samples_remaining > 0) {
	          data_length++;
	        }

	        return data_length;
	      }

	      this.addEventListener("message", function (evt) {
	        var scale = evt.data.scale;
	        var amplitude_scale = evt.data.amplitude_scale;
	        var audio_buffer = evt.data.audio_buffer;
	        var data_length = calculateWaveformDataLength(audio_buffer.length, scale);
	        var header_size = 20;
	        var data_object = new DataView(new ArrayBuffer(header_size + data_length * 2));
	        var channels = audio_buffer.channels;
	        var channel;
	        var min_value = Infinity,
	            max_value = -Infinity,
	            scale_counter = 0;
	        var buffer_length = audio_buffer.length;
	        var offset = header_size;
	        var i;
	        data_object.setInt32(0, 1, true); // Version

	        data_object.setUint32(4, 1, true); // Is 8 bit?

	        data_object.setInt32(8, audio_buffer.sampleRate, true); // Sample rate

	        data_object.setInt32(12, scale, true); // Scale

	        data_object.setInt32(16, data_length, true); // Length

	        for (i = 0; i < buffer_length; i++) {
	          var sample = 0;

	          for (channel = 0; channel < channels.length; ++channel) {
	            sample += channels[channel][i];
	          }

	          sample = Math.floor(INT8_MAX * sample * amplitude_scale / channels.length);

	          if (sample < min_value) {
	            min_value = sample;

	            if (min_value < INT8_MIN) {
	              min_value = INT8_MIN;
	            }
	          }

	          if (sample > max_value) {
	            max_value = sample;

	            if (max_value > INT8_MAX) {
	              max_value = INT8_MAX;
	            }
	          }

	          if (++scale_counter === scale) {
	            data_object.setInt8(offset++, Math.floor(min_value));
	            data_object.setInt8(offset++, Math.floor(max_value));
	            min_value = Infinity;
	            max_value = -Infinity;
	            scale_counter = 0;
	          }
	        }

	        if (scale_counter > 0) {
	          data_object.setInt8(offset++, Math.floor(min_value));
	          data_object.setInt8(offset++, Math.floor(max_value));
	        }

	        this.postMessage(data_object);
	      });
	    });
	    worker.addEventListener("message", function (evt) {
	      var data_object = evt.data;
	      callback(null, new waveformData(data_object.buffer, waveformData.adapters.arraybuffer), audio_buffer);
	    }); // Construct a simple object with the necessary AudioBuffer data,
	    // as we cannot send an AudioBuffer to a Web Worker.

	    var audio_buffer_obj = {
	      length: audio_buffer.length,
	      sampleRate: audio_buffer.sampleRate,
	      channels: []
	    }; // Fill in the channels data.

	    for (var channel = 0; channel < audio_buffer.numberOfChannels; ++channel) {
	      audio_buffer_obj.channels[channel] = audio_buffer.getChannelData(channel);
	    }

	    worker.postMessage({
	      scale: options.scale,
	      amplitude_scale: options.amplitude_scale,
	      audio_buffer: audio_buffer_obj
	    });
	  };
	}

	var audiodecoder = getAudioDecoder;

	/**
	 * Creates a working WaveformData based on binary audio data.
	 *
	 * This is still quite experimental and the result will mostly depend on the
	 * level of browser support.
	 *
	 * ```javascript
	 * const xhr = new XMLHttpRequest();
	 * const audioContext = new AudioContext();
	 *
	 * // URL of a CORS MP3/Ogg file
	 * xhr.open('GET', 'https://example.com/audio/track.ogg');
	 * xhr.responseType = 'arraybuffer';
	 *
	 * xhr.addEventListener('load', function(progressEvent) {
	 *   WaveformData.builders.webaudio(audioContext, progressEvent.target.response,
	 *     function(err, waveform) {
	 *     if (err) {
	 *       console.error(err);
	 *       return;
	 *     }
	 *
	 *     console.log(waveform.duration);
	 *   });
	 * });
	 *
	 * xhr.send();
	 * ```
	 *
	 * @todo use a Web Worker to offload processing of the binary data
	 * @todo or use `SourceBuffer.appendBuffer` and `ProgressEvent` to stream the decoding
	 * @todo abstract the number of channels, because it is assumed the audio file is stereo
	 * @param {AudioContext|webkitAudioContext} audio_context
	 * @param {ArrayBuffer} raw_response
	 * @param {callback} what to do once the decoding is done
	 * @constructor
	 */


	function fromAudioObjectBuilder(audio_context, raw_response, options, callback) {
	  var audioContext = window.AudioContext || window.webkitAudioContext;
	  var defaultOptions = {
	    scale: 512,
	    amplitude_scale: 1.0
	  };

	  if (!(audio_context instanceof audioContext)) {
	    throw new TypeError("First argument should be an AudioContext instance");
	  } // fromAudioObjectBuilder(audioContext, data, callback) form


	  if (typeof options === "function") {
	    callback = options;
	    options = {};
	  } else {
	    options = options || {};
	  }

	  options.scale = options.scale || defaultOptions.scale;
	  options.amplitude_scale = options.amplitude_scale || defaultOptions.amplitude_scale;

	  if (options.hasOwnProperty("scale_adjuster")) {
	    throw new Error("Please rename the 'scale_adjuster' option to 'amplitude_scale'");
	  } // The following function is a workaround for a Webkit bug where decodeAudioData
	  // invokes the errorCallback with null instead of a DOMException.
	  // See https://webaudio.github.io/web-audio-api/#dom-baseaudiocontext-decodeaudiodata
	  // and http://stackoverflow.com/q/10365335/103396


	  function errorCallback(error) {
	    if (!error) {
	      error = new DOMException("EncodingError");
	    }

	    callback(error);
	  }

	  return audio_context.decodeAudioData(raw_response, audiodecoder(options, callback), errorCallback);
	}

	var webaudio = fromAudioObjectBuilder;

	var webaudio$1 = webaudio;

	const waveformSubject = new BehaviorSubject(new Map$1());
	const WaveformState = {
	  LOADING: 'Loading',
	  READY: 'Ready'
	};

	class Waveform extends Record({
	  sourceId: null,
	  blob: null,
	  url: null,
	  state: null
	}) {}

	function drawWaveformImage(waveform) {
	  const canvas = document.createElement('canvas');

	  const interpolateHeight = total_height => {
	    const amplitude = 256;
	    return size => total_height - (size + 128) * total_height / amplitude;
	  };

	  const y = interpolateHeight(canvas.height);
	  const ctx = canvas.getContext('2d');
	  ctx.beginPath(); // from 0 to 100

	  waveform.min.forEach((val, x) => {
	    ctx.lineTo(x + 0.5, y(val) + 0.5);
	  }); // then looping back from 100 to 0

	  waveform.max.reverse().forEach((val, x) => {
	    ctx.lineTo(waveform.offset_length - x + 0.5, y(val) + 0.5);
	  });
	  ctx.closePath();
	  ctx.stroke();
	  ctx.fill();
	  return new Promise(res => {
	    canvas.toBlob(function (blob) {
	      res(blob);
	    });
	  });
	}

	function generateWaveform(source) {
	  webaudio$1(audioContext, source.data, (err, waveform) => {
	    if (err) {
	      console.error(err);
	      return;
	    }

	    drawWaveformImage(waveform).then(blob => {
	      const url = URL.createObjectURL(blob);
	      waveformSubject.next(waveformSubject.value.mergeIn([source.id], {
	        state: WaveformState.READY,
	        blob,
	        url
	      }));
	    });
	  });
	}

	function loadWaveform(source) {
	  const {
	    id: sourceId
	  } = source;

	  if (waveformSubject.value.has(sourceId)) {
	    return;
	  }

	  const waveform = new Waveform({
	    sourceId,
	    state: WaveformState.LOADING
	  });
	  waveformSubject.next(waveformSubject.value.set(sourceId, waveform));
	  generateWaveform(source);
	}
	const waveformSym = Symbol();
	wire_2(waveformSym, wireObservable(waveformSubject.asObservable()));

	const waveformSource = Symbol();

	class Waveform$1 extends engine_5 {
	  constructor(...args) {
	    super(...args);
	    this.editor = void 0;
	    this.offset = void 0;
	    this.waveforms = void 0;
	  }

	  get source() {
	    return this[waveformSource];
	  }

	  set source(value) {
	    if (!this.waveforms.data.has(value.id) && value.state === AudioSourceState.READY) {
	      loadWaveform(value);
	    }

	    this[waveformSource] = value;
	  }

	  get waveform() {
	    return this.waveforms.data.get(this.source.id);
	  }

	  get hasWaveform() {
	    return !!this.waveform;
	  }

	  get waveformReady() {
	    return this.waveform.state === WaveformState.READY;
	  }

	  get waveformStyle() {
	    const width = this.editor.data.durationToWidth(this.source.duration);
	    const sourceOffsetWidth = this.editor.data.durationToWidth(this.offset);
	    return `transform: translateX(-${sourceOffsetWidth}px); width: ${width}px`;
	  }

	  get canvas() {
	    return this.template.querySelector('canvas');
	  }

	}

	engine_11(Waveform$1, {
	  publicProps: {
	    offset: {
	      config: 0
	    },
	    source: {
	      config: 3
	    }
	  },
	  wire: {
	    editor: {
	      adapter: editorSym,
	      params: {},
	      static: {}
	    },
	    waveforms: {
	      adapter: waveformSym,
	      params: {},
	      static: {}
	    }
	  }
	});

	var _ffmpegWaveform = engine_10(Waveform$1, {
	  tmpl: _tmpl$3
	});

	function tmpl$3($api, $cmp, $slotset, $ctx) {
	  const {
	    c: api_custom_element
	  } = $api;
	  return [$cmp.hasSource ? api_custom_element("ffmpeg-waveform", _ffmpegWaveform, {
	    style: $cmp.waveformStyle,
	    props: {
	      "offset": $cmp.segment.sourceOffset,
	      "source": $cmp.source
	    },
	    key: 3
	  }, []) : null];
	}

	var _tmpl$4 = engine_8(tmpl$3);
	tmpl$3.stylesheets = [];

	if (_implicitStylesheets$3) {
	  tmpl$3.stylesheets.push.apply(tmpl$3.stylesheets, _implicitStylesheets$3);
	}
	tmpl$3.stylesheetTokens = {
	  hostAttribute: "ffmpeg-audiotracksegment_audiotracksegment-host",
	  shadowAttribute: "ffmpeg-audiotracksegment_audiotracksegment"
	};

	class AudioTrackSegment extends engine_5 {
	  constructor(...args) {
	    super(...args);
	    this.segment = void 0;
	    this.frame = void 0;
	    this.editor = void 0;
	    this.sources = void 0;
	  }

	  get hasSource() {
	    return !!this.source;
	  }

	  get source() {
	    return this.sources.data.get(this.segment.sourceId);
	  }

	  get waveformStyle() {
	    const {
	      frame,
	      editor,
	      segment
	    } = this;
	    const segmentOffset = editor.data.timeToPixel(segment.offset);
	    const diff = frame.x - segmentOffset;
	    return `transform: translateX(-${diff}px); width: ${frame.width + diff}px`;
	  }

	}

	engine_11(AudioTrackSegment, {
	  publicProps: {
	    segment: {
	      config: 0
	    },
	    frame: {
	      config: 0
	    }
	  },
	  wire: {
	    editor: {
	      adapter: editorSym,
	      params: {},
	      static: {}
	    },
	    sources: {
	      adapter: audioSources,
	      params: {},
	      static: {}
	    }
	  }
	});

	var _ffmpegAudiotracksegment = engine_10(AudioTrackSegment, {
	  tmpl: _tmpl$4
	});

	function tmpl$4($api, $cmp, $slotset, $ctx) {
	  const {
	    k: api_key,
	    c: api_custom_element,
	    i: api_iterator
	  } = $api;
	  return api_iterator($cmp.trackSegments, function (trackSegment) {
	    return api_custom_element("ffmpeg-audiotracksegment", _ffmpegAudiotracksegment, {
	      style: trackSegment.style,
	      props: {
	        "frame": trackSegment.frame,
	        "segment": trackSegment.segment
	      },
	      key: api_key(3, trackSegment.key)
	    }, []);
	  });
	}

	var _tmpl$5 = engine_8(tmpl$4);
	tmpl$4.stylesheets = [];

	if (_implicitStylesheets$2) {
	  tmpl$4.stylesheets.push.apply(tmpl$4.stylesheets, _implicitStylesheets$2);
	}
	tmpl$4.stylesheetTokens = {
	  hostAttribute: "ffmpeg-audiotrack_audiotrack-host",
	  shadowAttribute: "ffmpeg-audiotrack_audiotrack"
	};

	class AudioTrack extends engine_5 {
	  constructor(...args) {
	    super(...args);
	    this.track = void 0;
	    this.editor = void 0;
	  }

	  get trackSegments() {
	    return this.track.segments.toJS().filter(segment => {
	      const x = this.editor.data.timeToPixel(segment.offset);
	      const width = this.editor.data.durationToWidth(segment.duration);
	      const frameWidth = this.editor.data.frame.width;
	      const isOnScreenLeft = x > 0 || x + width > 0;
	      const isOnScreenRight = x < frameWidth;
	      return isOnScreenLeft && isOnScreenRight;
	    }).map((segment, index) => {
	      const frameWidth = this.editor.data.frame.width;
	      const segmentOffset = this.editor.data.timeToPixel(segment.offset);
	      let width = this.editor.data.durationToWidth(segment.duration);
	      const x = segmentOffset;

	      if (x < 0) {
	        width += x;
	      } else if (width + x > frameWidth) {
	        const diff = width + x - frameWidth;
	        width = width - diff;
	      }

	      const frame = {
	        x: Math.max(x, 0),
	        width
	      };
	      return {
	        key: index,
	        frame,
	        style: `transform: translateX(${frame.x}px); width:${width}px`,
	        segment
	      };
	    });
	  }

	}

	engine_11(AudioTrack, {
	  publicProps: {
	    track: {
	      config: 0
	    }
	  },
	  wire: {
	    editor: {
	      adapter: editorSym,
	      params: {},
	      static: {}
	    }
	  }
	});

	var _ffmpegAudiotrack = engine_10(AudioTrack, {
	  tmpl: _tmpl$5
	});

	function stylesheet$5(hostSelector, shadowSelector, nativeShadow) {
	  return "\n" + (nativeShadow ? (":host {display: block;position: absolute;left: 0;top: 0;bottom: 0;width: 1px;background: #000;z-index: 5;pointer-events: none;}") : (hostSelector + " {display: block;position: absolute;left: 0;top: 0;bottom: 0;width: 1px;background: #000;z-index: 5;pointer-events: none;}")) + "\n\n" + (nativeShadow ? (":host(.cursor--virtual) {background: rgba(0, 0, 0, 0.4);}") : (hostSelector + ".cursor--virtual {background: rgba(0, 0, 0, 0.4);}")) + "\n";
	}
	var _implicitStylesheets$5 = [stylesheet$5];

	function tmpl$5($api, $cmp, $slotset, $ctx) {
	  return [];
	}

	var _tmpl$6 = engine_8(tmpl$5);
	tmpl$5.stylesheets = [];

	if (_implicitStylesheets$5) {
	  tmpl$5.stylesheets.push.apply(tmpl$5.stylesheets, _implicitStylesheets$5);
	}
	tmpl$5.stylesheetTokens = {
	  hostAttribute: "ffmpeg-cursor_cursor-host",
	  shadowAttribute: "ffmpeg-cursor_cursor"
	};

	class Cursor extends engine_5 {
	  constructor(...args) {
	    super(...args);
	    this.virtual = void 0;
	  }

	  /*
	   *
	   * Editor
	   *
	  */
	  editorWireCallback(editor) {
	    if (!editor.data.frame) {
	      return;
	    }

	    const {
	      host
	    } = this.template;
	    const cursorData = this.virtual ? editor.data.virtualCursor : editor.data.cursor;

	    if (cursorData) {
	      const px = editor.data.timeToPixel(cursorData);
	      host.style.transform = `translateX(${px}px)`;
	    }
	  }
	  /*
	    *
	    * Editor
	    *
	   */


	  connectedCallback() {
	    if (this.virtual) {
	      this.template.host.classList.add('cursor--virtual');
	    }
	  }

	}

	engine_11(Cursor, {
	  publicProps: {
	    virtual: {
	      config: 0
	    }
	  },
	  wire: {
	    editorWireCallback: {
	      adapter: editorSym,
	      params: {},
	      static: {},
	      method: 1
	    }
	  }
	});

	var _ffmpegCursor = engine_10(Cursor, {
	  tmpl: _tmpl$6
	});

	function stylesheet$6(hostSelector, shadowSelector, nativeShadow) {
	  return "\n" + (nativeShadow ? (":host {padding: 0.5rem;display: flex;justify-content: center;}") : (hostSelector + " {padding: 0.5rem;display: flex;justify-content: center;}")) + "\n";
	}
	var _implicitStylesheets$6 = [stylesheet$6];

	function tmpl$6($api, $cmp, $slotset, $ctx) {
	  const {
	    t: api_text,
	    b: api_bind,
	    h: api_element
	  } = $api;
	  const {
	    _m0
	  } = $ctx;
	  return [api_element("button", {
	    key: 2,
	    on: {
	      "click": _m0 || ($ctx._m0 = api_bind($cmp.onPlayClick))
	    }
	  }, [api_text("Play")])];
	}

	var _tmpl$7 = engine_8(tmpl$6);
	tmpl$6.stylesheets = [];

	if (_implicitStylesheets$6) {
	  tmpl$6.stylesheets.push.apply(tmpl$6.stylesheets, _implicitStylesheets$6);
	}
	tmpl$6.stylesheetTokens = {
	  hostAttribute: "ffmpeg-controls_controls-host",
	  shadowAttribute: "ffmpeg-controls_controls"
	};

	class Controls extends engine_5 {
	  constructor(...args) {
	    super(...args);
	    this.editor = void 0;
	  }

	  onPlayClick() {}

	}

	engine_11(Controls, {
	  wire: {
	    editor: {
	      adapter: editorSym,
	      params: {},
	      static: {}
	    }
	  }
	});

	var _ffmpegControls = engine_10(Controls, {
	  tmpl: _tmpl$7
	});

	function tmpl$7($api, $cmp, $slotset, $ctx) {
	  const {
	    d: api_dynamic,
	    k: api_key,
	    h: api_element,
	    i: api_iterator,
	    b: api_bind,
	    c: api_custom_element,
	    gid: api_scoped_id
	  } = $api;
	  const {
	    _m0,
	    _m1
	  } = $ctx;
	  return [api_element("main", {
	    key: 2
	  }, [api_element("section", {
	    classMap: {
	      "tracks-summary": true
	    },
	    key: 3
	  }, api_iterator($cmp.audioTracksArray, function (track) {
	    return api_element("article", {
	      classMap: {
	        "track": true,
	        "track--summary": true
	      },
	      key: api_key(5, track.id)
	    }, [api_dynamic(track.title)]);
	  })), api_element("div", {
	    classMap: {
	      "editor-container": true
	    },
	    key: 6
	  }, [api_element("header", {
	    key: 7
	  }, [api_custom_element("ffmpeg-timeline", _ffmpegTimeline, {
	    key: 8,
	    on: {
	      "timelinedragstart": _m0 || ($ctx._m0 = api_bind($cmp.onTimelineDragStart)),
	      "timelinedragend": _m1 || ($ctx._m1 = api_bind($cmp.onTimelineDragEnd))
	    }
	  }, [])]), api_element("section", {
	    classMap: {
	      "editor": true
	    },
	    key: 9
	  }, [api_element("section", {
	    classMap: {
	      "waveforms-container": true
	    },
	    attrs: {
	      "id": api_scoped_id("tracks")
	    },
	    key: 10
	  }, api_iterator($cmp.audioTracksArray, function (track) {
	    return api_element("article", {
	      classMap: {
	        "track": true
	      },
	      key: api_key(12, track.id)
	    }, [api_custom_element("ffmpeg-audiotrack", _ffmpegAudiotrack, {
	      props: {
	        "track": track
	      },
	      key: 13
	    }, [])]);
	  })), $cmp.cursorInWindow ? api_custom_element("ffmpeg-cursor", _ffmpegCursor, {
	    key: 15
	  }, []) : null, $cmp.hasVirtualCursor ? api_custom_element("ffmpeg-cursor", _ffmpegCursor, {
	    props: {
	      "virtual": true
	    },
	    key: 17
	  }, []) : null])])]), api_element("footer", {
	    key: 18
	  }, [api_custom_element("ffmpeg-controls", _ffmpegControls, {
	    key: 19
	  }, [])])];
	}

	var _tmpl$8 = engine_8(tmpl$7);
	tmpl$7.stylesheets = [];

	if (_implicitStylesheets) {
	  tmpl$7.stylesheets.push.apply(tmpl$7.stylesheets, _implicitStylesheets);
	}
	tmpl$7.stylesheetTokens = {
	  hostAttribute: "ffmpeg-app_app-host",
	  shadowAttribute: "ffmpeg-app_app"
	};

	const tracksSubject = new BehaviorSubject(new Map$1());

	class AudioTrack$1 extends Record({
	  id: null,
	  segments: new List()
	}) {}

	function createTrackAndSourceFile(trackId, sourceId, sourceFile, trackOffset) {
	  const track = createTrack(trackId, []);
	  createAudioSourceFromFile(sourceId, sourceFile).then(audioSource => {
	    tracksSubject.next(tracksSubject.value.updateIn([trackId, 'segments'], segments => {
	      return segments.push({
	        sourceOffset: new Time(1000),
	        duration: new Time(audioSource.duration.milliseconds - 2000),
	        offset: trackOffset,
	        sourceId
	      });
	    }));
	  });
	}
	function createTrack(id, segments) {
	  const audioTrack = new AudioTrack$1({
	    id,
	    segments: new List(segments)
	  });
	  tracksSubject.next(tracksSubject.value.set(id, audioTrack));
	  return audioTrack;
	}
	const audioTracks = Symbol();
	wire_2(audioTracks, wireObservable(tracksSubject.asObservable()));

	let id = 0;
	function generateId() {
	  id += 1;
	  return id + '';
	}

	class App extends engine_5 {
	  constructor(...args) {
	    super(...args);
	    this.frame = null;
	    this.ffmpeg = void 0;
	    this.audioTracks = void 0;
	    this.editor = void 0;

	    this.updateFrame = () => {
	      const rect = this.template.querySelector('.editor-container').getBoundingClientRect();
	      this.frame = {
	        left: rect.left,
	        top: rect.top,
	        width: rect.width,
	        height: rect.height
	      };
	      setFrame({
	        left: rect.left,
	        top: rect.top,
	        width: rect.width,
	        height: rect.height
	      });
	    };

	    this.onMouseMove = evt => {
	      const {
	        offsetX
	      } = evt;
	      const time = this.editor.data.pixelToTime(offsetX - this.editor.data.frame.left);
	      const next = new Time(time.milliseconds + this.editor.data.visibleRange.start.milliseconds);
	      setVirtualCursorTime(next);
	    };

	    this.onMouseLeave = evt => {
	      setVirtualCursorTime(null);
	    };

	    this.onClick = evt => {
	      const {
	        offsetX
	      } = evt;
	      const time = this.editor.data.pixelToTime(offsetX - this.editor.data.frame.left);
	      const next = new Time(time.milliseconds + this.editor.data.visibleRange.start.milliseconds);
	      setCursorTime(next);
	    };

	    this.onDragOver = evt => {
	      evt.preventDefault();
	    };

	    this.onDrop = evt => {
	      evt.preventDefault();
	      const {
	        files
	      } = evt.dataTransfer;

	      for (let i = 0, len = files.length; i < len; i += 1) {
	        const sourceId = generateId();
	        const trackId = generateId();
	        createTrackAndSourceFile(trackId, sourceId, files[i], new Time(1000));
	      }
	    };
	  }

	  get ffmpegLoaded() {
	    return this.ffmpeg.data !== undefined;
	  }
	  /*
	   *
	   * Audio Tracks
	   *
	  */


	  get audioTracksArray() {
	    return this.audioTracks.data.toList().toArray();
	  }
	  /*
	   *
	   * Editor
	   *
	  */


	  onTimelineDragStart() {
	    this.removeEventListener('click', this.onClick);
	    this.template.host.classList.add('editor--drag');
	  }

	  onTimelineDragEnd() {
	    this.addEventListener('click', () => {
	      Promise.resolve().then(() => {
	        this.addEventListener('click', this.onClick);
	      });
	    }, {
	      once: true
	    });
	    this.template.host.classList.remove('editor--drag');
	  }

	  /*
	   *
	   * Template
	   *
	  */
	  get hasVirtualCursor() {
	    return this.editor && this.editor.data.virtualCursor !== null && this.timeInWindow(this.editor.data.virtualCursor);
	  }

	  timeInWindow(time) {
	    if (this.editor) {
	      const {
	        visibleRange
	      } = this.editor.data;
	      const {
	        milliseconds: timeMilliseconds
	      } = time;
	      const startMilliseconds = visibleRange.start.milliseconds;
	      const endMilliseconds = startMilliseconds + visibleRange.duration.milliseconds;
	      return timeMilliseconds >= startMilliseconds && timeMilliseconds <= endMilliseconds;
	    }

	    return false;
	  }

	  get cursorInWindow() {
	    if (this.editor) {
	      const {
	        cursor
	      } = this.editor.data;
	      return this.timeInWindow(cursor);
	    }

	    return false;
	  }
	  /*
	   *
	   * Lifecycle
	   *
	  */


	  connectedCallback() {
	    window.addEventListener('resize', this.updateFrame);
	    this.addEventListener('mousemove', this.onMouseMove);
	    this.addEventListener('mouseleave', this.onMouseLeave);
	    this.addEventListener('click', this.onClick);
	    this.draggable = true;
	    this.addEventListener('dragover', this.onDragOver);
	    this.addEventListener('drop', this.onDrop);
	  }

	  renderedCallback() {
	    if (this.frame === null) {
	      this.updateFrame();
	    }
	  }

	  disconnectedCallback() {
	    window.removeEventListener('resize', this.updateFrame);
	    this.removeEventListener('mousemove', this.onMouseMove);
	    this.removeEventListener('mouseleave', this.onMouseLeave);
	    this.removeEventListener('click', this.onClick);
	  }

	}

	engine_11(App, {
	  wire: {
	    ffmpeg: {
	      adapter: getFFMPEG,
	      params: {},
	      static: {}
	    },
	    audioTracks: {
	      adapter: audioTracks,
	      params: {},
	      static: {}
	    },
	    editor: {
	      adapter: editorSym,
	      params: {},
	      static: {}
	    }
	  }
	});

	var App$1 = engine_10(App, {
	  tmpl: _tmpl$8
	});

	wire_1(engine_6);
	const elm = engine_1('ffmpeg-app', {
	  is: App$1,
	  fallback: false
	});
	document.body.appendChild(elm);

}());
