import { codegen } from '@graphql-codegen/core';
import * as typescriptPlugin from '@graphql-codegen/typescript';
import * as typescriptVueApolloPlugin from '@graphql-codegen/typescript-vue-apollo';
import * as typescriptOperationsPlugin from '@graphql-codegen/typescript-operations';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import pkgDir from 'pkg-dir';
import fs from 'fs';
import { parse, print } from 'graphql';
import path from 'path';
import gql from 'graphql-tag';
import { DocumentNode } from 'graphql/language/ast';
import { Source } from '@graphql-tools/utils';

export default async function generateGraphQLTypes() {
	const outputFolder = path.join(
		pkgDir.sync(__dirname) as string,
		'../generated/src'
	);
	if (!fs.existsSync(outputFolder)) {
		fs.mkdirSync(outputFolder, { recursive: true });
	}

	// Generating TypeScript for Strapi Docs
	const strapiSchemaPath = path.join(
		pkgDir.sync(__dirname) as string,
		'../strapi-server/exports/graphql/schema.graphql'
	);
	if (fs.existsSync(strapiSchemaPath)) {
		const docsGraphQLOutputFile = path.join(outputFolder, 'docs-graphql.ts');
		const docsTypeDefs = mergeTypeDefs(loadFilesSync(strapiSchemaPath));
		const printedDocsTypeDefs = print(docsTypeDefs);
		const docsSchema = parse(printedDocsTypeDefs);

		const docsTypescriptOutput = await codegen({
			config: {},
			documents: [] as Source[],
			filename: docsGraphQLOutputFile,
			pluginMap: {
				typescript: typescriptPlugin,
			},
			plugins: [
				{
					typescript: {},
				},
			],
			schema: docsSchema,
		});
		fs.writeFileSync(docsGraphQLOutputFile, '/* eslint-disable */\n');
		fs.appendFileSync(docsGraphQLOutputFile, docsTypescriptOutput);

		const graphqlDocsQueries = loadFilesSync(
			path.join(
				pkgDir.sync(__dirname) as string,
				'../graphql/docs/**/*.graphql'
			)
		);
		const parsedDocsQueries: DocumentNode[] = graphqlDocsQueries.map((query) =>
			gql(query)
		);

		const docsTypescriptOperationsOutput = await codegen({
			config: {},
			documents: parsedDocsQueries.map((query) => ({ document: query })),
			filename: docsGraphQLOutputFile,
			pluginMap: {
				typescriptOperations: typescriptOperationsPlugin,
			},
			plugins: [
				{
					typescriptOperations: {},
				},
			],
			schema: docsSchema,
		});
		fs.appendFileSync(docsGraphQLOutputFile, docsTypescriptOperationsOutput);

		const vueApolloDocsOutput = await codegen({
			config: {},
			documents: parsedDocsQueries.map((query) => ({ document: query })),
			filename: docsGraphQLOutputFile,
			pluginMap: {
				typescriptVueApollo: typescriptVueApolloPlugin,
			},
			plugins: [
				{
					typescriptVueApollo: {
						documentVariablePrefix: 'VueApollo',
					},
				},
			],
			schema: docsSchema,
		});
		fs.appendFileSync(docsGraphQLOutputFile, vueApolloDocsOutput);
	}

	console.log('Outputs generated!');
}
