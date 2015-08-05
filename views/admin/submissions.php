<?php $view->script('form-submissions', 'formmaker:app/bundle/form-submissions.js', ['vue', 'formmaker-formmakerfields']) ?>

<div id="formmaker-submissions" class="uk-form uk-form-horizontal" v-cloak>

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
				<a class="uk-button uk-button-primary" v-attr="href: $url('admin/formmaker/submissions/csv')">
					{{ 'Export csv' | trans }}</a>

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
				<th class="pk-table-width-100 uk-text-center" v-order="email: config.filter.order">{{ 'Email' | trans }}</th>
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
				<td class="uk-text-center">
					<span title="{{ getStatusText(submission) }}"
						  v-class="pk-icon-circle-danger: !submission.status,
							  pk-icon-circle-success: submission.status == 1,
							  pk-icon-circle-primary: submission.status == 2"></span>
				</td>
				<td>
					<a v-attr="href: $url('admin/formmaker/edit', { id: submission.form_id })">{{ submission.form_title }}</a>
				</td>
				<td class="pk-table-text-break">
					{{ submission.email }}
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
