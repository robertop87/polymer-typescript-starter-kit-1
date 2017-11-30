/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   lib/mixins/property-effects.html
 */

/// <reference path="../utils/boot.d.ts" />
/// <reference path="../utils/mixin.d.ts" />
/// <reference path="../utils/path.d.ts" />
/// <reference path="../utils/case-map.d.ts" />
/// <reference path="property-accessors.d.ts" />
/// <reference path="template-stamp.d.ts" />

declare namespace Polymer {

  /**
   * Element class mixin that provides meta-programming for Polymer's template
   * binding and data observation (collectively, "property effects") system.
   *
   * This mixin uses provides the following key static methods for adding
   * property effects to an element class:
   * - `addPropertyEffect`
   * - `createPropertyObserver`
   * - `createMethodObserver`
   * - `createNotifyingProperty`
   * - `createReadOnlyProperty`
   * - `createReflectedProperty`
   * - `createComputedProperty`
   * - `bindTemplate`
   *
   * Each method creates one or more property accessors, along with metadata
   * used by this mixin's implementation of `_propertiesChanged` to perform
   * the property effects.
   *
   * Underscored versions of the above methods also exist on the element
   * prototype for adding property effects on instances at runtime.
   *
   * Note that this mixin overrides several `PropertyAccessors` methods, in
   * many cases to maintain guarantees provided by the Polymer 1.x features;
   * notably it changes property accessors to be synchronous by default
   * whereas the default when using `PropertyAccessors` standalone is to be
   * async by default.
   */
  function PropertyEffects<T extends new(...args: any[]) => {}>(base: T): {
    new(...args: any[]): {
      __dataCounter: number;
      __data: Object;
      __dataPending: Object;
      __dataOld: Object;
      __dataClientsReady: boolean;
      __dataPendingClients: any[]|null;
      __dataToNotify: Object|null;
      __dataLinkedPaths: Object|null;
      __dataHasPaths: boolean;
      __dataCompoundStorage: Object|null;
      __dataHost: any|null;
      __dataTemp: Object;
      __dataClientsInitialized: boolean;
      __computeEffects: Object|null;
      __reflectEffects: Object|null;
      __notifyEffects: Object|null;
      __propagateEffects: Object|null;
      __observeEffects: Object|null;
      __readOnly: Object|null;
      __templateInfo: any;

      /**
       * Stamps the provided template and performs instance-time setup for
       * Polymer template features, including data bindings, declarative event
       * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
       * is returned containing the stamped DOM, ready for insertion into the
       * DOM.
       *
       * This method may be called more than once; however note that due to
       * `shadycss` polyfill limitations, only styles from templates prepared
       * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
       * to the shadow root and support CSS custom properties), and note that
       * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
       * any styles required by in runtime-stamped templates must be included
       * in the main element template.
       *
       * @param template Template to stamp
       * @returns Cloned template content
       */
      _stampTemplate(template: HTMLTemplateElement): any;
      _initializeProperties(): any;

      /**
       * Overrides `Polymer.PropertyAccessors` implementation to provide a
       * more efficient implementation of initializing properties from
       * the prototype on the instance.
       *
       * @param props Properties to initialize on the prototype
       */
      _initializeProtoProperties(props: Object|null): any;

      /**
       * Overrides `Polymer.PropertyAccessors` implementation to avoid setting
       * `_setProperty`'s `shouldNotify: true`.
       *
       * @param props Properties to initialize on the instance
       */
      _initializeInstanceProperties(props: Object|null): any;

      /**
       * Overrides base implementation to ensure all accessors set `shouldNotify`
       * to true, for per-property notification tracking.
       */
      _setProperty(property: any, value: any): any;

      /**
       * Overrides the `PropertyAccessors` implementation to introduce special
       * dirty check logic depending on the property & value being set:
       *
       * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
       *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
       * 2. Object set to simple property (e.g. 'prop': {...})
       *    Stored in `__dataTemp` and `__data`, dirty checked against
       *    `__dataTemp` by default implementation of `_shouldPropertyChange`
       * 3. Primitive value set to simple property (e.g. 'prop': 42)
       *    Stored in `__data`, dirty checked against `__data`
       *
       * The dirty-check is important to prevent cycles due to two-way
       * notification, but paths and objects are only dirty checked against any
       * previous value set during this turn via a "temporary cache" that is
       * cleared when the last `_propertiesChanged` exits. This is so:
       * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
       *    due to array mutations like shift/unshift/splice; this is fine
       *    since path changes are dirty-checked at user entry points like `set`
       * b. dirty-checking for objects only lasts one turn to allow the user
       *    to mutate the object in-place and re-set it with the same identity
       *    and have all sub-properties re-propagated in a subsequent turn.
       *
       * The temp cache is not necessarily sufficient to prevent invalid array
       * paths, since a splice can happen during the same turn (with pathological
       * user code); we could introduce a "fixup" for temporarily cached array
       * paths if needed: https://github.com/Polymer/polymer/issues/4227
       *
       * @param property Name of the property
       * @param value Value to set
       * @param shouldNotify True if property should fire notification
       *   event (applies only for `notify: true` properties)
       * @returns Returns true if the property changed
       */
      _setPendingProperty(property: string, value: any, shouldNotify?: boolean): boolean;

      /**
       * Overrides `PropertyAccessor`'s default async queuing of
       * `_propertiesChanged`: if `__dataReady` is false (has not yet been
       * manually flushed), the function no-ops; otherwise flushes
       * `_propertiesChanged` synchronously.
       */
      _invalidateProperties(): any;

      /**
       * Overrides `PropertyAccessors` so that property accessor
       * side effects are not enabled until after client dom is fully ready.
       * Also calls `_flushClients` callback to ensure client dom is enabled
       * that was not enabled as a result of flushing properties.
       */
      ready(): any;

      /**
       * Implements `PropertyAccessors`'s properties changed callback.
       *
       * Runs each class of effects for the batch of changed properties in
       * a specific order (compute, propagate, reflect, observe, notify).
       */
      _propertiesChanged(currentProps: any, changedProps: any, oldProps: any): any;

      /**
       * Equivalent to static `addPropertyEffect` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param property Property that should trigger the effect
       * @param type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param effect Effect metadata object
       */
      _addPropertyEffect(property: string, type: string, effect?: Object|null): any;

      /**
       * Removes the given property effect.
       *
       * @param property Property the effect was associated with
       * @param type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param effect Effect metadata object to remove
       */
      _removePropertyEffect(property: string, type: string, effect?: Object|null): any;

      /**
       * Returns whether the current prototype/instance has a property effect
       * of a certain type.
       *
       * @param property Property name
       * @param type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @returns True if the prototype/instance has an effect of this type
       */
      _hasPropertyEffect(property: string, type?: string): boolean;

      /**
       * Returns whether the current prototype/instance has a "read only"
       * accessor for the given property.
       *
       * @param property Property name
       * @returns True if the prototype/instance has an effect of this type
       */
      _hasReadOnlyEffect(property: string): boolean;

      /**
       * Returns whether the current prototype/instance has a "notify"
       * property effect for the given property.
       *
       * @param property Property name
       * @returns True if the prototype/instance has an effect of this type
       */
      _hasNotifyEffect(property: string): boolean;

      /**
       * Returns whether the current prototype/instance has a "reflect to attribute"
       * property effect for the given property.
       *
       * @param property Property name
       * @returns True if the prototype/instance has an effect of this type
       */
      _hasReflectEffect(property: string): boolean;

      /**
       * Returns whether the current prototype/instance has a "computed"
       * property effect for the given property.
       *
       * @param property Property name
       * @returns True if the prototype/instance has an effect of this type
       */
      _hasComputedEffect(property: string): boolean;

      /**
       * Sets a pending property or path.  If the root property of the path in
       * question had no accessor, the path is set, otherwise it is enqueued
       * via `_setPendingProperty`.
       *
       * This function isolates relatively expensive functionality necessary
       * for the public API (`set`, `setProperties`, `notifyPath`, and property
       * change listeners via {{...}} bindings), such that it is only done
       * when paths enter the system, and not at every propagation step.  It
       * also sets a `__dataHasPaths` flag on the instance which is used to
       * fast-path slower path-matching code in the property effects host paths.
       *
       * `path` can be a path string or array of path parts as accepted by the
       * public API.
       *
       * @param path Path to set
       * @param value Value to set
       * @param shouldNotify Set to true if this change should
       *  cause a property notification event dispatch
       * @param isPathNotification If the path being set is a path
       *   notification of an already changed value, as opposed to a request
       *   to set and notify the change.  In the latter `false` case, a dirty
       *   check is performed and then the value is set to the path before
       *   enqueuing the pending property change.
       * @returns Returns true if the property/path was enqueued in
       *   the pending changes bag.
       */
      _setPendingPropertyOrPath(path: string|Array<number|string>, value: any, shouldNotify?: boolean, isPathNotification?: boolean): boolean;

      /**
       * Applies a value to a non-Polymer element/node's property.
       *
       * The implementation makes a best-effort at binding interop:
       * Some native element properties have side-effects when
       * re-setting the same value (e.g. setting `<input>.value` resets the
       * cursor position), so we do a dirty-check before setting the value.
       * However, for better interop with non-Polymer custom elements that
       * accept objects, we explicitly re-set object changes coming from the
       * Polymer world (which may include deep object changes without the
       * top reference changing), erring on the side of providing more
       * information.
       *
       * Users may override this method to provide alternate approaches.
       *
       * @param node The node to set a property on
       * @param prop The property to set
       * @param value The value to set
       */
      _setUnmanagedPropertyToNode(node: Node|null, prop: string, value: any): any;

      /**
       * Enqueues the given client on a list of pending clients, whose
       * pending property changes can later be flushed via a call to
       * `_flushClients`.
       *
       * @param client PropertyEffects client to enqueue
       */
      _enqueueClient(client: Object|null): any;

      /**
       * Flushes any clients previously enqueued via `_enqueueClient`, causing
       * their `_flushProperties` method to run.
       */
      _flushClients(): any;

      /**
       * (c) the stamped dom enables.
       */
      __enableOrFlushClients(): any;

      /**
       * Perform any initial setup on client dom. Called before the first
       * `_flushProperties` call on client dom and before any element
       * observers are called.
       */
      _readyClients(): any;

      /**
       * Sets a bag of property changes to this instance, and
       * synchronously processes all effects of the properties as a batch.
       *
       * Property names must be simple properties, not paths.  Batched
       * path propagation is not supported.
       *
       * @param props Bag of one or more key-value pairs whose key is
       *   a property and value is the new value to set for that property.
       * @param setReadOnly When true, any private values set in
       *   `props` will be set. By default, `setProperties` will not set
       *   `readOnly: true` root properties.
       */
      setProperties(props: Object|null, setReadOnly?: boolean): any;

      /**
       * Called to propagate any property changes to stamped template nodes
       * managed by this element.
       *
       * @param changedProps Bag of changed properties
       * @param oldProps Bag of previous values for changed properties
       * @param hasPaths True with `props` contains one or more paths
       */
      _propagatePropertyChanges(changedProps: Object|null, oldProps: Object|null, hasPaths: boolean): any;

      /**
       * Aliases one data path as another, such that path notifications from one
       * are routed to the other.
       *
       * @param to Target path to link.
       * @param from Source path to link.
       */
      linkPaths(to: string|Array<string|number>, from: string|Array<string|number>): any;

      /**
       * Removes a data path alias previously established with `_linkPaths`.
       *
       * Note, the path to unlink should be the target (`to`) used when
       * linking the paths.
       *
       * @param path Target path to unlink.
       */
      unlinkPaths(path: string|Array<string|number>): any;

      /**
       * Notify that an array has changed.
       *
       * Example:
       *
       *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
       *     ...
       *     this.items.splice(1, 1, {name: 'Sam'});
       *     this.items.push({name: 'Bob'});
       *     this.notifySplices('items', [
       *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1, object: this.items, type: 'splice' },
       *       { index: 3, removed: [], addedCount: 1, object: this.items, type: 'splice'}
       *     ]);
       *
       * @param path Path that should be notified.
       * @param splices Array of splice records indicating ordered
       *   changes that occurred to the array. Each record should have the
       *   following fields:
       *    * index: index at which the change occurred
       *    * removed: array of items that were removed from this index
       *    * addedCount: number of new items added at this index
       *    * object: a reference to the array in question
       *    * type: the string literal 'splice'
       *
       *   Note that splice records _must_ be normalized such that they are
       *   reported in index order (raw results from `Object.observe` are not
       *   ordered and must be normalized/merged before notifying).
       */
      notifySplices(path: string, splices: any[]|null): any;

      /**
       * Convenience method for reading a value from a path.
       *
       * Note, if any part in the path is undefined, this method returns
       * `undefined` (this method does not throw when dereferencing undefined
       * paths).
       *
       * @param path Path to the value
       *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `users.12.name` or `['users', 12, 'name']`).
       * @param root Root object from which the path is evaluated.
       * @returns Value at the path, or `undefined` if any part of the path
       *   is undefined.
       */
      get(path: string|Array<string|number>, root?: Object|null): any;

      /**
       * Convenience method for setting a value to a path and notifying any
       * elements bound to the same path.
       *
       * Note, if any part in the path except for the last is undefined,
       * this method does nothing (this method does not throw when
       * dereferencing undefined paths).
       *
       * @param path Path to the value
       *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
       * @param value Value to set at the specified path.
       * @param root Root object from which the path is evaluated.
       *   When specified, no notification will occur.
       */
      set(path: string|Array<string|number>, value: any, root?: Object|null): any;

      /**
       * Adds items onto the end of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param path Path to array.
       * @param items Items to push onto array
       * @returns New length of the array.
       */
      push(path: string|Array<string|number>, ...items: any[]): number;

      /**
       * Removes an item from the end of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param path Path to array.
       * @returns Item that was removed.
       */
      pop(path: string|Array<string|number>): any;

      /**
       * Starting from the start index specified, removes 0 or more items
       * from the array and inserts 0 or more new items in their place.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.splice`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param path Path to array.
       * @param start Index from which to start removing/inserting.
       * @param deleteCount Number of items to remove.
       * @param items Items to insert into array.
       * @returns Array of removed items.
       */
      splice(path: string|Array<string|number>, start: number, deleteCount: number, ...items: any[]): any[]|null;

      /**
       * Removes an item from the beginning of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param path Path to array.
       * @returns Item that was removed.
       */
      shift(path: string|Array<string|number>): any;

      /**
       * Adds items onto the beginning of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param path Path to array.
       * @param items Items to insert info array
       * @returns New length of the array.
       */
      unshift(path: string|Array<string|number>, ...items: any[]): number;

      /**
       * Notify that a path has changed.
       *
       * Example:
       *
       *     this.item.user.name = 'Bob';
       *     this.notifyPath('item.user.name');
       *
       * @param path Path that should be notified.
       * @param value Value at the path (optional).
       */
      notifyPath(path: string, value?: any): any;

      /**
       * Equivalent to static `createReadOnlyProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param property Property name
       * @param protectedSetter Creates a custom protected setter
       *   when `true`.
       */
      _createReadOnlyProperty(property: string, protectedSetter?: boolean): any;

      /**
       * Equivalent to static `createPropertyObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param property Property name
       * @param methodName Name of observer method to call
       * @param dynamicFn Whether the method name should be included as
       *   a dependency to the effect.
       */
      _createPropertyObserver(property: string, methodName: string, dynamicFn?: boolean): any;

      /**
       * Equivalent to static `createMethodObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param expression Method expression
       * @param dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       */
      _createMethodObserver(expression: string, dynamicFn?: boolean|Object|null): any;

      /**
       * Equivalent to static `createNotifyingProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param property Property name
       */
      _createNotifyingProperty(property: string): any;

      /**
       * Equivalent to static `createReflectedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param property Property name
       */
      _createReflectedProperty(property: string): any;

      /**
       * Equivalent to static `createComputedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param property Name of computed property to set
       * @param expression Method expression
       * @param dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       */
      _createComputedProperty(property: string, expression: string, dynamicFn?: boolean|Object|null): any;

      /**
       * Equivalent to static `bindTemplate` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * This method may be called on the prototype (for prototypical template
       * binding, to avoid creating accessors every instance) once per prototype,
       * and will be called with `runtimeBinding: true` by `_stampTemplate` to
       * create and link an instance of the template metadata associated with a
       * particular stamping.
       *
       * @param template Template containing binding
       *   bindings
       * @param instanceBinding When false (default), performs
       *   "prototypical" binding of the template and overwrites any previously
       *   bound template for the class. When true (as passed from
       *   `_stampTemplate`), the template info is instanced and linked into
       *   the list of bound templates.
       * @returns Template metadata object; for `runtimeBinding`,
       *   this is an instance of the prototypical template info
       */
      _bindTemplate(template: HTMLTemplateElement|null, instanceBinding?: boolean): any;

      /**
       * Removes and unbinds the nodes previously contained in the provided
       * DocumentFragment returned from `_stampTemplate`.
       *
       * @param dom DocumentFragment previously returned
       *   from `_stampTemplate` associated with the nodes to be removed
       */
      _removeBoundDom(dom: any): any;
    }
  } & T
}
