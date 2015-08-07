<?php $view->script('forms-formmaker', 'formmaker:app/bundle/forms.js', ['vue', 'uikit-nestable']) ?>

<div id="formmaker-forms" class="uk-form uk-form-horizontal" v-cloak>

	<div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
		<div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>

			<h2 class="uk-margin-remove">{{ menu.label | trans }}</h2>

			<div class="uk-margin-left" v-show="selected.length">
				<ul class="uk-subnav pk-subnav-icon">
					<li><a class="pk-icon-delete pk-icon-hover" title="{{ 'Delete' | trans }}"
						   data-uk-tooltip="{delay: 500}" v-on="click: removeForms"
						   v-confirm="'Delete form? All values will be deleted from the formmakers.' | trans"></a>
					</li>
				</ul>
			</div>

		</div>
		<div class="uk-position-relative" data-uk-margin>

			<div data-uk-dropdown="{ mode: 'click' }">
				<a class="uk-button uk-button-primary" v-attr="href: $url.route('admin/formmaker/form/edit')">
					{{ 'Add form' | trans }}</a>

			</div>

		</div>
	</div>

	<div class="uk-overflow-container">

		<div class="pk-table-fake pk-table-fake-header" v-class="pk-table-fake-border: !forms || !forms.length">
			<div class="pk-table-width-minimum pk-table-fake-nestable-padding"><input type="checkbox"
																					  v-check-all="selected: input[name=id]">
			</div>
			<div class="pk-table-min-width-100">{{ 'Title' | trans }}</div>
			<div class="pk-table-width-100 uk-text-center">{{ 'Status' | trans }}</div>
			<div class="pk-table-width-150">{{ 'Submissions' | trans }}</div>
			<div class="pk-table-width-150">{{ 'Url' | trans }}</div>
		</div>

		<ul class="uk-nestable uk-margin-remove" v-el="nestable" v-show="forms.length">
			<formitem v-repeat="formitem: forms | orderBy 'title'"></formitem>

		</ul>

	</div>

	<h3 class="uk-h1 uk-text-muted uk-text-center" v-show="forms && !forms.length">{{ 'No forms found.' | trans
		}}</h3>

</div>

<script id="formitem" type="text/template">
	<li class="uk-nestable-item" v-class="uk-active: isSelected(formitem)" data-id="{{ formitem.id }}">

		<div class="uk-nestable-panel pk-table-fake uk-form uk-visible-hover">
			<div class="pk-table-width-minimum pk-table-collapse">
				<div class="uk-nestable-toggle" data-nestable-action="toggle"></div>
			</div>
			<div class="pk-table-width-minimum"><input type="checkbox" name="id" value="{{ formitem.id }}"></div>
			<div class="pk-table-min-width-100">
				<a v-attr="href: $url.route('admin/formmaker/form/edit', { id: formitem.id })">{{ formitem.title }}</a>
			</div>
			<div class="pk-table-width-100 uk-text-center">
				<td class="uk-text-center">
					<a v-class="pk-icon-circle-danger: !formitem.status, pk-icon-circle-success: formitem.status"
					   v-on="click: toggleStatus(formitem)"></a>
				</td>
			</div>
			<div class="pk-table-width-150 pk-table-max-width-150 uk-text-truncate">
				<a v-attr="href: $url.route('admin/formmaker/submissions', { filter: {form: formitem.id} })">Check submissions</a>
			</div>
			<div class="pk-table-width-150 pk-table-max-width-150 uk-text-truncate">
				<a v-attr="href: $url.route(formitem.url)" target="_blank">{{ formitem.url }}</a>
			</div>
		</div>


	</li>

</script>