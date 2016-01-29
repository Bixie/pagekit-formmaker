<?php $view->script('form-submissions', 'bixie/formmaker:app/bundle/form-submissions.js', ['bixie-fieldtypes']) ?>

<div id="formmaker-submissions" class="uk-form uk-form-horizontal" v-cloak>

	<div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
		<div class="uk-flex uk-flex-middle uk-flex-wrap" data-uk-margin>

			<h2 class="uk-margin-remove">{{ 'Submissions' | trans }}</h2>

			<div class="uk-margin-left" v-show="selected.length">
				<ul class="uk-subnav pk-subnav-icon">
					<li><a class="pk-icon-delete pk-icon-hover" title="{{ 'Delete' | trans }}"
						   data-uk-tooltip="{delay: 500}" @click.prevent="removeSubmissions"
						   v-confirm="'Delete submissions? All data will be deleted from the database.' | trans"></a>
					</li>
					<li><a class="uk-icon uk-icon-archive pk-icon-hover" title="{{ 'Archive' | trans }}"
						   data-uk-tooltip="{delay: 500}" @click.prevent="status(0)"></a>
					</li>
					<li><a class="pk-icon-check pk-icon-hover" title="{{ 'Mark as done' | trans }}"
						   data-uk-tooltip="{delay: 500}" @click.prevent="status(2)"></a>
					</li>
				</ul>
			</div>

		</div>
		<div class="uk-position-relative" data-uk-margin>

			<div data-uk-dropdown="{ mode: 'click' }">
				<button class="uk-button" @click="$refs.csvmodal.open()">
					{{ 'Export csv' | trans }}</button>

			</div>

		</div>
	</div>

	<div class="uk-overflow-container">
		<table class="uk-table uk-table-hover uk-table-middle">
			<thead>
			<tr>
				<th class="pk-table-width-minimum"><input type="checkbox" v-check-all:selected.literal="input[name=id]" number></th>
				<th class="pk-table-min-width-200" v-order:created="config.filter.order">{{ 'Submission date' | trans }}</th>
				<th class="pk-table-width-100" v-order:ip="config.filter.order">{{ 'IP address' | trans }}</th>
				<th class="pk-table-width-200 uk-text-center" v-order:email="config.filter.order">{{ 'Email' | trans }}</th>
				<th class="pk-table-width-100 uk-text-center">
					<input-filter :title="$trans('Status')" :value.sync="config.filter.status" :options="statusOptions"></input-filter>
				</th>
				<th class="pk-table-width-100">
					<input-filter :title="$trans('Form')" :value.sync="config.filter.form" :options="formOptions"></input-filter>
				</th>
			</tr>
			</thead>
			<tbody>
			<tr class="check-item" v-for="submission in submissions" :class="{'uk-active': active(submission)}">
				<td><input type="checkbox" name="id" value="{{ submission.id }}"></td>
				<td>
					<a @click.prevent="submissionDetails(submission)">{{ submission.created | datetime }}</a>
				</td>
				<td>
					{{ submission.ip }}
				</td>
				<td class="pk-table-text-break">
					{{ submission.email }}
				</td>
				<td class="uk-text-center">
					<a title="{{ getStatusText(submission) }}" @click.prevent="toggleStatus(submission)"
						  :class="{'pk-icon-circle-danger': !submission.status,
							  'pk-icon-circle-primary': submission.status == 1,
							  'pk-icon-circle-success': submission.status == 2}"></a>
				</td>
				<td>
					<a :href="$url.route('admin/formmaker/form/edit', { id: submission.form_id })">{{ submission.form_title }}</a>
				</td>
			</tr>
			</tbody>
		</table>
	</div>

	<h3 class="uk-h1 uk-text-muted uk-text-center" v-show="submissions && !submissions.length">{{ 'No submissions found.' | trans
		}}</h3>

	<v-pagination :page.sync="config.page" :pages="pages" v-show="pages > 1"></v-pagination>

	<v-modal v-ref:submissionmodal large>
		<submissiondetail :submissionid="submissionID"></submissiondetail>
	</v-modal>

	<v-modal v-ref:csvmodal large>
		<submissioncsv :forms="forms"></submissioncsv>
	</v-modal>

</div>
