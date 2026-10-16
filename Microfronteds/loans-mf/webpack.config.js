const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mf-loans',
  filename: "remoteEntry.js",
  exposes: {
    './LoansPage': './src/app/presentation/pages/loans/loan-list.page.ts',
    './LoanCreatePage': './src/app/presentation/pages/loans/loan-create.page.ts',
    './LoanDetailPage': './src/app/presentation/pages/loans/loan-detail.page.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});