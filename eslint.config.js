import upleveled, { noRestrictedSyntaxOptions } from 'eslint-config-upleveled';

const config = [
  ...upleveled,
  {
    files: ['database/*.ts'],
    rules: {
      'no-restricted-syntax': [
        ...noRestrictedSyntaxOptions,
        // Enforce unambiguous exported database function patterns
        // (require either accepting a session token ("sessionToken")
        // as the first parameter or having a name ending with
        // "Insecure")
        {
          selector:
            "ExportNamedDeclaration > VariableDeclaration[declarations.0.init.callee.name='cache'][declarations.0.id.name!=/Insecure$/][declarations.0.init.arguments.0.params.0.name!='sessionToken']",
          message: `Ambiguous authentication of exported database query function - either pass \`sessionToken\` as the first parameter or destructured property in first parameter or name the function ending with \`Insecure\`:

const getUser = cache(async (sessionToken: string, userId: number) =>

const getArticleCategoriesInsecure = cache(async () =>

`,
        },
        // Enforce usage of session token ("sessionToken" first
        // parameter) within database functions
        {
          selector:
            "ExportNamedDeclaration > VariableDeclaration[declarations.0.init.callee.name='cache'][declarations.0.init.arguments.0.params.0.name='sessionToken'] > VariableDeclarator > CallExpression > ArrowFunctionExpression > BlockStatement:not(:has([type='Identifier'][name='sessionToken']))",
          message:
            'Unused `sessionToken` parameter in database query function - use `sessionToken` in database queries to implement authentication and authorization',
        },
      ],
    },
  },
];

export default config;
