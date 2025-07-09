describe('Goods sorting', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Sort alphabetically button sorts the products', () => {
    cy.get('button[data-cy="sort-alphabetically"]').click();

    cy.get('tbody tr td:first-child').then($cells => {
      const texts = [...$cells].map(td => td.innerText);
      const sorted = [...texts].sort();

      expect(texts).to.deep.equal(sorted);
    });

    cy.get('button[data-cy="sort-alphabetically"]').should(
      'not.have.class',
      'is-light',
    );
  });

  it('Sort by length button sorts the products by length', () => {
    cy.get('button[data-cy="sort-by-length"]').click();

    cy.get('tbody tr td:first-child').then($cells => {
      const texts = [...$cells].map(td => td.innerText);
      const sortedByLength = [...texts].sort((a, b) => a.length - b.length);

      expect(texts).to.deep.equal(sortedByLength);
    });

    cy.get('button[data-cy="sort-by-length"]').should(
      'not.have.class',
      'is-light',
    );
  });

  it('Reverse button reverses the current order', () => {
    cy.get('button[data-cy="sort-alphabetically"]').click();

    cy.get('tbody tr td:first-child').then($cellsBeforeReverse => {
      const sorted = [...$cellsBeforeReverse].map(td => td.innerText);
      const expectedReversed = [...sorted].reverse();

      cy.get('button[data-cy="reverse"]').click();

      cy.get('tbody tr td:first-child').then($cellsAfterReverse => {
        const reversed = [...$cellsAfterReverse].map(td => td.innerText);

        expect(reversed).to.deep.equal(expectedReversed);
      });
    });

    cy.get('button[data-cy="reverse"]').should('not.have.class', 'is-light');
  });

  it('Reset button restores the original order', () => {
    // Ordena primeiro para o botão reset aparecer
    cy.get('button[data-cy="sort-alphabetically"]').click();

    // Garantir que o botão reset está visível antes de clicar
    cy.get('button[data-cy="reset"]').should('be.visible').click();

    cy.get('tbody tr td:first-child').then($cells => {
      const texts = [...$cells].map(td => td.innerText);
      const original = [
        'Dumplings',
        'Carrot',
        'Eggs',
        'Ice cream',
        'Apple',
        'Bread',
        'Fish',
        'Honey',
        'Jam',
        'Garlic',
      ];

      expect(texts).to.deep.equal(original);
    });

    // Após clicar, botão reset deve sumir
    cy.get('button[data-cy="reset"]').should('not.exist');
  });

  it('Reversing and then sorting alphabetically works correctly', () => {
    cy.get('button[data-cy="reverse"]').click();
    cy.get('button[data-cy="sort-alphabetically"]').click();

    cy.get('tbody tr td:first-child').then($cells => {
      const texts = [...$cells].map(td => td.innerText);
      const sorted = [...texts].sort();

      expect(texts).to.deep.equal(sorted);
      expect(texts[0]).to.equal('Apple');
    });

    cy.get('button[data-cy="sort-alphabetically"]').should(
      'not.have.class',
      'is-light',
    );
  });
});
