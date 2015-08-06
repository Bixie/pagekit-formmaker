<?php $view->script('form-submissions', 'formmaker:app/bundle/form-submissions.js', ['vue', 'formmaker-formmakerfields']) ?>

<div id="formmaker-submissions" class="uk-form uk-form-horizontal" v-cloak>

	<div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
		<div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>

			<h2 class="uk-margin-remove">{{ menu.label | trans }}</h2>

			<div class="uk-margin-left" v-show="selected.length">
				<ul class="uk-subnav pk-subnav-icon">
					<li><a class="pk-icon-delete pk-icon-hover" title="{{ 'Delete' | trans }}"
						   data-uk-tooltip="{delay: 500}" v-on="click: removeSubmissions"
						   v-confirm="'Delete submissions? All data will be deleted from the database.' | trans"></a>
					</li>
					<li><a class="uk-icon uk-icon-archive pk-icon-hover" title="{{ 'Archive' | trans }}"
						   data-uk-tooltip="{delay: 500}" v-on="click: status(0)"></a>
					</li>
					<li><a class="pk-icon-check pk-icon-hover" title="{{ 'Mark as done' | trans }}"
						   data-uk-tooltip="{delay: 500}" v-on="click: status(2)"></a>
					</li>
				</ul>
			</div>

		</div>
		<div class="uk-position-relative" data-uk-margin>

			<div data-uk-dropdown="{ mode: 'click' }">
				<button class="uk-button uk-button-primary" disabled>
					{{ 'Export csv' | trans }}</button>

			</div>

		</div>
	</div>

	<div class="uk-overflow-container">
		<table class="uk-table uk-table-hover uk-table-middle">
			<thead>
			<tr>
				<th class="pk-table-width-minimum"><input type="checkbox" v-check-all="selected: input[name=id]"></th>
				<th class="pk-table-min-width-200" v-order="created: config.filter.order">{{ 'Submission date' | trans }}</th>
				<th class="pk-table-width-100" v-order="ip: config.filter.order">{{ 'IP address' | trans }}</th>
				<th class="pk-table-width-200 uk-text-center" v-order="email: config.filter.order">{{ 'Email' | trans }}</th>
				<th class="pk-table-width-100 uk-text-center">
					<div class="uk-form-select pk-filter" data-uk-form-select>
						<span>{{ 'Status' | trans }}</span>
						<select v-model="config.filter.status" options="statusOptions"></select>
					</div>
				</th>
				<th class="pk-table-width-100">
					<div class="uk-form-select pk-filter" data-uk-form-select>
						<span>{{ 'Form' | trans }}</span>
						<select v-model="config.filter.form" options="formOptions"></select>
					</div>
				</th>
			</tr>
			</thead>
			<tbody>
			<tr class="check-item" v-repeat="submission: submissions" v-class="uk-active: active(submission)">
				<td><input type="checkbox" name="id" value="{{ submission.id }}"></td>
				<td>
					<a v-on="click: submissionDetails(submission)">{{ submission.created | datetime }}</a>
				</td>
				<td>
					{{ submission.ip }}
				</td>
				<td class="pk-table-text-break">
					{{ submission.email }}
				</td>
				<td class="uk-text-center">
					<a title="{{ getStatusText(submission) }}" v-on="click: toggleStatus(submission)"
						  v-class="pk-icon-circle-danger: !submission.status,
							  pk-icon-circle-primary: submission.status == 1,
							  pk-icon-circle-success: submission.status == 2"></a>
				</td>
				<td>
					<a v-attr="href: $url('admin/formmaker/form/edit', { id: submission.form_id })">{{ submission.form_title }}</a>
				</td>
			</tr>
			</tbody>
		</table>
	</div>

	<h3 class="uk-h1 uk-text-muted uk-text-center" v-show="submissions && !submissions.length">{{ 'No submissions found.' | trans
		}}</h3>

	<v-pagination page="{{@ config.page }}" pages="{{ pages }}" v-show="pages > 1"></v-pagination>

	<v-modal v-ref="submissionmodal" large>
		<submissiondetail submissionid="{{ submissionID }}"></submissiondetail>
	</v-modal>

</div>
