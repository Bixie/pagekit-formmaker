<?php $view->script('form-edit', 'formmaker:app/bundle/form-edit.js', ['vue', 'formmaker-formmakerfields', 'uikit-nestable']); ?>

<form id="form-edit" class="uk-form" name="form" v-on="valid: save" v-cloak>

	<div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
		<div data-uk-margin>

			<h2 class="uk-margin-remove" v-if="formitem.id">{{ 'Edit form' | trans }} <em>{{
					formitem.title | trans}}</em></h2>

			<h2 class="uk-margin-remove" v-if="!formitem.id">{{ 'Add form' | trans }}</h2>

		</div>
		<div data-uk-margin>

			<a class="uk-button uk-margin-small-right" v-attr="href: $url('admin/formmaker')">{{ formitem.id ? 'Close' :
				'Cancel' | trans }}</a>
			<button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>

		</div>
	</div>

	<ul class="uk-tab" v-el="tab">
		<li><a>{{ 'General' | trans }}</a></li>
		<li><a>{{ 'Fields' | trans }}</a></li>
		<li><a>{{ 'Appearance' | trans }}</a></li>
	</ul>

	<div class="uk-switcher uk-margin" v-el="content">
		<div>
			<formbasic></formbasic>
			<div class="uk-form-horizontal uk-margin" v-show="!type.hasOptions || formitem.options.length">
				<formmakerfields edit-field="{{@ field.type }}"></formmakerfields>
			</div>
		</div>
		<div>
			<formfields></formfields>
		</div>
		<div>
			<appearance></appearance>
		</div>
	</div>

</form>

<v-modal v-ref="field-edit" large>
	<fieldedit formitem="{{@ formitem }}"></fieldedit>
</v-modal>

